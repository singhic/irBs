import { FC } from 'react';
import styles from './SeatMap.module.css';
import { LegendItemProps } from './types.ts';
import React from 'react';

export const LegendItem: FC<LegendItemProps> = ({ icon, text }) => {
  return (
    <div className={styles.legendItem}>
      <img src={icon} alt="" className={styles.legendIcon} />
      <span className={styles.legendText}>{text}</span>
    </div>
  );
};