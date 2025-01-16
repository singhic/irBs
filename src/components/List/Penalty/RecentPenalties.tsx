import React from "react";
import styles from "./RecentPenalties.module.css";
import { PenaltyItem } from "./PenaltyItem.tsx";
import { PenaltyRecord } from "./types.ts";

const penaltyRecords: PenaltyRecord[] = [
  {
    date: "2024. 10. 22",
    location: "양산-북정",
    iconSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/3535dce80e5ad2414b0552a0cab93054396d7a56ad955366d073477a77523bde?placeholderIfAbsent=true&apiKey=c37b27135006443aab5f3858d3155b30",
  },
  {
    date: "2024. 10. 12",
    location: "장유",
    iconSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/b01fd80f-bec9-47bc-afb0-9820976699e9?placeholderIfAbsent=true&apiKey=c37b27135006443aab5f3858d3155b30",
  },
  {
    date: "2024. 10. 05",
    location: "장유",
    iconSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/01d26914d33afaa121e9b2e7f6b7f93588570b5b9879d2c28ab0312256abb08e?placeholderIfAbsent=true&apiKey=c37b27135006443aab5f3858d3155b30",
  },
  {
    date: "2024. 9. 24",
    location: "장유",
    iconSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/01d26914d33afaa121e9b2e7f6b7f93588570b5b9879d2c28ab0312256abb08e?placeholderIfAbsent=true&apiKey=c37b27135006443aab5f3858d3155b30",
  },
];

export const RecentPenalties: React.FC = () => {
  return (
    <div className={styles.penaltyContainer}>
      <header className={styles.penaltyHeader}>
        <a href="/Mypage" className={styles.headerIcon}>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/dbbf29bacc63dc6ef82359fb45b0d56eb2145ad6cfe9c9af8b776f8fd57d5005?placeholderIfAbsent=true&apiKey=c37b27135006443aab5f3858d3155b30"
            className={styles.headerIcon}
            alt="패널티 아이콘"
          />
        </a>
        <h1 className={styles.headerTitle}>패널티 내역</h1>
      </header>

      <div className={styles.penaltyContent}>
        <div className={styles.penaltyStatus}>
          <div className={styles.statusLabel}>패널티 현황</div>
          <div className={styles.statusCount}>1회</div>
        </div>

        {penaltyRecords.slice(0, 3).map((record, index) => (
          <PenaltyItem
            key={index}
            date={record.date}
            location={record.location}
            iconSrc={record.iconSrc}
          />
        ))}

        <div className={styles.suspensionNotice}>
          패널티 3회로 인한 사용 정지 3일
        </div>

        <PenaltyItem
          date={penaltyRecords[3].date}
          location={penaltyRecords[3].location}
          iconSrc={penaltyRecords[3].iconSrc}
        />
      </div>
    </div>
  );
};

export default RecentPenalties;
