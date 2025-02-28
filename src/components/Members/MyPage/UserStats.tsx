import React from "react";
import styles from "./MyPage.module.css";
import { UserStatsProps } from "./types";

export const UserStats: React.FC<UserStatsProps> = ({
  penaltyCount,
  mannerScore,
}) => {
  // 패널티 점수에 따라 색상을 다르게 적용
  const getPenaltyClass = () => {
    if (penaltyCount >= 3) return styles.penaltyRed; // 3점 이상: 빨강
    if (penaltyCount === 2) return styles.penaltyOrange; // 2점: 주황
    if (penaltyCount === 1) return styles.penaltyYellow; // 1점: 노랑
    return ""; // 0점: 기본 스타일
  };
  return(
    <div className={styles.statsContainer}>
      <div className={styles.statCard}>
        <div className={styles.statTitle}>
          <span>패널티 누적</span>
          <img src="/img/icon/warninglogo.svg" alt="" className={styles.icon} />
        </div>
        <div className={`${styles.penaltystatValue} ${getPenaltyClass()}`}>
          {penaltyCount}회
        </div>
      </div>
      <div className={styles.statCard}>
        <div className={styles.statTitle}>매너 점수</div>
        <div className={styles.mannerstatValue}>{mannerScore}</div>
      </div>
    </div>
  );    
};
