import { FC } from 'react';
import styles from './ReservationStatus.module.css';
import React from 'react';

interface SeatProps {
  number: string;
  type: 'red' | 'grey' | 'green';
}

export const Seat: FC<SeatProps> = ({ number, type }) => {
  const seatClass = {
    red: styles.seatRed,
    grey: styles.seatGrey,
    green: styles.seatGreen
  }[type];

  const seatBaseClass = {
    red: styles.seatBaseRed,
    grey: styles.seatBaseGrey, 
    green: styles.seatBaseGreen
  }[type];

  const seatNumberClass = {
    red: styles.seatNumberRed,
    grey: styles.seatNumberGrey,
    green: styles.seatNumberGreen
  }[type];

  return (
    <div className={seatClass}>
      <div className={seatBaseClass}>
        <span className={seatNumberClass}>{number}</span>
      </div>
    </div>
  );
};