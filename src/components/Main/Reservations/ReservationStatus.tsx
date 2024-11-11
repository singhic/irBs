import { FC } from 'react';
import styles from './ReservationStatus.module.css';
import { Ticket } from './Ticket.tsx';
import React from 'react';
import { SeatView } from './SeatMapView.tsx'; 



export const ReservationStatus: FC = () => {
  return (
    <main className={styles.container}>
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/8746e8b4f306405ef2fe1ae0cea531f94bb78c78ef47147a23f5a296136d09d6?placeholderIfAbsent=true"
        alt="Company Logo"
        className={styles.logo}
      />
      
      <h1 className={styles.title}>예약현황</h1>
      
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/0f61db433c249f130fcda82fa5f572c2258531aadcaccbd457170e401bd98d00?placeholderIfAbsent=true"
        alt="Bus Layout"
        className={styles.busLayout}
      />

      <section className={styles.timelineContainer}>
        {/* Timeline content */}
      </section>

      <h2 className={styles.seatMapTitle}>예약 좌석 위치</h2>
      <SeatView/>
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