import React from "react";
import styles from "./RecentPenalties.module.css";
import { PenaltyItem } from "./PenaltyItem.tsx";
import { PenaltyRecord } from "./types.ts";

const penaltyRecords: PenaltyRecord[] = [
  {
    date: "2024. 10. 22",
    location: "양산-북정",
    iconSrc: "img/icon/arrow-right.png",
  },
  {
    date: "2024. 10. 12",
    location: "장유",
    iconSrc: "img/icon/arrow-right.png",
  },
  {
    date: "2024. 10. 05",
    location: "장유",
    iconSrc: "img/icon/arrow-right.png",
  },
  {
    date: "2024. 9. 24",
    location: "장유",
    iconSrc: "img/icon/arrow-right.png",
  },
];

export const RecentPenalties: React.FC = () => {
  return (
    <div className={styles.penaltyContainer}>
      <header className={styles.penaltyHeader}>
        <a href="/Mypage" className={styles.headerIcon}>
          <img loading="lazy" src="img/icon/arrow-left.png" alt="뒤로가기" />
        </a>
        <h1 className={styles.headerTitle}>패널티 내역</h1>
      </header>

      <div className={styles.penaltyContent}>
        <div className={styles.penaltyStatus}>
          <div className={styles.statusLabel}>패널티 현황</div>
          <div className={styles.statusCount}>1회</div>
        </div>

        {penaltyRecords.map((record, index) => (
          <PenaltyItem
            key={index}
            date={record.date}
            location={record.location}
            iconSrc={record.iconSrc}
          />
        ))}

        <div className={styles.penaltySuspension}>
          패널티 3회로 인한 사용 정지 3일
        </div>
      </div>
    </div>
  );
};

export default RecentPenalties;
