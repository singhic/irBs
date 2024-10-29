import React from "react";
import styles from './MainPage.module.css';
interface RouteCardProps {
    destination: string;
    time: string;
    seats: string;
  }
  
  export const RouteCard: React.FC<RouteCardProps> = ({ destination, time, seats }) => {
    return (
      <article className={styles.routeCard}>
        <div className={styles.routeInfo}>
          <h3 className={styles.routeDestination}>{destination}</h3>
        </div>
        <div className={styles.routeDestination2}>
        <time className={styles.routeTime}>{time}</time>
        <p className={styles.routeSeats}>{seats}</p>
        </div>
      </article>
    );
  };