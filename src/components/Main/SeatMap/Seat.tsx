import React from 'react';
import styles from './SeatSelection.module.css';
import { SeatProps } from './types';

export const Seat: React.FC<SeatProps> = ({ seatNumber, status, color, onSelect }) => {
  const handleClick = () => {
    if (status === 'available' && onSelect) {
      onSelect(seatNumber);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleClick();
    }
  };

  return (
    <div
      className={`${styles.seat} ${styles[`seat-${color}`]}`}
      role="button"
      tabIndex={status === 'available' ? 0 : -1}
      onClick={handleClick}
      onKeyPress={handleKeyPress}
      aria-label={`Seat ${seatNumber} - ${status}`}
      aria-disabled={status !== 'available'}
    >
      <div className={styles.seatTop}>
        <div className={styles.seatBorder}>
          <div className={styles.seatHandle} />
          <span className={styles.seatNumber}>{seatNumber}</span>
          <div className={styles.seatHandle} />
        </div>
        <div className={styles.seatBase} />
      </div>
    </div>
  );
};