import React from 'react';
import { BusRoute } from './types.ts';
import styles from './BusSchedule.module.css';

interface ScheduleCardProps {
  route: BusRoute;
  schedule: {
    toSchool: string[];
    fromSchool: string[];
  };
}

export const ScheduleCard: React.FC<ScheduleCardProps> = ({ route, schedule }) => {
  return (
    <div className={styles.scheduleCard}>
      <h3 className={styles.locationName}>{route.location}</h3>
      <div className={styles.departureTime}>
        등교
        <ul>x
          {schedule.toSchool.map((line, index) => (
            <li key={index}>{line}</li>
          ))}
        </ul>
        <h4>하교</h4>
        <ul>
          {schedule.fromSchool.map((line, index) => (
            <li key={index}>{line}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ScheduleCard;