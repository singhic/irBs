import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import styles from "./MainPage.module.css"; // 스타일 파일

const RecentBooking = ({ loading, reservation }) => {
  return (
    <Swiper
      direction="vertical" // 세로 스와이프 설정
      slidesPerView={1} // 한 번에 한 슬라이드만 표시
      spaceBetween={0} // 간격 없음
      className={styles.recentBookingSwiper} // Swiper 컨테이너 스타일 클래스
    >
      {/* 로딩 중 화면 */}
      <SwiperSlide>
        <section className={styles.recentBooking}>
          <img
            src="/img/icon/arrow-top.png"
            alt="Arrow Icon"
            className={styles.recentBookingIcon}
          />
          <div className={styles.recentBookingContent}>
            <h2 className={styles.recentBookingTitle}>
              열심히 받아오고 있는데
              <br />
              응답이 평소와 같지 않네요.
            </h2>
          </div>
        </section>
      </SwiperSlide>

      {/* 예약이 있는 경우 */}
      {reservation && (
        <SwiperSlide>
          <section className={styles.recentBooking}>
            <img
              src="/img/icon/arrow-top.png"
              alt="Arrow Icon"
              className={styles.recentBookingIcon}
            />
            <div className={styles.recentBookingContent}>
              <h2 className={styles.recentBookingTitle}>
                최근 예약 현황이 존재합니다
              </h2>
              <p className={styles.recentBookingDetails}>{reservation}</p>
            </div>
          </section>
        </SwiperSlide>
      )}

      {/* 예약이 없는 경우 */}
      {!reservation && !loading && (
        <SwiperSlide>
          <section className={styles.recentBooking}>
            <img
              src="/img/icon/arrow-top.png"
              alt="Arrow Icon"
              className={styles.recentBookingIcon}
            />
            <div className={styles.recentBookingContent}>
              <h2 className={styles.recentBookingTitle}>
                최근 예약이 존재하지 않습니다
              </h2>
            </div>
          </section>
        </SwiperSlide>
      )}
    </Swiper>
  );
};

export default RecentBooking;
