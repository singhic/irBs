import React, { useState } from "react";
import styles from "./InquiryForm.module.css";
import { CategorySelect } from "./CategorySelect.tsx";
import { InquiryInput } from "./InquiryInput.tsx";
import { InquiryButton } from "./InquiryButton.tsx";
import { DetailInput } from "./DetailInput.tsx";

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
          <img src="img/icon/arrow-left.png" alt="뒤로가기" />
        </a>
        <h1 className={styles.headerTitle}>문의하기</h1>
      </header>

      <CategorySelect onSelect={() => {}} />

      <InquiryInput value={title} onChange={setTitle} placeholder="제목" />

      <DetailInput
        value={content}
        onChange={setContent}
        placeholder="문의사항을 작성해주세요"
      />

      <InquiryButton onClick={handleSubmit} />
    </form>
  );
};

export default InquiryForm;
