import React, { useState, useEffect } from 'react';
import styles from './BusSchedule.module.css';
import { ScheduleCard } from './ScheduleCard.tsx';
import { BusRoute } from './types.ts';
import axios from 'axios';
import * as cheerio from 'cheerio';

interface BusScheduleData {
  toSchool: string[];
  fromSchool: string[];
}

const busRoutes: BusRoute[] = [
  { location: "동래", value: "3", schedule: { toSchool: [], fromSchool: [] } },
  { location: "마산", value: "2", schedule: { toSchool: [], fromSchool: [] } },
  { location: "양산-물금", value: "18", schedule: { toSchool: [], fromSchool: [] } },
  { location: "양산-북정", value: "11", schedule: { toSchool: [], fromSchool: [] } },
  { location: "영도/부산역", value: "7", schedule: { toSchool: [], fromSchool: [] } },
  { location: "울산", value: "12", schedule: { toSchool: [], fromSchool: [] } },
  { location: "장유", value: "10", schedule: { toSchool: [], fromSchool: [] } },
  { location: "진해", value: "9", schedule: { toSchool: [], fromSchool: [] } },
  { location: "창원", value: "8", schedule: { toSchool: [], fromSchool: [] } },
  { location: "창원-마산", value: "21", schedule: { toSchool: [], fromSchool: [] } },
  { location: "하단", value: "4", schedule: { toSchool: [], fromSchool: [] } },
  { location: "해운대", value: "5", schedule: { toSchool: [], fromSchool: [] } },
];

const initializeScheduleData = (): { [key: string]: BusScheduleData } => {
  const initialData: { [key: string]: BusScheduleData } = {};
  busRoutes.forEach((route) => {
    initialData[route.value] = { toSchool: ['배차 없음'], fromSchool: ['배차 없음'] };
  });
  return initialData;
};

const BusSchedule: React.FC = () => {
  const [scheduleData, setScheduleData] = useState<{ [key: string]: BusScheduleData }>(initializeScheduleData());
  const [loading, setLoading] = useState<boolean>(false);

  const fetchBusSchedules = async () => {
    setLoading(true);
    const today = new Date();
    const date = `${today.getFullYear()}${today.getMonth() + 1}${today.getDate()}`;
  
    try {
    const requests = busRoutes.map(async (route) => {
      const url = `/reserve/time_select_proc.php?lineCode=${route.value}&dateCode=${date}`;
      const response = await axios.get(url, { responseType: 'arraybuffer' });

      if (response.status === 200) {
        const decodedHtml = new TextDecoder('utf-8').decode(response.data);
        const $ = cheerio.load(decodedHtml);

        // 등교 시간과 하교 시간 배열
        const toSchoolTimes: string[] = [];
        const fromSchoolTimes: string[] = [];

        // 모든 <option> 태그 반복
        $('option').each((_, element) => {
          const text = $(element).text().trim().replace(/\u00A0/g, ' ');
          
          // 등교 텍스트 확인
          if (text.includes('등교')) {
            const timeMatch = text.match(/(\d{1,2}:\d{2})/);
            if (timeMatch && timeMatch[0]) {
              toSchoolTimes.push(timeMatch[0]);
            }
          }
        
          // 하교 텍스트 확인
          if (text.includes('하교')) {
            const timeMatch = text.match(/(\d{1,2}:\d{2})/);
            if (timeMatch && timeMatch[0]) {
              fromSchoolTimes.push(timeMatch[0]);
            }
          }
        });
        
        console.log('Final To School Times:', toSchoolTimes);
        console.log('Final From School Times:', fromSchoolTimes);
        
        

        return {
          lineCode: route.value,
          data: {
            toSchool: toSchoolTimes.length ? toSchoolTimes : ['배차 없음'],
            fromSchool: fromSchoolTimes.length ? fromSchoolTimes : ['배차 없음'],
          },
        };
      } else {
        console.log('Failed to fetch data for route', route.value);
        return {
          lineCode: route.value,
          data: { toSchool: ['배차 없음'], fromSchool: ['배차 없음'] },
        };
      }
    });

    const results = await Promise.all(requests);
    const newScheduleData = { ...scheduleData };

    results.forEach((result) => {
      const { lineCode, data } = result;
      newScheduleData[lineCode] = data;
    });

    setScheduleData(newScheduleData);
  } catch (error) {
    console.error('Network or server error:', error);
    alert('네트워크 오류가 발생했습니다. 다시 시도해주세요.');
  }

  setLoading(false);
};  

  useEffect(() => {
    fetchBusSchedules();
  }, []);

  return (
    <section className={styles.scheduleContainer}>
      <header className={styles.scheduleHeader}>
        <a href="/MainPage">
          <img 
            src="\img\icon\arrow-left.png" 
            alt="arrow-left" 
            className={styles.headerIcon} 
          />
        </a>
        <h2 className={styles.headerTitle}>지역</h2>
      </header>
      <main className={styles.scheduleGrid}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          busRoutes.map((route) => (
            <ScheduleCard 
              key={route.value}
              route={route}
              schedule={scheduleData[route.value]}
            />
          ))
        )}
      </main>
    </section>
  );
};

export default BusSchedule;