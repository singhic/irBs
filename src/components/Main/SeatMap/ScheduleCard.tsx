import React from 'react';
import styles from './SeatSelection.module.css';
import { ScheduleCardProps } from './types';

export const ScheduleCard: React.FC<ScheduleCardProps> = ({
  time,
  availableSeats,
  waitingCount,
  isActive,
  onClick
}) => {
  return (
    <button
      className={`${styles.scheduleCard} ${isActive ? styles.scheduleCardActive : ''}`}
      onClick={onClick}
      aria-pressed={isActive}
    >
      <p className={styles.scheduleTime}>{time}</p>
      <p className={styles.seatsInfo}>잔여좌석({availableSeats}석)</p>
      <p className={styles.waitingInfo}>대기 {waitingCount}명</p>
    </button>
  );
};
