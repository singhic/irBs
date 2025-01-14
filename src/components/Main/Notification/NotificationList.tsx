import React from "react";
import styles from "./NotificationList.module.css";
import { NotificationCard } from "./NotificationCard.tsx";
import { NotificationItem } from "./types.ts";

export const NotificationList: React.FC = () => {
  const notifications: NotificationItem[] = Array(12)
    .fill({
      title: "2024 동계방학 버스 시간표",
      id: 0,
    })
    .fill({
      title: "2024 2학기 버스 시간표",
      id: 1,
    })
    .map((item, index) => ({
      ...item,
      id: index,
    }));

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <a href="/MainPage">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/181bc38d531314cbdd6f1b038d9e41ee3e50485be6c75a3505fc1e3114998472?placeholderIfAbsent=true&apiKey=c37b27135006443aab5f3858d3155b30"
            className={styles.icon}
            alt=""
          />
        </a>
        <div className={styles.title}>전체 공지사항</div>
      </div>
      {notifications.map((notification) => (
        <NotificationCard key={notification.id} notification={notification} />
      ))}
    </div>
  );
};

export default NotificationList;
