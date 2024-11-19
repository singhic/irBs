import { FC } from 'react';
import styles from './ReservationStatus.module.css';
import { Ticket } from './Ticket.tsx';
import { SeatView } from './SeatMapView.tsx'; 
import React, { useEffect, useState } from 'react';

// 스와이프 모듈
import { useSwipeable } from "react-swipeable";
// 페이지 이동 모듈 
import { useNavigate } from "react-router-dom";

export const ReservationStatus: FC = () => {
  const [isSwipedDown, setIsSwipedDown] = useState(false);
  const navigate = useNavigate();

  const handlers = useSwipeable({
    onSwipedDown: () => {
      setIsSwipedDown(true);
      setTimeout(() => {
        navigate("/MainPage");
      }, 300); // 애니메이션 지속 시간과 동일하게 설정
    },
    preventScrollOnSwipe: true,
    trackMouse: true
  });

  useEffect(() => {
    if (isSwipedDown) {
      window.scrollTo(0, 0); // 페이지 맨 위로 스크롤
    }
  }, [isSwipedDown]);

  return (
    <main className={styles.container}>
      <div className={`${styles.movePage} ${isSwipedDown ? styles.swipedDown : ''}`} {...handlers}>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/8746e8b4f306405ef2fe1ae0cea531f94bb78c78ef47147a23f5a296136d09d6?placeholderIfAbsent=true"
          alt="Company Logo"
          className={styles.logo}
        />
        <h1 className={styles.title}>예약현황</h1>
      </div>
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/0f61db433c249f130fcda82fa5f572c2258531aadcaccbd457170e401bd98d00?placeholderIfAbsent=true"
        alt="Bus Layout"
        className={styles.busLayout}
      />

      <section className={styles.timelineContainer}>
        {/* Timeline content */}
      </section>


      <Ticket
        routeName="양산-북정"
        departureTime="하교: 18:10"
        seatNumber="22"
      />
      
      <Ticket
        routeName="장유"
        departureTime="2024.10.23"
        seatNumber="42"
      />
    </main>
  );
};

export default ReservationStatus;