import React from "react";
import styles from "./InquiryForm.module.css";
import { InquiryInputProps } from "./types.ts";

export const InquiryInput: React.FC<InquiryInputProps> = ({
  value,
  onChange,
  placeholder,
}) => (
  <input
    className={styles.inquiryInput}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    aria-label={placeholder}
  />
);
