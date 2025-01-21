import React from "react";
import styles from "./InquiryForm.module.css";
import { CategorySelectProps } from "./types.ts";

export const CategorySelect: React.FC<CategorySelectProps> = ({ onSelect }) => (
  <select
    className={styles.categorySelect}
    aria-label="카테고리 선택"
    name="category"
  >
    <option value="none">=== 문의 카테고리를 선택해주세요 ===</option>
    <option value="not_boraded">미탑승</option>
    <option value="penalty">패널티</option>
    <option value="lost">분실물</option>
    <option value="manner">비매너</option>
    <option value="inconvenient">불편사항</option>
    <option value="something">기타 문의</option>
  </select>
);
