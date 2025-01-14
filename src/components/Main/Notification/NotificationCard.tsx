import React from "react";
import styles from "./NotificationCard.module.css";
import { NotificationItem } from "./types.ts";

interface NotificationCardProps {
  notification: NotificationItem;
}

export const NotificationCard: React.FC<NotificationCardProps> = ({
  notification,
}) => {
  return (
    <div className={styles.card} tabIndex={0} role="button">
      <div className={styles.title}>{notification.title}</div>
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/68e20b30f9dfab2979c8908c04d9f45e626ab90b5b9cfa6e8f9cf2966bfa232e?placeholderIfAbsent=true&apiKey=c37b27135006443aab5f3858d3155b30"
        className={styles.arrow}
        alt=""
      />
    </div>
  );
};
