import React, { useState } from 'react';
import styles from './SeatSelection.module.css';
import { Seat } from './Seat.tsx';
import { DateButton } from './DateButton.tsx';
import { ScheduleCard } from './ScheduleCard.tsx';
import { LegendItem } from './LegendItem.tsx';

export const SeatSelection: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(0);
  const [tripType, setTripType] = useState<'departure' | 'return'>('departure');
  const [selectedSchedule, setSelectedSchedule] = useState(2);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const dates = [
    { date: '20일', day: '월' },
    { date: '21일', day: '화' },
    { date: '22일', day: '수' },
    { date: '23일', day: '목' },
    { date: '24일', day: '금' }
  ];

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

const seats = Array.from({ length: 44 }, (_, index) => ({
  seatNumber: String(index + 1),
  status: index < 36 ? 'available' : index === 27 ? 'selected' : 'reserved',
  color: index < 36 ? 'red' : index === 27 ? 'green' : 'grey'
}));

const handleSeatSelect = (seatNumber: string) => {
  setSelectedSeats(prev => 
    prev.includes(seatNumber)
      ? prev.filter(num => num !== seatNumber)
      : [...prev, seatNumber]
  );
};

return (
  <div className={styles.seatSelection}>
    <header className={styles.header}>
      <img src="/back-icon.svg" alt="Back" className={styles.backIcon} />
      <h1 className={styles.title}>좌석 선택</h1>
    </header>

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

      <div className={styles.scheduleDivider} />

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

    <section className={styles.seatingSection}>
      <div className={styles.legend}>
        <LegendItem icon="/empty-seat.svg" label="빈좌석" alt="Empty seat icon" />
        <div className={styles.legendItem}>
          <LegendItem icon="/reserved-seat.svg" label="예약석" alt="Reserved seat icon" />
          <LegendItem icon="/selected-seat.svg" label="선택좌석" alt="Selected seat icon" />
        </div>
      </div>

      <div className={styles.busLayout}>
        <img src="/driver-icon.svg" alt="Driver" className={styles.driverIcon} />
        <img src="/steering-wheel.svg" alt="Steering wheel" className={styles.steeringIcon} />
        
        <div className={styles.seatGrid}>
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

    <footer className={styles.footer}>
      <button className={styles.confirmButton}>
        예약 완료
      </button>
      <button className={styles.cancelButton}>
        전체 취소
      </button>
    </footer>
  </div>
);
};

export default SeatSelection;