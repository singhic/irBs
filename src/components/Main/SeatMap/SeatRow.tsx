import { FC } from 'react';
import styles from './SeatMap.module.css';
import { Seat } from './Seat';
import { SeatRowProps } from './types';
import React from 'react';

export const SeatRow: FC<SeatRowProps> = ({ seats }) => {
  return (
    <div className={styles.seatRow}>
      <div className={styles.seatGroup}>
        {seats.map((seat, index) => (
          <Seat key={index} {...seat} />
        ))}
      </div>
    </div>
  );
};