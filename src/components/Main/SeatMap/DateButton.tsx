import React from 'react';
import styles from './SeatSelection.module.css';
import { DateButtonProps } from './types';

export const DateButton: React.FC<DateButtonProps> = ({ day, date, isActive, onClick }) => {
  return (
    <button
      className={`${styles.dateButton} ${isActive ? styles.dateButtonActive : ''}`}
      onClick={onClick}
      aria-pressed={isActive}
    >
      <span className={styles.dateText}>{date}</span>
      <span className={styles.dayText}>{day}</span>
    </button>
  );
};