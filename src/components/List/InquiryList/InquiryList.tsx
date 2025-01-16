import React from "react";
import styles from "./InquiryList.module.css";
import { InquiryCard } from "./InquiryCard.tsx";
import { InquiryItem } from "./types.ts";

const inquiryData: InquiryItem[] = [
  {
    date: "2024. 10. 22",
    type: "불편사항",
    iconSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/a82e4647fab3042a2ba57e555ed603539964fa0db4599cd8b8e459485263cf38?placeholderIfAbsent=true&apiKey=c37b27135006443aab5f3858d3155b30",
  },
  {
    date: "2024. 10. 12",
    type: "패널티",
    iconSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/12ebfeda3ad9c2aa6919509b3dcb8c1377d170f8578674980383bac8f487ba99?placeholderIfAbsent=true&apiKey=c37b27135006443aab5f3858d3155b30",
  },
  {
    date: "2024. 10. 12",
    type: "미탑승",
    iconSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/31a02d5f5e2e6d181b4d194201b00af0ea385495650535869564dee54ddc7dea?placeholderIfAbsent=true&apiKey=c37b27135006443aab5f3858d3155b30",
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
