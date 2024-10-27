import { FC } from 'react';
import styles from './ReservationStatus.module.css';
import { Seat } from './Seat.tsx';
import { Ticket } from './Ticket.tsx';
import React from 'react';

const seatData = Array.from({ length: 44 }, (_, i) => ({
  number: String(i + 1),
  type: i < 36 ? 'red' : 'grey'
}));

export const ReservationStatus: FC = () => {
  return (
    <main className={styles.container}>
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/8746e8b4f306405ef2fe1ae0cea531f94bb78c78ef47147a23f5a296136d09d6?placeholderIfAbsent=true&apiKey=c37b27135006443aab5f3858d3155b30"
        alt="Company Logo"
        className={styles.logo}
      />
      
      <h1 className={styles.title}>예약현황</h1>
      
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/0f61db433c249f130fcda82fa5f572c2258531aadcaccbd457170e401bd98d00?placeholderIfAbsent=true&apiKey=c37b27135006443aab5f3858d3155b30"
        alt="Bus Layout"
        className={styles.busLayout}
      />

      <section className={styles.timelineContainer}>
        {/* Timeline content */}
      </section>

      <h2 className={styles.seatMapTitle}>예약 좌석 위치</h2>
      
      <section className={styles.seatMap}>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/40f050748d0c8768587c7fcfa441ce198a87ce8f98c2b00f3be4d7b6c10721cf?placeholderIfAbsent=true&apiKey=c37b27135006443aab5f3858d3155b30"
          alt="Steering Wheel"
          className={styles.steeringWheel}
        />
        
        <div className={styles.seatGrid}>
          {seatData.map(seat => (
            <Seat
              key={seat.number}
              number={seat.number}
              type={seat.type}
            />
          ))}
        </div>
      </section>

      <hr className={styles.separator} />

      <Ticket
        routeName="양산-북정"
        departureTime="하교: 18:10"
        seatNumber="22"
      />
      
      <Ticket
        routeName="장유"
        departureTime="2024.10.23"
        seatNumber="42"
      />
    </main>
  );
};

export default ReservationStatus;