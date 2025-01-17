import { FC } from "react";
import styles from "./Location.module.css";
import React from "react";

interface TicketProps {
  routeName: string;
  departuredate: string;
  departureTime: string;
  seatNumber: string;
  onClick: () => void;
  onClick2: () => void;
}

export const Ticket: FC<TicketProps> = ({
  routeName,
  departuredate,
  departureTime,
  seatNumber,
  onClick,
  onClick2,
}) => {
  return (
    <section className={styles.ticketContainer}>
      {" "}
      {/* 클릭 시 onClick 함수 호출 */}
      <section className={styles.ticketB} onClick={onClick}>
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
      </section>
      <div className={styles.ticketDivider} />
      <h3 className={styles.cancle} onClick={onClick2}>
        예약 취소
      </h3>
    </section>
  );
};
