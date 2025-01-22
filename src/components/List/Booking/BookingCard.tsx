import React from "react";
import styles from "./BookingCard.module.css";
import { BookingData } from "./types.ts";

interface BookingCardProps {
  booking: BookingData;
}

export const BookingCard: React.FC<BookingCardProps> = ({ booking }) => {
  const getStatusClass = (status: BookingData["status"]) => {
    return status === "NOT_BOARDED" ? styles.notBoarded : styles.status;
  };

  const getStatusText = (status: BookingData["status"]) => {
    switch (status) {
      case "BOARDED":
        return "탑승";
      case "NOT_BOARDED":
        return "미탑승";
      case "CANCELLED":
        return "취소";
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.bookingInfo}>
        <div className={styles.route}>{booking.route}</div>
        <div className={styles.date}>{booking.date}</div>
        <div className={styles.time}>{booking.time}</div>
      </div>
      <div className={styles.seatDisplay}>
        <span className={styles.seatNumber}>{booking.seatNumber}번</span>
        <br />
        <span className={styles.seatLabel}>좌석</span>
      </div>
      <div className={styles.divider} />
      <div className={getStatusClass(booking.status)}>
        {getStatusText(booking.status)}
      </div>
    </div>
  );
};
