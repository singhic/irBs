import React from "react";
import styles from "./InquiryForm.module.css";
import { InquiryButtonProps } from "./types.ts";

export const InquiryButton: React.FC<InquiryButtonProps> = ({
  onClick,
  disabled,
}) => (
  <button
    className={styles.submitButton}
    onClick={onClick}
    disabled={disabled}
    aria-label="문의하기"
  >
    <img
      src="https://cdn.builder.io/api/v1/image/assets/TEMP/27ab334dd17dc9de946c30c832cb0a06db7c8dbea05cb2dacbcfc926384075b5?placeholderIfAbsent=true&apiKey=c37b27135006443aab5f3858d3155b30"
      className={styles.buttonBackground}
      alt=""
    />
    <span className={styles.buttonText}>문의하기</span>
  </button>
);
