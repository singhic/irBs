import React, { useEffect, useState } from "react";
import styles from "./RecentPenalties.module.css";
import { PenaltyItem } from "./PenaltyItem.tsx";
import { PenaltyRecord } from "./types.ts";
import axios from "axios";



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
    date: "2024. 09. 24",
    location: "장유",
    iconSrc: "img/icon/arrow-right.png",
  },
];
const penaltyCount = penaltyRecords.length; // 전체 패널티 횟수
const maxPenalties = 3; // 사용 정지 기준 패널티 횟수
const isSuspended = penaltyCount >= maxPenalties;
export const RecentPenalties: React.FC = () => {
  const [message, setMessage] = useState("");
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
          <div className={styles.statusCount}>{penaltyCount}회</div>
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
