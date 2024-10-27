import { FC } from 'react';
import styles from './SeatMap.module.css';
import { SeatProps } from './types';
import React from 'react';

export const Seat: FC<SeatProps> = ({ number, type }) => {
  const seatClass = type === 'red' ? styles.seatRed : type === 'grey' ? styles.seatGrey : styles.seatGreen;
  
  return (
    <div className={`${styles.seat}`}>
      <div className={`${styles.seatTop} ${seatClass}`}>
        <div className={styles.seatNumber}>{number}</div>
      </div>
      <div className={styles.seatBottom} />
    </div>
  );
};

export default Seat;