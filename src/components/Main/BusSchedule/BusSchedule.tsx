import React, { useState, useEffect } from 'react';
import styles from './BusSchedule.module.css';
import { ScheduleCard } from './ScheduleCard.tsx';
import { BusRoute } from './types.ts';

interface BusScheduleData {
  toSchool: string[];
  fromSchool: string[];
}

const busRoutes: BusRoute[] = [
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

const BusSchedule: React.FC = () => {
  const [scheduleData, setScheduleData] = useState<{ [key: string]: BusScheduleData }>({});
  const [loading, setLoading] = useState<boolean>(true);

  const loadScheduleData = async () => {
    try {
      const response = await fetch('/parser.json');
      const data = await response.json();
      setScheduleData(data);
    } catch (error) {
      console.error('Error loading schedule data:', error);
      alert('스케줄 데이터를 불러오는 데 실패했습니다.');
    }
    setLoading(false);
  };

  useEffect(() => {
    loadScheduleData();
  }, []);

  return (
    <section className={styles.scheduleContainer}>
      <header className={styles.scheduleHeader}>
        <a href="/MainPage">
          <img src="\img\icon\arrow-left.png" alt="arrow-left" className={styles.headerIcon} />
        </a>
        <h2 className={styles.headerTitle}>지역(금일 버스시간표)</h2>
      </header>
      <main className={styles.scheduleGrid}>
        {loading ? (
          <p className={styles.loadingbar}>
            금일 버스시간표를 불러오고 있습니다.<br />
            잠시만 기다려주세요.
          </p>
        ) : (
          busRoutes.map((route) => (
            <ScheduleCard key={route.value} route={route} schedule={scheduleData[route.value] || { toSchool: ['배차 없음'], fromSchool: ['배차 없음'] }} />
          ))
        )}
      </main>
    </section>
  );
};

export default BusSchedule;
