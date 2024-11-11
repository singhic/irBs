import React, { useState } from 'react';
import { Seat } from '../SeatMap/Seat.tsx'; // Seat 컴포넌트를 불러옴
import styles from '../SeatMap/SeatSelection.module.css'; // 스타일 불러오기

type SeatStatus = "available" | "reserved" | "selected";

interface SeatProps {
  seatNumber: string;
  initialStatus: SeatStatus;
}

interface LegendItemProps {
  icon: string;
  label: string;
  alt: string;
}

const LegendItem: React.FC<LegendItemProps> = ({ icon, label, alt }) => (
  <div className={styles.legendItem}>
    <img src={icon} alt={alt} />
    <span>{label}</span>
  </div>
);

export const SeatView: React.FC = () => {
  const [selectedSeat] = useState<string | null>(null); // 선택된 좌석 상태
  
  const seats: SeatProps[] = [
    { seatNumber: '1', initialStatus: 'available' },
    { seatNumber: '2', initialStatus: 'reserved' },
    { seatNumber: '3', initialStatus: 'available' },
    { seatNumber: '4', initialStatus: 'available' },
    { seatNumber: '5', initialStatus: 'reserved' },
    { seatNumber: '6', initialStatus: 'available' },
    { seatNumber: '7', initialStatus: 'available' },
    { seatNumber: '8', initialStatus: 'reserved' },
    { seatNumber: '9', initialStatus: 'available' },
    { seatNumber: '10', initialStatus: 'available' },
    { seatNumber: '11', initialStatus: 'selected' },
    { seatNumber: '12', initialStatus: 'available' },
    { seatNumber: '13', initialStatus: 'available' },
    { seatNumber: '14', initialStatus: 'reserved' },
    { seatNumber: '15', initialStatus: 'available' },
    { seatNumber: '16', initialStatus: 'available' },
    { seatNumber: '17', initialStatus: 'reserved' },
    { seatNumber: '18', initialStatus: 'available' },
    { seatNumber: '19', initialStatus: 'available' },
    { seatNumber: '20', initialStatus: 'reserved' },
    { seatNumber: '21', initialStatus: 'available' },
    { seatNumber: '22', initialStatus: 'available' },
    { seatNumber: '23', initialStatus: 'reserved' },
    { seatNumber: '24', initialStatus: 'available' },
    { seatNumber: '25', initialStatus: 'available' },
    { seatNumber: '26', initialStatus: 'reserved' },
    { seatNumber: '27', initialStatus: 'available' },
    { seatNumber: '28', initialStatus: 'available' },
    { seatNumber: '29', initialStatus: 'reserved' },
    { seatNumber: '30', initialStatus: 'available' },
    { seatNumber: '31', initialStatus: 'available' },
    { seatNumber: '32', initialStatus: 'reserved' },
    { seatNumber: '33', initialStatus: 'available' },
    { seatNumber: '34', initialStatus: 'available' },
    { seatNumber: '35', initialStatus: 'reserved' },
    { seatNumber: '36', initialStatus: 'available' },
    { seatNumber: '37', initialStatus: 'available' },
    { seatNumber: '38', initialStatus: 'reserved' },
    { seatNumber: '39', initialStatus: 'available' },
    { seatNumber: '40', initialStatus: 'available' },
    { seatNumber: '41', initialStatus: 'reserved' },
    { seatNumber: '42', initialStatus: 'available' },
    { seatNumber: '43', initialStatus: 'available' },
    { seatNumber: '44', initialStatus: 'reserved' }
  ];
  


  return (
    <section className={styles.seatingSection}>
      <div className={styles.legend}>
        {/* 좌석 아이콘과 설명 */}
        <LegendItem icon="/img/seat/seat_WHITE.png" label="빈좌석" alt="Empty seat icon" />
        <LegendItem icon="/img/seat/seat_GRAY.png" label="예약석" alt="Reserved seat icon" />
        <LegendItem icon="/img/seat/seat_GREEN.png" label="선택좌석" alt="Selected seat icon" />
      </div>

      <div className={styles.busLayout}>
        <div className={styles.driverLayout}>
          <img src="/img/seat/driver.png" alt="Driver" className={styles.driverIcon} />
        </div>
        <div className={styles.seatGrid}>
          {Array.from({ length: Math.ceil(seats.length / 2) }, (_, i) => (
            <div className={styles.pair} key={i}>
              <Seat
                seatNumber={seats[i * 2].seatNumber}
                initialStatus={seats[i * 2].initialStatus}
                isSelected={selectedSeat === seats[i * 2].seatNumber}
              />
              {seats[i * 2 + 1] && (
                <Seat
                  seatNumber={seats[i * 2 + 1].seatNumber}
                  initialStatus={seats[i * 2 + 1].initialStatus}
                  isSelected={selectedSeat === seats[i * 2 + 1].seatNumber}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
