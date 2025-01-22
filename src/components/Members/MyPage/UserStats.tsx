import React from "react";
import styles from "./MyPage.module.css";
import { UserStatsProps } from "./types";

export const UserStats: React.FC<UserStatsProps> = ({
  penaltyCount,
  mannerScore,
}) => (
  <div className={styles.statsContainer}>
    <div className={styles.statCard}>
      <div className={styles.statTitle}>
        <span>패널티 누적</span>
        <img src="/img/icon/warninglogo.svg" alt="" className={styles.icon} />
      </div>
      <div className={styles.penaltystatValue}>{penaltyCount}</div>
    </div>
    <div className={styles.statCard}>
      <div className={styles.statTitle}>매너 점수</div>
      <div className={styles.mannerstatValue}>{mannerScore}</div>
    </div>
  </div>
);
