import React from 'react';
import styles from './MyPage.module.css';
import { RecentItemProps } from './types';

export const RecentItem: React.FC<RecentItemProps> = ({ icon, title, alt }) => (
  <div className={styles.recentItem}>
    <span className={styles.title}>{title}</span>
    <img src={icon} alt={alt || ""} className={styles.icon} />
  </div>
);
