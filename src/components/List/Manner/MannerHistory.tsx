import React from "react";
import styles from "./MannerHistory.module.css";
import { ScoreCard } from "./ScoreCard.tsx";
import { HistoryItem } from "./HistoryItem.tsx";
import { MannerHistoryItem } from "./types.ts";

const historyItems: MannerHistoryItem[] = [
  {
    date: "2024. 10. 22",
    description: "문의사항 접수",
    iconSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/3535dce80e5ad2414b0552a0cab93054396d7a56ad955366d073477a77523bde?placeholderIfAbsent=true&apiKey=c37b27135006443aab5f3858d3155b30",
  },
  {
    date: "2024. 10. 12",
    description: "미탑승",
    iconSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/01d26914d33afaa121e9b2e7f6b7f93588570b5b9879d2c28ab0312256abb08e?placeholderIfAbsent=true&apiKey=c37b27135006443aab5f3858d3155b30",
  },
];

export const MannerHistory: React.FC = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <a href="/Mypage" className={styles.headerIcon}>
          <img loading="lazy" src="img/icon/arrow-left.png" alt="뒤로가기" />
        </a>
        <h1 className={styles.headerTitle}>비매너 내역</h1>
      </header>

      <ScoreCard score={85} />

      {historyItems.map((item, index) => (
        <HistoryItem
          key={index}
          date={item.date}
          description={item.description}
          iconSrc={item.iconSrc}
        />
      ))}

      <div className={styles.penaltyNotice}>
        매너 점수 감소로 인한 패널티 없음
      </div>
    </div>
  );
};

export default MannerHistory;
