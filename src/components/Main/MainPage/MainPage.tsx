import React, { useEffect, useState } from "react";
import { RouteCard } from "./RouteCard.tsx";
import styles from "./MainPage.module.css";
import axios from "axios";
import * as cheerio from "cheerio";
import Weather from "./Weather.tsx";

import  QuickBooking  from "./QuickBooking.tsx";

// 스와이프 모듈
import { useSwipeable } from "react-swipeable";
// 페이지 이동 모듈
import { useNavigate } from "react-router-dom";

// 사용자 이름 가져오기 함수
async function fetchValueFromExternalSite(): Promise<string | null> {
  try {
    const response = await axios.get("/passport/list.php");
    const html = response.data;
    const $ = cheerio.load(html);
    const value = $("#p_name").attr("value");
    return value || null;
  } catch (error) {
    console.error("Error fetching user name:", error);
    return null;
  }
}

// 최근 예약 정보 가져오기 함수
async function fetchReservation(): Promise<string | null> {
  try {
    const response = await axios.get("/index.php");
    const html = response.data;
    const $ = cheerio.load(html);

    const reservationElement = $('ul[data-role="listview"] li').first();
    if (!reservationElement.length) {
      return null;
    }

    const dateText = reservationElement.find("h2").text().trim();
    const dateMatch = dateText.match(/(\d+)-(\d+).*?(\d{2}:\d{2})/);

    if (!dateMatch) {
      return null;
    }

    const [, month, day, time] = dateMatch;
    const routeText = reservationElement.find("p").first().text().trim();
    const route = routeText.split(":").pop()?.trim();

    if (!month || !day || !time || !route) {
      return null;
    }

    const now = new Date();
    let year = now.getFullYear();

    if (Number(month) < now.getMonth() + 1) {
      year += 1;
    }

    // 예약 날짜 및 시간 생성
    const reservationDate = new Date(
      `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(
        2,
        "0"
      )}T${time}:00`
    );

    // 예약 시간이 지나지 않은 경우만 반환
    if (reservationDate > now) {
      return `${year}.${String(month).padStart(2, "0")}.${String(day).padStart(
        2,
        "0"
      )} ${time} ${route}`;
    } else {
      // 지나간 예약을 건너뛰고 다음 예약을 찾아야 할 경우
      const nextReservationElement = $('ul[data-role="listview"] li').eq(1); // 두 번째 예약을 가져옴
      if (!nextReservationElement.length) {
        return null;
      }

      const nextDateText = nextReservationElement.find("h2").text().trim();
      const nextDateMatch = nextDateText.match(/(\d+)-(\d+).*?(\d{2}:\d{2})/);
      if (!nextDateMatch) {
        return null;
      }

      const [, nextMonth, nextDay, nextTime] = nextDateMatch;
      const nextRouteText = nextReservationElement
        .find("p")
        .first()
        .text()
        .trim();
      const nextRoute = nextRouteText.split(":").pop()?.trim();

      const nextReservationDate = new Date(
        `${year}-${String(nextMonth).padStart(2, "0")}-${String(
          nextDay
        ).padStart(2, "0")}T${nextTime}:00`
      );

      if (nextReservationDate > now) {
        return `${year}.${String(nextMonth).padStart(2, "0")}.${String(
          nextDay
        ).padStart(2, "0")} ${nextTime} ${nextRoute}`;
      } else {
        return null; // 예약이 모두 지나간 경우
      }
    }
  } catch (error) {
    console.error("Error fetching reservation:", error);
    return null;
  }
}

// ------------------------------------------------------------------------
// 메인 페이지 컴포넌트
export const MainPage: React.FC = () => {
  const [userName, setUserName] = useState<string | null>(null);
  const [recentReservation, setRecentReservation] = useState<string | null>(
    null
  );
  const [isSwipedUp, setIsSwipedUp] = useState(false);
  const navigate = useNavigate();
  const [reservation, setReservation] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  

  const routeData = [
    { destination: "추후 제공", time: "09:00", seats: "(33/33석)" },
  ];

  const handlers = useSwipeable({
    onSwipedUp: () => {
      setIsSwipedUp(true);
      setTimeout(() => {
        navigate("/Reservations");
      }, 50); // 애니메이션 지속 시간과 동일하게 설정
    },
    preventScrollOnSwipe: true,
    trackMouse: true,
    delta: 2,
  });

  useEffect(() => {
    const fetchData = async () => {
      const userName = await fetchValueFromExternalSite();
      const reservation = await fetchReservation();
      setUserName(userName);
      setRecentReservation(reservation);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await fetchReservation();
      setReservation(result);
      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (isSwipedUp) {
      window.scrollTo(0, 0); // 페이지 맨 위로 스크롤
    }
  }, [isSwipedUp]);

  // 알림창 animation loop
  const [notifications, setNotifications] = useState([]);
  const [animationDuration, setAnimationDuration] = useState(0);
  const [dynamicKeyframes, setDynamicKeyframes] = useState('');

  useEffect(() => {
    const initialNotifications = [
      "🔥 2025년 하계방학 시간표 최신화 완료!",
      "❌ 빠른 예약, 매너, 문의 등 서비스 추후 적용 예정",
      "📢 마이페이지는 우측 상단에서 확인 가능!",
      "Made by Dept. of CE, Team MEGABRAIN",
    ];
  
    if (initialNotifications.length > 0) {
      setNotifications([...initialNotifications, ...initialNotifications]); 
    }
  
    const pauseDuration = 3; //정지 시간
    const transitionDuration = 0.8; //전환 시간
    const originalCount = initialNotifications.length;
    const totalDuration = originalCount * (pauseDuration + transitionDuration);
  
    setAnimationDuration(totalDuration); 

    let keyframesStr = '';

    for (let i = 0; i < originalCount; i++) {
      const startPercent = (i * (pauseDuration + transitionDuration)) / totalDuration * 100;
      const pauseEndPercent = ((i * (pauseDuration + transitionDuration)) + pauseDuration) / totalDuration * 100;
      const nextPercent = ((i + 1) * (pauseDuration + transitionDuration)) / totalDuration * 100;

      // 각 구간마다 transform 값은 0%부터 -50%까지 균등하게 분할
      const currentTranslate = ((i * 50) / originalCount).toFixed(2);
      const nextTranslate = (((i + 1) * 50) / originalCount).toFixed(2);

      keyframesStr += `
        ${startPercent.toFixed(2)}% { transform: translateY(-${currentTranslate}%); }
        ${pauseEndPercent.toFixed(2)}% { transform: translateY(-${currentTranslate}%); }
        ${nextPercent.toFixed(2)}% { transform: translateY(-${nextTranslate}%); }
      `;
    }

    const dynamicStyles = `
      @keyframes slideNotifications {
        ${keyframesStr}
      }
    `;
    setDynamicKeyframes(dynamicStyles);
  }, []);

  return (
    <main className={styles.page}>
      {/* 헤더 */}
      <style>{dynamicKeyframes}</style>
      <header className={styles.notificationBar}>
        <div className={styles.notificationContainer}>
          <div 
            className={styles.notificationWrapper} 
            style={{
              animationName: 'slideNotifications',
              animationDuration: `${animationDuration}s`,
              animationTimingFunction: 'linear',
              animationIterationCount: 'infinite',
              }}>
            {notifications.map((text,index)=>(
              <div className={styles.notificationContent} key={index}>
              <img
                src="/img/icon/warninglogo.svg"
                alt="Warning icon"
                className={styles.notificationIcon}/>
              <p className={styles.notificationText}>
                {text}
              </p>
            </div>
            ))}
          </div>
        </div>
        <a href="/MyPage" className={styles.settingsIconDiv}>
          <img
            src="/img/icon/settinglogo.svg"
            alt="Settings"
            className={styles.settingsIcon}
          />
        </a>
      </header>

      {/* 날씨 카드 */}
      <section className={styles.weatherCard}>
        <div className={styles.weatherInfo}>
          <p className={styles.weatherStatus}>
            <Weather />
          </p>
          <h1 className={styles.greeting}>
            안녕하세요. {userName ? userName + "님" : ""}
          </h1>
        </div>
      </section>

      {/* 예약 버튼 */}
      <a href="./BusSchedule" className={styles.bookingButton}>
        <span className={styles.bookingText}>✔️ 예약하기</span>
        <img
          src="/img/icon/reservelogo.svg"
          alt="예약하기 버튼"
          className={styles.bookingIcon}
        />
      </a>
  <a href="./Location" className={styles.locationButton}>
        <span className={styles.locationText}>🚌 현재 버스 위치 조회</span>
        <img
          src="/img/icon/reservelogo.svg"
          alt="현재 버스 위치 조회"
          className={styles.locationIcon}
        />
      </a>

      {/* 빠른 예약 섹션
      <section className={styles.quickBooking}>
        <h2 className={styles.quickBookingTitle}>빠른 예약하기</h2>
        <div className={styles.quickBookingContent}>
          {routeData.map((route, index) => (
            <RouteCard
              key={index}
              destination={route.destination}
              time={route.time}
              seats={route.seats}
            />
          ))}
        </div>
      </section> */}
      <div>      
      <QuickBooking routeData={routeData} />
      </div>

      <section className={styles.noticeSection}>
        <h2 className={styles.noticeTitle}>❗공지사항</h2>
        {/* ----------------------------------------------------------------- */}
        {/* 목차 */}
        <ul className={styles.noticeList}>
          <a
            className={styles.noUnderline}
            href="\NoticePDF\summer_vacation_schedule.pdf"
            target="_blank" // 새 탭에서 열기
            rel="noopener noreferrer" // 보안 설정
          >
            <li>🕒 2025학년도 하계방학 통학버스 운행 시간표 </li>
          </a>

          <a
            className={styles.noUnderline}
            href="\NoticePDF\Shuttle_Bus_Usage_Guide.pdf"
            target="_blank" // 새 탭에서 열기
            rel="noopener noreferrer" // 보안 설정
          >
            <li>🚌 통학버스 이용 안내 </li>
          </a>

          <a
            className={styles.noUnderline}
            href="https://www.inje.ac.kr/kor/campus-life/welfare-0103.asp"
            target="_blank" // 새 탭에서 열기
            rel="noopener noreferrer" // 보안 설정
          >
            <li>⭐ 분실물 문의 관련 안내</li>
          </a>

          <a
            className={styles.noUnderline}
            href="https://www.inje.ac.kr/kor/campus-life/welfare-0104.asp"
            target="_blank" // 새 탭에서 열기
            rel="noopener noreferrer" // 보안 설정
          >
            <li>📢 [필독]통학버스 이용 에티켓 안내</li>
          </a>
        </ul>

        {/* ----------------------------------------------------------------- */}

        <hr className={styles.noticeDivider} />
        <a className={styles.noticeFooter} href="/Notification">
          <div className={styles.noticeFooter}>
            <span className={styles.noticeText}>전체 공지사항 보기</span>
            <div className={styles.noticeIconDiv}>
              <img
                src="/img/icon/reservelogo.svg"
                alt=""
                className={styles.noticeIcon}
              />
            </div>
          </div>
        </a>
      </section>
      <a href="/FAQ">
        <button className={styles.supportText}>문제가 있으신가요?</button>
      </a>


      <div className={styles.emptyBox}>
      {/* 여백을 가진 상자 */}
      </div>

      {/* 최근 예약 섹션 */}
      <section
        className={`${styles.recentBooking} ${
          isSwipedUp ? styles.swipedUp : ""
        }`}
        {...handlers}
      >
        <img
          src="/img/icon/arrow-top.png"
          alt=""
          className={styles.recentBookingIcon}
        />
        <div className={styles.recentBookingContent}>
          {loading ? (
            <h2 className={styles.recentBookingTitle}>
              열심히 받아오고 있는데
              <br />
              응답이 평소와 같지 않네요.
            </h2>
          ) : reservation ? (
            <>
              <h2 className={styles.recentBookingTitle}>
                최근 예약 현황이 존재합니다
              </h2>
              <p className={styles.recentBookingDetails}>{reservation}</p>
            </>
          ) : (
            <h2 className={styles.recentBookingTitle}>
              최근 예약이 존재하지 않습니다
            </h2>
          )}
        </div>
      </section>
    </main>
  );
};

export default MainPage;
