import React from 'react';
import styles from './FAQ.module.css';
import { FAQItem } from './types';

interface FAQAccordionItemProps {
  item: FAQItem;
  onClick: () => void;
}

export const FAQAccordionItem: React.FC<FAQAccordionItemProps> = ({ item, onClick }) => {
  return (
    <article className={styles.accordionItem}>
      <div className={styles.questionWrapper}>
        <h3 className={styles.question}>{item.question}</h3>
        <button 
          className={styles.toggleButton}
          onClick={onClick}
          aria-expanded={item.isOpen}
          aria-controls={`answer-${item.question}`}
        >
          <img 
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/dda08242ab8984b6f5737f72fbf8069fbf4c6323514b801bca6a49ee3862a76d?placeholderIfAbsent=true&apiKey=c37b27135006443aab5f3858d3155b30" 
            alt={item.isOpen ? "접기" : "펼치기"} 
            className={styles.toggleIcon}
          />
        </button>
      </div>
      {item.isOpen && item.answer && (
        <p 
          id={`answer-${item.question}`}
          className={styles.answer}
        >
          {item.answer}
        </p>
      )}
    </article>
  );
};