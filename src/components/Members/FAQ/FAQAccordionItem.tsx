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
            src="/img/icon/arrow-bottom.svg" 
            alt={item.isOpen ? "펼치기" : "접기"} 
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