import React, { useState } from "react";
import styles from "./FAQ.module.css";
import { FAQAccordionItem } from "./FAQAccordionItem.tsx";
import { FAQItem } from "./types";

const initialFAQs: FAQItem[] = [
  {
    question: "비밀번호 변경을 어떻게 하나요",
    answer:
      "메인페이지 우측 상단 프로필 -> 이름 옆 방향표시 -> 비밀번호 변경 탭에서 변경 가능합니다.",
    isOpen: false,
  },
  {
    question: "카드 등록 변경을 어떻게 하나요",
    answer:
      "메인페이지 우측 상단 프로필 -> 이름 옆 방향표시 -> 카드번호 변경 탭에서 변경 가능합니다.",
    isOpen: false,
  },
  {
    question: "버스요금이 더 나왔어요",
    answer:
      "문의하기를 통해 문의바랍니다. 문의하기는 메인페이지 우측 상단 프로필 -> 문의하기 탭에서 가능합니다.",
    isOpen: false,
  },
  {
    question: "버스 탑승 장소는 어디에 나오나요",
    answer: "메인페이지 공지사항에서 확인 가능합니다.",
    isOpen: false,
  },
  {
    question: "습득물 문의는 어떻게 하나요",
    answer:
      "문의하기를 통해 문의바랍니다. 문의하기는 메인페이지 우측 상단 프로필 -> 문의하기 탭에서 가능합니다.",
    isOpen: false,
  },
  {
    question: "패널티의 기준이 뭔가요",
    answer:
      "대기자가 존재하는 버스에 에약하고 미탑승시 패널티가 부과됩니다. 패널티는 3회 누적 시 당일 포함 3일간 이용이 제한됩니다.",
    isOpen: false,
  },
  {
    question: "비매너의 기준이 뭔가요",
    answer:
      "버스 내에서 다른 승객에게 불편을 주는 행동(소란행위, 옆자리에 가방 두기 등)을 비매너로 간주합니다. 비매너 행동 시 패널티가 부과됩니다. 본 서비스는 추후 공개 예정입니다.",
    isOpen: false,
  },
  {
    question: "버스 탑승에 불편을 겪고있어요",
    answer:
      "문의하기를 통해 문의바랍니다. 문의하기는 메인페이지 우측 상단 프로필 -> 문의하기 탭에서 가능합니다.",
    isOpen: false,
  },
];

export const FAQ: React.FC = () => {
  const [faqs, setFaqs] = useState<FAQItem[]>(initialFAQs);

  const toggleFAQ = (index: number) => {
    setFaqs(
      faqs.map((faq, i) =>
        i === index ? { ...faq, isOpen: !faq.isOpen } : faq
      )
    );
  };

  return (
    <section className={styles.faqSection}>
      <header className={styles.faqHeader}>
        <button onClick={() => window.history.back()}>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/6658073b441adbc80f3e37bb689f9ebf88f65cb1a25c860f9ec8adcbbf83fe3c?placeholderIfAbsent=true"
            alt="뒤로가기 아이콘"
            className={styles.headerIcon}
          />
        </button>
        <h1 className={styles.headerTitle}>자주 묻는 질문</h1>
      </header>

      <main className={styles.faqContent}>
        {faqs.map((faq, index) => (
          <FAQAccordionItem
            key={index}
            item={faq}
            onClick={() => toggleFAQ(index)}
          />
        ))}
      </main>
    </section>
  );
};

export default FAQ;
