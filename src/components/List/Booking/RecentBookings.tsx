import React from "react";
import styles from "./RecentBookings.module.css";
import { BookingCard } from "./BookingCard.tsx";
import { BookingData } from "./types.ts";

export const RecentBookings: React.FC = () => {
  const bookings: BookingData[] = [
    {
      route: "양산-북정",
      date: "2024.10.22",
      time: "18:10",
      seatNumber: "22",
      status: "BOARDED",
    },
    {
      route: "양산-북정",
      date: "2024.10.22",
      time: "18:10",
      seatNumber: "22",
      status: "NOT_BOARDED",
    },
    {
      route: "양산-북정",
      date: "2024.10.22",
      time: "18:10",
      seatNumber: "22",
      status: "BOARDED",
    },
    {
      route: "양산-북정",
      date: "2024.10.22",
      time: "18:10",
      seatNumber: "22",
      status: "CANCELLED",
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <a href="/Mypage" className={styles.headerIcon}>
          <img src="img/icon/arrow-left.png" alt="뒤로가기" />
        </a>
        <div className={styles.headerTitle}>예약 내역</div>
      </div>
      <BookingCard booking={bookings[0]} />
      {bookings.slice(1).map((booking, index) => (
        <BookingCard key={index} booking={booking} />
      ))}
    </div>
  );
};

export default RecentBookings;
