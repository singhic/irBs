import React from 'react';
import styles from './BusSchedule.module.css';
import { ScheduleCard } from './ScheduleCard.tsx';
import { BusRoute } from './types.ts';


const busRoutes: BusRoute[] = [
  {
    location: "동래",
    schedule: {
      toSchool: ["07:50", "09:00", "09:50"],
      fromSchool: ["17:20", "18:20", "21:00"]
    }
  },
  {
    location: "마산",
    schedule: {
      toSchool: ["08:00", "10:00"],
      fromSchool: ["16:20", "17:20", "18:20"]
    }
  },
  {
    location: "양산-물금",
    schedule: {
      toSchool: ["07:40"],
      fromSchool: ["18:10"]
    }
  },
  {
    location: "양산-북정",
    schedule: {
      toSchool: ["07:50"],
      fromSchool: ["18:10"]
    }
  },
  {
    location: "영도/부산역",
    schedule: {
      toSchool: ["07:20"],
      fromSchool: ["18:10"]
    }
  },
  {
    location: "울산",
    schedule: {
      toSchool: ["07:30", "08:30", "09:40"],
      fromSchool: ["16:20", "17:30", "20:00"]
    }
  },
  {
    location: "장유",
    schedule: {
      toSchool: ["07:55"],
      fromSchool: ["18:10"]
    }
  },
  {
    location: "진해",
    schedule: {
      toSchool: ["07:30"],
      fromSchool: ["18:10"]
    }
  },
  {
    location: "창원",
    schedule: {
      toSchool: ["08:00", "09:00", "10:00"],
      fromSchool: ["16:20", "17:20", "18:20"]
    }
  },
  {
    location: "창원-마산",
    schedule: {
      toSchool: [],
      fromSchool: ["21:00"]
    }
  },
  {
    location: "하단",
    schedule: {
      toSchool: ["07:50", "09:00", "09:50"],
      fromSchool: ["17:20", "18:20", "21:00"]
    }
  },
  {
    location: "해운대",
    schedule: {
      toSchool: ["07:20"],
      fromSchool: ["18:10"]
    }
  }
];

export const BusSchedule: React.FC = () => {
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
        {busRoutes.map((route) => (
          <ScheduleCard 
            key={route.location} 
            route={route} 
          />
        ))}
      </main>
    </section>
  );
};
export default BusSchedule;