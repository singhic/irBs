import { FC } from "react";
import styles from "./Location.module.css";
import React from "react";

interface TicketProps {
  routeName: string;
  departureTime: string;
  busNumber: string;
  onClick: () => void;
  isSelected?: boolean;
}

export const Ticket: FC<TicketProps> = ({
                                          routeName,
                                          departureTime,
                                          busNumber,
                                          onClick,
                                          isSelected = false,
                                        }) => {
  return (
      <section
          className={`${styles.ticketContainer} ${isSelected ? styles.selectedTicket : ''}`}
      >
        <section
            className={styles.ticketB}
            onClick={onClick}
        >
          <div className={styles.ticketInfo}>
            <h3 className={styles.routeName}>차량번호 : {routeName}</h3>
            <p className={styles.departureTime}>{departureTime}</p>
          </div>
          <p className={styles.seatNumber}>
            <p className={styles.seatLabel}></p>
            <p className={styles.seatLabel}>{busNumber}</p>
          </p>
        </section>
      </section>
  );
};