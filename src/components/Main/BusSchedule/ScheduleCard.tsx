import React from 'react';
import styles from './BusSchedule.module.css';
import { ScheduleCardProps } from './types';

export const ScheduleCard: React.FC<ScheduleCardProps> = ({ route }) => {
  return (
    <article className={styles.scheduleCard}>
      <h3 className={styles.locationName}>{route.location}</h3>
      <p className={styles.departureTime}>
        등교: {route.schedule.toSchool.length ? route.schedule.toSchool.join('/ ') : (
          <span className={styles.noSchedule}>배차 없음</span>
        )}
      </p>
      {route.schedule.fromSchool.length > 0 && (
        <p className={styles.arrivalTime}>
          하교: {route.schedule.fromSchool.join('/ ')}
        </p>
      )}
    </article>
  );
};