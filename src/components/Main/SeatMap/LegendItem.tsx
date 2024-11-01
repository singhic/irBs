import React from 'react'; // React 라이브러리 불러오기
import styles from './SeatSelection.module.css'; // CSS 모듈 스타일 불러오기
import { LegendItemProps } from './types'; // LegendItemProps 타입 불러오기

// LegendItem 컴포넌트 정의
export const LegendItem: React.FC<LegendItemProps> = ({ icon, label, alt }) => {
  return (
    <div className={styles.legendItem}> {/* 전설 아이템 컨테이너 */}
      <img src={icon} alt={alt} className={styles.legendIcon} /> {/* 아이콘 이미지 */}
      <span>{label}</span> {/* 라벨 텍스트 */}
    </div>
  );
};
