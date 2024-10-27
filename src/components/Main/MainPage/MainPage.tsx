import React from 'react';
import { RouteCard } from './RouteCard.tsx';
import styles from './MainPage.module.css';

const routeData = [
  { destination: '동래', time: '16:20', seats: '(44/33석)' },
  { destination: '울산', time: '18:10', seats: '(44/41석)' }
];

export const MainPage: React.FC = () => {
  return (
    <main className={styles.page}>
      <header className={styles.notificationBar}>
        <div className={styles.notificationContent}>
          <img 
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/3ef9aedfc9b62a5ef5418720705177a18d6ad3a44771951bd8bc03bb620b248e?placeholderIfAbsent=true&apiKey=c37b27135006443aab5f3858d3155b30" 
            alt="Warning icon" 
            className={styles.notificationIcon} 
          />
          <p className={styles.notificationText}>
            경고: 패널티 1회(2024.10.15 장유 08:20)
          </p>
        </div>
        <img 
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/000f5f913f98483ee512f05f509b6c27a28917768973c443b3543c86a04612d4?placeholderIfAbsent=true&apiKey=c37b27135006443aab5f3858d3155b30" 
          alt="Settings" 
          className={styles.settingsIcon} 
        />
      </header>

      <section className={styles.weatherCard}>
        <div className={styles.weatherInfo}>
          <p className={styles.weatherStatus}>
            금일 캠퍼스 날씨는 맑음입니다.
          </p>
          <h1 className={styles.greeting}>
            안녕하세요. 사용자님
          </h1>
        </div>
        <img 
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/e4e208546ef4b7480e5ab6a347461c87993eeabd950ffebecb7912371e49e91a?placeholderIfAbsent=true&apiKey=c37b27135006443aab5f3858d3155b30" 
          alt="Weather" 
          className={styles.weatherIcon} 
        />
      </section>

      <button className={styles.bookingButton}>
        <a href='./BusSchedule'>
        <span className={styles.bookingText}>예약하기</span>
        <img 
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/406181a727603b6744c65a734692215707f5036ec231fe2445b98845343e8c94?placeholderIfAbsent=true&apiKey=c37b27135006443aab5f3858d3155b30" 
          alt="" 
          className={styles.bookingIcon} 
        />
        </a>
      </button>

      <section className={styles.quickBooking}>
        <div className={styles.quickBookingContent}>
          <h2 className={styles.quickBookingTitle}>빠른 예약하기</h2>
          {routeData.map((route, index) => (
            <RouteCard
              key={index}
              destination={route.destination}
              time={route.time}
              seats={route.seats}
            />
          ))}
        </div>
      </section>

      <section className={styles.noticeSection}>
        <h2 className={styles.noticeTitle}>공지사항</h2>
        <hr className={styles.noticeDivider} />
        <div className={styles.noticeFooter}>
          <span>전체공지 보기</span>
          <img 
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/39d3da592bbe83d18c101160fb790b68b8b3c44297531c445b233d2f5354dec7?placeholderIfAbsent=true&apiKey=c37b27135006443aab5f3858d3155b30" 
            alt="" 
            className={styles.noticeIcon} 
          />
        </div>
      </section>

      <button className={styles.supportText}>
        문제가 있으신가요?
      </button>

      <section className={styles.recentBooking}>
        <img 
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/fe829013-c35b-4444-ab77-aaf9850d8c8d?placeholderIfAbsent=true&apiKey=c37b27135006443aab5f3858d3155b30" 
          alt="" 
          className={styles.recentBookingIcon} 
        />
        <div className={styles.recentBookingContent}>
          <h2 className={styles.recentBookingTitle}>
            최근 예약 현황이 존재합니다
          </h2>
          <p className={styles.recentBookingDetails}>
            2024.01.01 07:50 인제대행
          </p>
        </div>
      </section>
    </main>
  );
};

export default MainPage;