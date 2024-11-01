import React from 'react';
import styles from './SeatSelection.module.css';
import { SeatProps } from './types'; 

// Seat 컴포넌트 정의
export const Seat: React.FC<SeatProps> = ({ seatNumber, status, color, onSelect }) => {
  
  // 클릭 핸들러 함수
  const handleClick = () => {
    if (status === 'available' && onSelect) {
      onSelect(seatNumber);
    }
  };
  
  // 키보드 이벤트 핸들러 함수
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleClick();
    }
  };

  // 컴포넌트 렌더링
  return (
    <div
      // 시트 스타일 적용
      className={`${styles.seat} ${styles[`seat_${color}`]}`}
      // <img src={`/images/seat_${status}.png`} alt={`Seat ${seatNumber} - ${status}`} /> 

      // 접근성 속성 설정
      role="button"
      // 시트가 사용 가능한 경우에만 tabIndex 설정
      tabIndex={status === 'available' ? 0 : -1} 
      // 클릭 이벤트 핸들러 등록
      onClick={handleClick} 
      // 키보드 이벤트 핸들러 등록
      onKeyPress={handleKeyPress} 
      // 접근성 라벨 설정
      aria-label={`Seat ${seatNumber}_${status}`} 
      // 사용 불가능한 시트인 경우 비활성화 속성 설정
      aria-disabled={status !== 'available'} 
    >
      {/* 이미지로 변경전 코드-------------------------------------------------------------------- */}
      {/* // 시트 상단 
      <div className={styles.seatTop}>
        // 시트 테두리 
        <div className={styles.seatBorder}> 
          // 시트 핸들
          <div className={styles.seatHandle} /> 
          // 시트 번호
          <span className={styles.seatNumber}>{seatNumber}</span> 
          // 시트 상태
          <div className={styles.seatHandle} /> 
        </div>
        // 시트 상태
        <div className={styles.seatBase} /> 
      </div> */}
      {/* 이미지로 변경전 코드-------------------------------------------------------------------- */}
      {/* 이미지로 변경후 코드-------------------------------------------------------------------- */}
      
      <img src={`/images/seat_${status}.png`} alt={`Seat ${seatNumber} - ${status}`} /> 
      <span className={styles.seatNumber}>{seatNumber}</span> 
      {/* 이미지로 변경후 코드----------------------------------------------------------------  */}
    </div>
  );
};
