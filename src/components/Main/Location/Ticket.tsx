import { FC } from "react";
import styles from "./Location.module.css";
import React from "react";

interface TicketProps {
  routeName: string;
  departureTime: string;
  busNumber: string;
  onClick: () => void;
}

export const Ticket: FC<TicketProps> = ({
  routeName,
  departureTime,
  busNumber,
  onClick,
}) => {
  return (
    <section className={styles.ticketContainer}>
      {" "}
      {/* 클릭 시 onClick 함수 호출 */}
      <section className={styles.ticketB} onClick={onClick}>
        <div className={styles.ticketInfo}>
          <h3 className={styles.routeName}>{routeName}</h3>
          <p className={styles.departureTime}>{departureTime}</p>
        </div>
        <p className={styles.seatNumber}>
          <p className={styles.seatLabel}>차량번호</p>
          <p className={styles.seatLabel}>{busNumber}</p>
        </p>
      </section>
    </section>
  );
};
