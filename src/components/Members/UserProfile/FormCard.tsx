import React from 'react';
import styles from './UserProfile.module.css';

interface FormCardProps {
  title: string;
  inputs: Array<{
    id: string;
    placeholder: string;
    type?: string;
  }>;
  submitButtonSrc: string;
}

export const FormCard: React.FC<FormCardProps> = ({ title, inputs, submitButtonSrc }) => {
  return (
    <form className={styles.formCard}>
      <h2 className={styles.formTitle}>{title}</h2>
      {inputs.map(({ id, placeholder, type = 'text' }) => (
        <React.Fragment key={id}>
          <label htmlFor={id} className={styles['visually-hidden']}>{placeholder}</label>
          <input
            type={type}
            id={id}
            className={styles.formInput}
            placeholder={placeholder}
            aria-label={placeholder}
          />
        </React.Fragment>
      ))}
      <button type="submit" className={styles.submitButton}>
        <img src={submitButtonSrc} alt="Submit" className={styles.submitButton} />
      </button>
    </form>
  );
}