import React, { useState } from 'react';
import styles from './FAQ.module.css';
import { FAQAccordionItem } from './FAQAccordionItem.tsx';
import { FAQItem } from './types';

const initialFAQs: FAQItem[] = [
  {
    question: "비밀번호 변경을 어떻게 하나요",
    answer: "프로필 -> 이름클릭 -> 비밀번호 변경 탭 에서 변경 가능합니다.",
    isOpen: true
  },
  { question: "패널티의 기준이 뭔가요" },
  { question: "카드 등록 변경이 안돼요" },
  { question: "버스요금이 더 나왔어요" },
  { question: "버스 탑승 장소 어디에 나오나요" },
  { question: "ㅁㄴㅇㅁㄴㅇㅁㄴㅇ" },
  { question: "ㅁㄴㅇㅁㄴㅇ" },
  { question: "ㅁㄴㅇㅁㅇ" },
  { question: "ㅁㄴㅇㅁㄴ" },
  { question: "ㅁㄴㄻㄴㄹ" }
];

export const FAQ: React.FC = () => {
  const [faqs, setFaqs] = useState<FAQItem[]>(initialFAQs);

  const toggleFAQ = (index: number) => {
    setFaqs(faqs.map((faq, i) => 
      i === index ? { ...faq, isOpen: !faq.isOpen } : faq
    ));
  };

  return (
    <section className={styles.faqSection}>
      <header className={styles.faqHeader}>
        <img 
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/6658073b441adbc80f3e37bb689f9ebf88f65cb1a25c860f9ec8adcbbf83fe3c?placeholderIfAbsent=true&apiKey=c37b27135006443aab5f3858d3155b30" 
          alt="자주 묻는 질문 아이콘" 
          className={styles.headerIcon} 
        />
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
        
        <p className={styles.helpText}>문제가 있으신가요?</p>
      </main>
    </section>
  );
};

export default FAQ;