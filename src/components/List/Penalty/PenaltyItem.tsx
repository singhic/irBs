import React from "react";
import styles from "./RecentPenalties.module.css";
import { PenaltyItemProps } from "./types.ts";

export const PenaltyItem: React.FC<PenaltyItemProps> = ({
  date,
  location,
  iconSrc,
}) => {
  return (
    <div className={styles.penaltyRecord}>
      <div className={styles.penaltyInfo}>
        <div className={styles.penaltyDate}>{date}</div>
        <div className={styles.penaltyLocation}>{location}</div>
      </div>
      <a href="/Booklist" className={styles.penaltyIcon}>
        <img
          loading="lazy"
          src={iconSrc}
          className={styles.penaltyIcon}
          alt=""
        />
      </a>
    </div>
  );
};
