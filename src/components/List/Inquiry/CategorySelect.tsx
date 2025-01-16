import React from "react";
import styles from "./InquiryForm.module.css";
import { CategorySelectProps } from "./types.ts";

export const CategorySelect: React.FC<CategorySelectProps> = ({ onSelect }) => (
  <button
    className={styles.categorySelect}
    onClick={() => onSelect("")}
    aria-label="카테고리 선택"
  >
    <span>카테고리를 선택해주세요</span>
    <img
      src="https://cdn.builder.io/api/v1/image/assets/TEMP/6b88efd3dc1c19730333cac33d7136a0978c5a6ede21b0e921dc2fe4086b0b2a?placeholderIfAbsent=true&apiKey=c37b27135006443aab5f3858d3155b30"
      className={styles.dropdownIcon}
      alt=""
    />
  </button>
);
