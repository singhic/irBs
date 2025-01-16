import React from "react";
import styles from "./InquiryForm.module.css";
import { DetailInputProps } from "./types.ts";

export const DetailInput: React.FC<DetailInputProps> = ({
  value,
  onChange,
  placeholder,
}) => (
  <textarea
    className={styles.DetailInput}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    aria-label={placeholder}
  />
);
