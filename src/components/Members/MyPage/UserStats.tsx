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
        <img
          src="/img/icon/warninglogo.svg"
          alt=""
          className={styles.icon}
        />
      </div>
      <div className={styles.statValue}>{penaltyCount}</div>
    </div>
    <div className={styles.statCard}>
      <div className={styles.statTitle}>비매너 점수</div>
      <div className={styles.statValue}>{mannerScore}</div>
    </div>
  </div>
);
