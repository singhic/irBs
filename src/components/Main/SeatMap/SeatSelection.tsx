import React, { useState } from 'react'; // React와 useState 훅을 불러옴
import styles from './SeatSelection.module.css'; // 컴포넌트의 CSS 모듈을 불러옴
import { Seat } from './Seat.tsx'; // Seat 컴포넌트를 불러옴
import { DateButton } from './DateButton.tsx'; // DateButton 컴포넌트를 불러옴
import { ScheduleCard } from './ScheduleCard.tsx'; // ScheduleCard 컴포넌트를 불러옴
import { LegendItem } from './LegendItem.tsx'; // LegendItem 컴포넌트를 불러옴
import {DateButtonProps, ScheduleCardProps} from './types.ts';

type SeatStatus = "available" | "reserved" | "selected";

interface SeatProps {
  seatNumber: string;
  initialStatus: SeatStatus;
  onSelect: (seatNumber: string) => void;
}

// SeatSelection 컴포넌트 정의
export const SeatSelection: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(0); // 선택된 날짜를 상태로 저장
  const [tripType, setTripType] = useState<'departure' | 'return'>('departure'); // 여행 유형을 상태로 저장
  const [selectedSchedule, setSelectedSchedule] = useState(2); // 선택된 스케줄을 상태로 저장
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null); // 선택된 좌석을 상태로 저장

  // 날짜 배열
  const dates:DateButtonProps[] = [
    { date: '20일', day: '월' },
    { date: '21일', day: '화' },
    { date: '22일', day: '수' },
    { date: '23일', day: '목' },
    { date: '24일', day: '금' }
  ];

  // 스케줄 배열
  const schedules:ScheduleCardProps[] = [
    {
      time: '16:20',
      availableSeats: 34,
      waitingCount: 0
    },
    {
      time: '17:20',
      availableSeats: 36,
      waitingCount: 0
    },
    {
      time: '18:20',
      availableSeats: 41,
      waitingCount: 0
    }
  ];

  
  // 좌석 선택 핸들러
  const handleSeatSelect = (seatNumber: string) => {
    if (selectedSeat === seatNumber) {
      // 이미 선택된 좌석을 다시 클릭하면 선택 해제
      setSelectedSeat(null);
    }else{
      setSelectedSeat(seatNumber)}
  };

  const handleCancelAll = () => {
    setSelectedSeat(null);// 모든 예약 취소 아직 구현안함
  };
    
    // 좌석 배열 생성 어떻게 불러오는지 아직몰라서 그냥 다 넣음ㅋㅋㅋㅋㅋㅋㅋ
  const seats: SeatProps[] = [
    { seatNumber: '1', initialStatus: 'available', onSelect: handleSeatSelect },
    { seatNumber: '2', initialStatus: 'reserved', onSelect: handleSeatSelect },
    { seatNumber: '3', initialStatus: 'available', onSelect: handleSeatSelect },
    { seatNumber: '4', initialStatus: 'available', onSelect: handleSeatSelect },
    { seatNumber: '5', initialStatus: 'available', onSelect: handleSeatSelect },
    { seatNumber: '6', initialStatus: 'available', onSelect: handleSeatSelect },
    { seatNumber: '7', initialStatus: 'available', onSelect: handleSeatSelect },
    { seatNumber: '8', initialStatus: 'available', onSelect: handleSeatSelect },
    { seatNumber: '9', initialStatus: 'available', onSelect: handleSeatSelect },
    { seatNumber: '10', initialStatus: 'available', onSelect: handleSeatSelect },
    { seatNumber: '11', initialStatus: 'available', onSelect: handleSeatSelect },
    { seatNumber: '12', initialStatus: 'available', onSelect: handleSeatSelect },
    { seatNumber: '13', initialStatus: 'available', onSelect: handleSeatSelect },
    { seatNumber: '14', initialStatus: 'available', onSelect: handleSeatSelect },
    { seatNumber: '15', initialStatus: 'available', onSelect: handleSeatSelect },
    { seatNumber: '16', initialStatus: 'available', onSelect: handleSeatSelect },
    { seatNumber: '17', initialStatus: 'available', onSelect: handleSeatSelect },
    { seatNumber: '18', initialStatus: 'available', onSelect: handleSeatSelect },
    { seatNumber: '19', initialStatus: 'available', onSelect: handleSeatSelect },
    { seatNumber: '20', initialStatus: 'available', onSelect: handleSeatSelect },
    { seatNumber: '21', initialStatus: 'reserved', onSelect: handleSeatSelect },
    { seatNumber: '22', initialStatus: 'reserved', onSelect: handleSeatSelect },
    { seatNumber: '23', initialStatus: 'reserved', onSelect: handleSeatSelect },
    { seatNumber: '24', initialStatus: 'reserved', onSelect: handleSeatSelect },
    { seatNumber: '25', initialStatus: 'reserved', onSelect: handleSeatSelect },
    { seatNumber: '26', initialStatus: 'reserved', onSelect: handleSeatSelect },
    { seatNumber: '27', initialStatus: 'reserved', onSelect: handleSeatSelect },
    { seatNumber: '28', initialStatus: 'reserved', onSelect: handleSeatSelect },
    { seatNumber: '29', initialStatus: 'reserved', onSelect: handleSeatSelect },
    { seatNumber: '30', initialStatus: 'reserved', onSelect: handleSeatSelect },
    { seatNumber: '31', initialStatus: 'available', onSelect: handleSeatSelect },
    { seatNumber: '32', initialStatus: 'available', onSelect: handleSeatSelect },
    { seatNumber: '33', initialStatus: 'available', onSelect: handleSeatSelect },
    { seatNumber: '34', initialStatus: 'available', onSelect: handleSeatSelect },
    { seatNumber: '35', initialStatus: 'available', onSelect: handleSeatSelect },
    { seatNumber: '36', initialStatus: 'available', onSelect: handleSeatSelect },
    { seatNumber: '37', initialStatus: 'available', onSelect: handleSeatSelect },
    { seatNumber: '38', initialStatus: 'available', onSelect: handleSeatSelect },
    { seatNumber: '39', initialStatus: 'available', onSelect: handleSeatSelect },
    { seatNumber: '40', initialStatus: 'available', onSelect: handleSeatSelect },
    { seatNumber: '41', initialStatus: 'reserved', onSelect: handleSeatSelect },
    { seatNumber: '42', initialStatus: 'reserved', onSelect: handleSeatSelect },
    { seatNumber: '43', initialStatus: 'reserved', onSelect: handleSeatSelect },
    { seatNumber: '44', initialStatus: 'reserved', onSelect: handleSeatSelect },
  ];
    
  // 컴포넌트 렌더링
  return (
    <div className={styles.seatSelection}>
      {/* 헤더 섹션 */}
      <header className={styles.header}>
        <a href="/BusSchedule" className={styles.backButton}> {/* 뒤로가기 버튼 */}
          <img src="/img/icon/arrow-left.png" alt="Back" className={styles.backIcon} /> {/* 뒤로가기 아이콘 */}
        </a>
        <h1 className={styles.title}>좌석 선택</h1>
      </header>

      {/* 날짜 선택 섹션 */}
      <section className={styles.dateSection}>
        {dates.map((date, index) => (
          <DateButton
            key={date.date}
            {...date}
            isActive={selectedDate === index}
            onClick={() => setSelectedDate(index)}
          />
        ))}
      </section>

      {/* 스케줄 선택 섹션 */}
      <section className={styles.scheduleSection}>
        <div className={styles.tripType}>
          <button
            className={`${styles.tripButton} ${tripType === 'departure' ? styles.tripButtonActive : ''}`}
            onClick={() => setTripType('departure')}
            aria-pressed={tripType === 'departure'}
          >
            등교
          </button>
          <button
            className={`${styles.tripButton} ${tripType === 'return' ? styles.tripButtonActive : ''}`}
            onClick={() => setTripType('return')}
            aria-pressed={tripType === 'return'}
          >
            하교
          </button>
        </div>
        <div className={styles.scheduleDivider} /> {/* 스케줄 구분선 */}
        <div className={styles.scheduleCards}>
          {schedules.map((schedule, index) => (
            <ScheduleCard
              key={schedule.time}
              {...schedule}
              isActive={selectedSchedule === index}
              onClick={() => setSelectedSchedule(index)}
            />
          ))}
        </div>
      </section>

      {/* 좌석 선택 섹션 */}
      <section className={styles.seatingSection}>
        <div className={styles.legend}> {/* 전설 아이템 */}
          <LegendItem icon="/img/seat/seat_WHITE.png" label="빈좌석" alt="Empty seat icon" /> {/* 빈 좌석 아이콘 */}
          <LegendItem icon="/img/seat/seat_GRAY.png" label="예약석" alt="Reserved seat icon" /> {/* 예약 좌석 아이콘 */}
          <LegendItem icon="/img/seat/seat_GREEN.png" label="선택좌석" alt="Selected seat icon" /> {/* 선택 좌석 아이콘 */}
        </div>

        <div className={styles.busLayout}> {/* 버스 레이아웃 */}
          <div className={styles.driverLayout}>
            <img src="/img/seat/driver.png" alt="Driver" className={styles.driverIcon} /> {/* 운전사 아이콘 */}
          </div>
          {/* <img src="/steering-wheel.svg" alt="Steering wheel" className={styles.steeringIcon} /> 운전대 아이콘 */}
          <div className={styles.seatGrid}>
            {Array.from({ length: Math.ceil(seats.length / 2) }, (_, i) => (
              <div className={styles.pair} key={i}>
                <Seat
                  {...seats[i * 2]}
                  isSelected={selectedSeat === seats[i * 2].seatNumber}
                  onSelect={(seatNumber) => handleSeatSelect(seatNumber)}
                />
                {seats[i * 2 + 1] && (
                  <Seat
                    {...seats[i * 2 + 1]}
                    isSelected={selectedSeat === seats[i * 2 + 1].seatNumber}
                    onSelect={(seatNumber) => handleSeatSelect(seatNumber)}
                  />
                )}
              </div>
             ))}
          </div>
        </div>
      </section>

      {/* 푸터 섹션 */}
      <footer className={styles.footer}>
        <a href="/Reservations">
          <button className={styles.confirmButton}>
            예약 완료
          </button>
        </a>

        <button 
        className={styles.cancelButton}
        onClick={handleCancelAll}>
          전체 취소
        </button>
      </footer>
    </div>
  );
};

export default SeatSelection;
