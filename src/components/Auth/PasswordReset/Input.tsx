import React from 'react';
import styles from './Input.module.css';

interface InputProps {
  id: string;
  label: string;
  className?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  spacing?: 'normal' | 'large';
}

export const Input: React.FC<InputProps> = ({ id, label, className, value, onChange, spacing }) => {
  return (
    <>
    
      <input
        id={id}
        placeholder={label}
      


        value={value}
        onChange={onChange}
        className={`${styles.input} ${spacing === 'large' ? styles.inputLarge : styles.inputSpacing} ${className || ''}`}
        aria-label={label}
      />
    </>
  );
};