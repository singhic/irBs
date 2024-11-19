import { FC } from "react";
import styles from "./ReservationStatus.module.css";
import React from "react";

interface TicketProps {
  routeName: string;
  departuredate: string;
  departureTime: string;
  seatNumber: string;
  onClick: () => void; // 클릭 시 호출될 함수
}

export const Ticket: FC<TicketProps> = ({
  routeName,
  departuredate,
  departureTime,
  seatNumber,
  onClick, // onClick prop 받아오기
}) => {
  return (
    <section className={styles.ticketContainer} onClick={onClick}>
      {" "}
      {/* 클릭 시 onClick 함수 호출 */}
      <div className={styles.ticketInfo}>
        <h3 className={styles.routeName}>{routeName}</h3>
        <p className={styles.departureTime}>{departuredate}</p>
        <p className={styles.departureTime}>{departureTime}</p>
      </div>
      <p className={styles.seatNumber}>
        {seatNumber}번
        <br />
        <span className={styles.seatLabel}>좌석</span>
      </p>
      <div className={styles.ticketDivider} />
      <h3 className={styles.cancle}>예약 취소</h3>
    </section>
  );
};
