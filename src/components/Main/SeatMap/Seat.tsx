import React from 'react';
import styles from './SeatSelection.module.css';
import { SeatProps } from './types';


interface SeatComponentProps extends SeatProps {
  isSelected: boolean; // 선택 여부를 나타내는 새로운 prop
}

export const Seat: React.FC<SeatComponentProps> = ({ seatNumber, initialStatus, onSelect, isSelected }) => {
  // 클릭 핸들러 함수
  const handleClick = () => {
    if (initialStatus === 'available' && onSelect) {
      onSelect(seatNumber);
    }
  };

  // 선택 상태에 따라 이미지와 상태 텍스트를 동적으로 설정
  const displayStatus = isSelected ? 'selected' : initialStatus;

  return (
    <button
      className={styles.seatButton} 
      tabIndex={displayStatus === 'available' ? 0 : -1}
      onClick={handleClick}
      aria-label={`Seat ${seatNumber}_${displayStatus}`}
      aria-disabled={displayStatus === 'reserved'}
    >
      <img className={styles.seatImg}
        src={
          displayStatus === 'selected'
            ? '/img/seat/seat_selected.png'
            : `/img/seat/seat_${displayStatus}.png`
        }
        alt={`Seat ${seatNumber} - ${displayStatus}`}
      />
      <span className={styles.seatText}>
        {displayStatus === 'selected' ? '선택좌석' : seatNumber}
      </span>

    </button>
  );
};

export default Seat;
