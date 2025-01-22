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
        <a href="/MainPage" className={styles.icon}>
          <img loading="lazy" src="img/icon/arrow-left.png" alt="뒤로가기" />
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
