import React, { useState } from 'react'; // React와 useState 훅을 불러옴
import styles from './SeatSelection.module.css'; // 컴포넌트의 CSS 모듈을 불러옴
import { Seat } from './Seat.tsx'; // Seat 컴포넌트를 불러옴
import { DateButton } from './DateButton.tsx'; // DateButton 컴포넌트를 불러옴
import { ScheduleCard } from './ScheduleCard.tsx'; // ScheduleCard 컴포넌트를 불러옴
import { LegendItem } from './LegendItem.tsx'; // LegendItem 컴포넌트를 불러옴

// SeatSelection 컴포넌트 정의
export const SeatSelection: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(0); // 선택된 날짜를 상태로 저장
  const [tripType, setTripType] = useState<'departure' | 'return'>('departure'); // 여행 유형을 상태로 저장
  const [selectedSchedule, setSelectedSchedule] = useState(2); // 선택된 스케줄을 상태로 저장
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]); // 선택된 좌석을 상태로 저장

  // 날짜 배열
  const dates = [
    { date: '20일', day: '월' },
    { date: '21일', day: '화' },
    { date: '22일', day: '수' },
    { date: '23일', day: '목' },
    { date: '24일', day: '금' }
  ];

  // 스케줄 배열
  const schedules = [
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

  // 좌석 배열 생성
  const seats = Array.from({ length: 44 }, (_, index) => ({
    seatNumber: String(index + 1),
    status: index < 36 ? 'available' : index === 27 ? 'selected' : 'reserved',
    color: index < 36 ? 'red' : index === 27 ? 'green' : 'grey'
  }));

  // 좌석 선택 핸들러 함수
  const handleSeatSelect = (seatNumber: string) => {
    setSelectedSeats(prev =>
      prev.includes(seatNumber)
        ? prev.filter(num => num !== seatNumber)
        : [...prev, seatNumber]
    );
  };

  // 컴포넌트 렌더링
  return (
    <body className={styles.seatSelection}>
      {/* 헤더 섹션 */}
      <header className={styles.header}>
        <a href="/BusSchedule" className={styles.backButton}> {/* 뒤로가기 버튼 */}
          <img src="\img\icon\arrow-left.png" alt="Back" className={styles.backIcon} /> {/* 뒤로가기 아이콘 */}
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
          <LegendItem icon="\img\seat\seat_WHITE.png" label="빈좌석" alt="Empty seat icon" /> {/* 빈 좌석 아이콘 */}
          <LegendItem icon="\img\seat\seat_GRAY.png" label="예약석" alt="Reserved seat icon" /> {/* 예약 좌석 아이콘 */}
          <LegendItem icon="\img\seat\seat_GREEN.png" label="선택좌석" alt="Selected seat icon" /> {/* 선택 좌석 아이콘 */}
        </div>
        <div className={styles.busLayout}> {/* 버스 레이아웃 */}
          <img src="/driver-icon.svg" alt="Driver" className={styles.driverIcon} /> {/* 운전사 아이콘 */}
          <img src="/steering-wheel.svg" alt="Steering wheel" className={styles.steeringIcon} /> {/* 운전대 아이콘 */}
           <div className={styles.seatGrid}> {/* 좌석 그리드 */}
            {seats.map(seat => (
              <Seat
                key={seat.seatNumber}
                {...seat}
                onSelect={handleSeatSelect}
              />
            ))}
          </div>
        </div>
      </section>


      {/* 푸터 섹션 */}
      <footer className={styles.footer}>
        <button className={styles.confirmButton}>
          예약 완료
        </button>
        <button className={styles.cancelButton}>
          전체 취소
        </button>
      </footer>
    </body>
  );
};

export default SeatSelection;
