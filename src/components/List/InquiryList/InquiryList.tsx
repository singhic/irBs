import React from "react";
import styles from "./InquiryList.module.css";
import { InquiryCard } from "./InquiryCard.tsx";
import { InquiryItem } from "./types.ts";

const inquiryData: InquiryItem[] = [
  {
    date: "2024. 10. 22",
    type: "불편사항",
    iconSrc:
      "img/icon/arrow-right.png",
  },
  {
    date: "2024. 10. 12",
    type: "패널티",
    iconSrc:
      "img/icon/arrow-right.png",
  },
  {
    date: "2024. 10. 12",
    type: "미탑승",
    iconSrc:
      "img/icon/arrow-right.png",
  },
];

export const InquiryList: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <a href="/Mypage" className={styles.headerIcon}>
          <img loading="lazy" src="img/icon/arrow-left.png" alt="뒤로가기" />
        </a>
        <div className={styles.headerTitle}>문의 내역</div>
      </div>
      {inquiryData.map((inquiry, index) => (
        <InquiryCard key={`${inquiry.date}-${index}`} inquiry={inquiry} />
      ))}
    </div>
  );
};

export default InquiryList;
