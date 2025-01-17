import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination,FreeMode } from "swiper/modules"; // Swiper 모듈
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";


import {RouteCard} from "./RouteCard.tsx"; // 기존 컴포넌트
import styles from "./MainPage.module.css"; // 스타일 파일

const QuickBooking = ({ routeData }) => {
  return (
    <section className={styles.quickBooking}>
      <h2 className={styles.quickBookingTitle}>빠른 예약하기</h2>
      <Swiper
        modules={[Navigation, Pagination, FreeMode]} // Swiper 모듈 추가
        spaceBetween={2} // 슬라이드 간 간격
        slidesPerView= {4} // 한 번에 보여줄 슬라이드 수
        // navigation // 화살표 네비게이션 활성화
        // pagination={{ clickable: true }} // 페이지네이션 활성화
        breakpoints={{
          // 반응형 설정
          768: { slidesPerView: 3.2 }, // 화면 너비 768px 이상에서 슬라이드 3개 표시
          480: { slidesPerView: 2.6 }, // 화면 너비 480px 이상에서 슬라이드 2개 표시
          0: { slidesPerView: 2.2 }, // 화면 너비 0px 이상에서 슬라이드 1개 표시
        }}
        freeMode={true}
        className={styles.quickBookingSwiper}
      >
        {routeData.map((route, index) => (
          <SwiperSlide key={index}>
            <RouteCard
              destination={route.destination}
              time={route.time}
              seats={route.seats}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default QuickBooking;
