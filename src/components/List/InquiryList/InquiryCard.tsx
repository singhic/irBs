import React from "react";
import styles from "./InquiryCard.module.css";
import { InquiryItem } from "./types.ts";

interface InquiryCardProps {
  inquiry: InquiryItem;
}

export const InquiryCard: React.FC<InquiryCardProps> = ({ inquiry }) => {
  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <div className={styles.date}>{inquiry.date}</div>
        <div className={styles.type}>{inquiry.type}</div>
      </div>
      <img
        loading="lazy"
        src={inquiry.iconSrc}
        alt=""
        className={styles.icon}
      />
    </div>
  );
};
