import React from 'react';
import styles from './SeatSelection.module.css';
import { LegendItemProps } from './types';

export const LegendItem: React.FC<LegendItemProps> = ({ icon, label, alt }) => {
  return (
    <div className={styles.legendItem}>
      <img src={icon} alt={alt} className={styles.legendIcon} />
      <span>{label}</span>
    </div>
  );
};