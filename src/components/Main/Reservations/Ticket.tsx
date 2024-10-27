import { FC } from 'react';
import styles from './ReservationStatus.module.css';
import React from 'react';

interface TicketProps {
  routeName: string;
  departureTime: string;
  seatNumber: string;
}

export const Ticket: FC<TicketProps> = ({
  routeName,
  departureTime,
  seatNumber
}) => {
  return (
    <section className={styles.ticketContainer}>
      <div className={styles.ticketInfo}>
        <h3 className={styles.routeName}>{routeName}</h3>
        <p className={styles.departureTime}>{departureTime}</p>
      </div>
      <p className={styles.seatNumber}>
        {seatNumber}번
        <br />
        <span className={styles.seatLabel}>좌석</span>
      </p>
      <div className={styles.ticketDivider} />
      <img 
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/81cf9b6e0172de95c49cfa812c93f09b349e6320d14d7afbde154fa130b072d1?placeholderIfAbsent=true&apiKey=c37b27135006443aab5f3858d3155b30"
        alt="QR Code"
        className={styles.qrCode}
      />
    </section>
  );
};