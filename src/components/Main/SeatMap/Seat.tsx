import React, { useState } from 'react';
import styles from './SeatSelection.module.css';
import { SeatProps } from './types'; 

// Seat 컴포넌트 정의
export const Seat: React.FC<SeatProps> = ({ seatNumber, initialStatus, color, onSelect }) => {
  // 좌석 상태를 관리하기 위한 useState
  const [status, setStatus] = useState(initialStatus);

  // 클릭 핸들러 함수
  const handleClick = () => {
    if (status === 'available') {
      setStatus('selected'); // 상태를 업데이트 함수로 변경
      if (onSelect) {
        onSelect(seatNumber);
      }
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
    <button
      // 시트 스타일 적용
      // className={`${styles.seat} ${styles[`seat_${color}`]}`}
      // 접근성 속성 설정
      // role="button"
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
      <img 
        src={status === 'selected' 
          ? '/img/seat/seat_selected.png' // 선택된 좌석일 때 표시할 이미지 경로
          : `/img/seat/seat_${status}.png`} // 다른 상태일 때 표시할 이미지 경로
        alt={`Seat ${seatNumber} - ${status}`} 
      />
      <span className={styles.seatNumber}>
        {status === 'selected' ? '예약함' : seatNumber}
      </span>
    </button>
  );
};
