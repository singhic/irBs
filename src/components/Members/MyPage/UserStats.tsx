import React from 'react';
import styles from './MyPage.module.css';
import { UserStatsProps } from './types';

export const UserStats: React.FC<UserStatsProps> = ({ penaltyCount, mannerScore }) => (
  <div className={styles.statsContainer}>
    <div className={styles.statCard}>
      <div className={styles.statTitle}>
        <span>패널티 누적</span>
        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/6e320303532684b9d1bb5b1184861621757f154f2bef4f1038b401b69c63e230?placeholderIfAbsent=true" alt="" className={styles.icon} />
      </div>
      <div className={styles.statValue}>{penaltyCount}회</div>
    </div>
    <div className={styles.statCard}>
      <div className={styles.statTitle}>비매너 점수</div>
      <div className={styles.statValue}>{mannerScore}</div>
    </div>
  </div>
);