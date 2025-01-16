import React, { useState } from "react";
import styles from "./InquiryForm.module.css";
import { CategorySelect } from "./CategorySelect.tsx";
import { InquiryInput } from "./InquiryInput.tsx";
import { InquiryButton } from "./InquiryButton.tsx";

export const InquiryForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    // Handle form submission
  };

  return (
    <form className={styles.inquiryContainer}>
      <header className={styles.header}>
        <a href="/Mypage" className={styles.headerIcon}>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/dbbf29bacc63dc6ef82359fb45b0d56eb2145ad6cfe9c9af8b776f8fd57d5005?placeholderIfAbsent=true&apiKey=c37b27135006443aab5f3858d3155b30"
            className={styles.headerIcon}
            alt=""
          />
        </a>
        <h1 className={styles.headerTitle}>문의하기</h1>
      </header>

      <CategorySelect onSelect={() => {}} />

      <InquiryInput value={title} onChange={setTitle} placeholder="제목" />

      <InquiryInput
        value={content}
        onChange={setContent}
        placeholder="문의사항을 작성해주세요"
      />

      <InquiryButton onClick={handleSubmit} />
    </form>
  );
};

export default InquiryForm;
