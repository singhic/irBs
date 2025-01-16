import React from "react";
import styles from "./MannerHistory.module.css";
import { ScoreCardProps } from "./types.ts";

export const ScoreCard: React.FC<ScoreCardProps> = ({ score }) => {
  return (
    <div className={styles.scoreCard}>
      <div className={styles.scoreLabel}>매너 점수</div>
      <div className={styles.scoreValue}>{score}점</div>
    </div>
  );
};
