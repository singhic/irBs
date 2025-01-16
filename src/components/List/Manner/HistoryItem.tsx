import React from "react";
import styles from "./MannerHistory.module.css";
import { HistoryItemProps } from "./types.ts";

export const HistoryItem: React.FC<HistoryItemProps> = ({
  date,
  description,
  iconSrc,
}) => {
  return (
    <div className={styles.historyItem}>
      <div className={styles.historyContent}>
        <div className={styles.historyDate}>{date}</div>
        <div className={styles.historyDescription}>{description}</div>
      </div>
      <img loading="lazy" src={iconSrc} alt="" className={styles.historyIcon} />
    </div>
  );
};
