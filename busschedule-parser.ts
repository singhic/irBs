import axios, { AxiosInstance } from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs';
import https from 'https';
import path from 'path';

const BUS_ID = process.env.BUS_ID || '';
const BUS_PS = process.env.BUS_PS || '';

axios.defaults.httpsAgent = new https.Agent({ rejectUnauthorized: false });

interface BusScheduleData {
  toSchool: string[];
  fromSchool: string[];
}

interface FetchResult {
  lineCode: string;
  data: BusScheduleData;
}

// Bus routes
const busRoutes = [
  { location: "동래", value: "3" },
  { location: "마산", value: "2" },
  { location: "양산-물금", value: "18" },
  { location: "양산-북정", value: "11" },
  { location: "영도/부산역", value: "7" },
  { location: "울산", value: "12" },
  { location: "장유", value: "10" },
  { location: "진해", value: "9" },
  { location: "창원", value: "8" },
  { location: "창원-마산", value: "21" },
  { location: "하단", value: "4" },
  { location: "해운대", value: "5" },
];

// 로그인 함수
const login = async (): Promise<AxiosInstance | null> => {
  try {
    const session = axios.create({
      withCredentials: true,
      httpsAgent: new https.Agent({ rejectUnauthorized: false }),
    });

    const loginUrl = 'https://bus.inje.ac.kr/login_proc.php';
    const loginData = new URLSearchParams();
    loginData.append('id', BUS_ID);
    loginData.append('password', BUS_PS);
    loginData.append('s_cookie', '');

    // 로그인 요청
    const response = await session.post(loginUrl, loginData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0', // 추가 헤더
      },
      maxRedirects: 5, // 리다이렉션 따라가기
      validateStatus: (status) => status < 400,
    });

    // 쿠키 추출
    const cookies = response.headers['set-cookie'];
    if (cookies) {
      const sessionCookie = cookies.find((cookie) => cookie.startsWith('PHPSESSID'));
      if (sessionCookie) {
        console.log('Login successful, PHPSESSID found:', sessionCookie);
        // 세션 쿠키 설정
        session.defaults.headers.Cookie = sessionCookie.split(';')[0];
        return session;
      }
    }

    console.error('Login failed: No PHPSESSID cookie found');
    return null;
  } catch (error) {
    console.error('Error during login:', error);
    return null;
  }
};

// 버스 스케줄 파싱 함수
const fetchBusSchedules = async (session: AxiosInstance): Promise<FetchResult[]> => {
    const today = new Date();
    const year = String(today.getFullYear());
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const date = `${year}${month}${day}`;
    const results: FetchResult[] = [];

    for (const route of busRoutes) {
      const url = `https://bus.inje.ac.kr/reserve/time_select_proc.php?lineCode=${route.value}&dateCode=${date+1}`;
      console.log(`Fetching schedule for line ${route.value}: ${url}`);

      try {
        // 수정된 부분: responseType을 'text'로 설정
        const response = await session.get(url, { responseType: 'text' });

        if (response.status === 200) {
          const decodedHtml = response.data;  // 이미 텍스트로 반환됨
          const $ = cheerio.load(decodedHtml);

          const toSchoolTimes: string[] = [];
          const fromSchoolTimes: string[] = [];

          console.log(`Parsing schedule for line ${route.value}:`);
          $('option').each((_, element) => {
            const text = $(element).text().trim().replace(/\u00A0/g, ' ');  // 불필요한 공백 제거
            console.log(`Option text: ${text}`);  // 텍스트 확인

            // "하교"와 "등교"가 포함된 텍스트에서 시간만 추출
            const timeMatch = text.match(/(\d{1,2}:\d{2})/);  // 시간을 정확히 추출

            if (timeMatch) {
              const time = timeMatch[0];  // 시간 추출

              // "등교"와 "하교" 텍스트에 따라 각각의 배열에 시간 추가
              if (text.includes('등교')) {
                console.log(`Found toSchool time: ${time}`);
                toSchoolTimes.push(time);
              }
              if (text.includes('하교')) {
                console.log(`Found fromSchool time: ${time}`);
                fromSchoolTimes.push(time);
              }
            }
          });

          // 배차 없을 경우 처리
          if (toSchoolTimes.length === 0) toSchoolTimes.push('배차 없음');
          if (fromSchoolTimes.length === 0) fromSchoolTimes.push('배차 없음');

          results.push({
            lineCode: route.value,
            data: {
              toSchool: toSchoolTimes,
              fromSchool: fromSchoolTimes,
            },
          });
        } else {
          console.error(`Failed to fetch schedule for line ${route.value}, status: ${response.status}`);
          results.push({
            lineCode: route.value,
            data: { toSchool: ['배차 없음'], fromSchool: ['배차 없음'] },
          });
        }
      } catch (error) {
        console.error(`Error fetching schedule for line ${route.value}:`, error);
        results.push({
          lineCode: route.value,
          data: { toSchool: ['배차 없음'], fromSchool: ['배차 없음'] },
        });
      }
    }

    return results;
};

  

const saveScheduleData = async () => {
    try {
      const session = await login();
      if (!session) {
        console.error('Failed to create session. Exiting...');
        return;
      }
  
      const scheduleData = await fetchBusSchedules(session);
      if (!scheduleData || scheduleData.length === 0) {
        console.error('No schedule data received.');
        return;
      }
  
      // 데이터가 잘 반환되는지 확인
      console.log('Raw schedule data:', scheduleData);
  
      const data = scheduleData.reduce((acc, cur) => {
        acc[cur.lineCode] = cur.data;
        return acc;
      }, {} as { [key: string]: BusScheduleData });
  
      // Final data 확인
      console.log('Final schedule data:', JSON.stringify(data, null, 2));
  
      // 파일 저장
      const outputPath = path.join(__dirname, 'public', 'parser.json');
      if (!fs.existsSync(path.dirname(outputPath))) {
        fs.mkdirSync(path.dirname(outputPath), { recursive: true });
      }
      fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
      console.log('Bus schedule data saved to parser.json');
    } catch (error) {
      console.error('Failed to save schedule data:', error);
    }
  };
  
  

// 스크립트 실행
saveScheduleData();
