import React from 'react';
import styles from './UserProfile.module.css';

interface FormCardProps {
  title: string;
  inputs: Array<{
    id: string;
    placeholder: string;
    type?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    
  }>;
  
  buttonText: string;
  onSubmit: (event: React.FormEvent) => void;
  buttonDisabled ?: boolean; 
}

const FormCard: React.FC<FormCardProps> = ({ title, inputs, buttonText, onSubmit ,buttonDisabled }) => {
  
  return (
    
    <form className={styles.formCard} onSubmit={onSubmit}>
      <h2 className={styles.formTitle}>{title}</h2>
      {inputs.map(({ id, placeholder, value, type = 'text', onChange }) => (
        <React.Fragment key={id}>
          <label htmlFor={id} className={styles['visually-hidden']}>{placeholder}</label>
          <input
            type={type}
            id={id}
            value={value}
            className={styles.formInput}
            placeholder={placeholder}
            aria-label={placeholder}
            onChange={onChange}
          />
        </React.Fragment>
      ))}
      <button type="submit" className={styles.submitButton}  disabled={buttonDisabled}   >
        {buttonText}
      </button>
    </form>
  );
};

export default FormCard;
