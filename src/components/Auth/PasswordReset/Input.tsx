import React from 'react';
import styles from './Input.module.css';

interface InputProps {
  id: string;
  label: string;
  className?: string;
  spacing?: 'normal' | 'large';
}

export const Input: React.FC<InputProps> = ({ id, label, className, spacing }) => {
  return (
    <>
      <label htmlFor={id} className="visually-hidden">{label}</label>
      <input
        id={id}
        placeholder={label}
        className={`${styles.input} ${spacing === 'large' ? styles.inputLarge : styles.inputSpacing} ${className || ''}`}
        aria-label={label}
      />
    </>
  );
};