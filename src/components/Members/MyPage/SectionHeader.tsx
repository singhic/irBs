import React from 'react';
import styles from './MyPage.module.css';
import { SectionHeaderProps } from './types';

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, icon }) => (
  <header className={styles.sectionHeader}>
    <h2>{title}</h2>
    <img src={icon} alt="" className={styles.icon} />
  </header>
);