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
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/181bc38d531314cbdd6f1b038d9e41ee3e50485be6c75a3505fc1e3114998472?placeholderIfAbsent=true&apiKey=c37b27135006443aab5f3858d3155b30"
            alt="Recent bookings icon"
          />
        </a>
        <div className={styles.headerTitle}>예약 내역</div>
      </div>
      <BookingCard booking={bookings[0]} />
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/403514bb4f725abf9b69e85f2938f4a2adbc0ab854260b23fff0b27ca00e9c8f?placeholderIfAbsent=true&apiKey=c37b27135006443aab5f3858d3155b30"
        className={styles.qrCode}
        alt="Booking QR code"
      />
      {bookings.slice(1).map((booking, index) => (
        <BookingCard key={index} booking={booking} />
      ))}
    </div>
  );
};

export default RecentBookings;
