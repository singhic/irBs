import React from 'react';
import styles from './BusSchedule.module.css';
import { ScheduleCard } from './ScheduleCard.tsx';

const scheduleData = [
  {
    location: '동래',
    arrivalTimes: ['07:50', '09:00', '09:50'],
    departureTimes: ['17:20', '18:20', '21:00']
  },
  {
    location: '마산',
    arrivalTimes: ['08:00', '10:00'],
    departureTimes: ['16:20', '17:20', '18:20']
  },
  // ... rest of the schedule data
];

export const BusSchedule: React.FC = () => {
  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <img 
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/181bc38d531314cbdd6f1b038d9e41ee3e50485be6c75a3505fc1e3114998472?placeholderIfAbsent=true&apiKey=c37b27135006443aab5f3858d3155b30" 
          alt="Bus schedule icon" 
          className={styles.headerIcon}
        />
        <h1 className={styles.headerTitle}>지역</h1>
      </header>
      
      <section className={styles.scheduleGrid}>
        {scheduleData.map((schedule, index) => (
          <div className={styles.scheduleRow} key={index}>
            <ScheduleCard
              location={schedule.location}
              arrivalTimes={schedule.arrivalTimes}
              departureTimes={schedule.departureTimes}
            />
          </div>
        ))}
      </section>
    </main>
  );
};

export default BusSchedule;