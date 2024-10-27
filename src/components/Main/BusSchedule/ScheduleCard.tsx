import React from 'react';
import styles from './BusSchedule.module.css';

interface ScheduleCardProps {
  location: string;
  arrivalTimes: string[];
  departureTimes: string[];
}

export const ScheduleCard: React.FC<ScheduleCardProps> = ({
  location,
  arrivalTimes,
  departureTimes
}) => {
  return (
    <article className={styles.scheduleCard}>
      <h2 className={styles.locationName}>{location}</h2>
      <p className={styles.scheduleTime}>
        등교: {arrivalTimes.length ? arrivalTimes.join('/ ') : <span className={styles.noSchedule}>배차 없음</span>}
      </p>
      {departureTimes.length > 0 && (
        <p className={styles.scheduleTime}>
          하교: {departureTimes.join('/ ')}
        </p>
      )}
    </article>
  );
};