import React from "react";
import styles from "./Onboarding3.module.css";

const OnboardingPage: React.FC = () => {
  return (
    <main className={styles.onboardingWrapper}>
      <img
        loading="lazy"
        src="img/icon/introdoctionimage4.png"
        className={styles.heroImage}
        alt="Bus reservation system illustration"
      />
      <section className={styles.contentSection}>
        <h1 className={styles.title}>간단한 사이트 이용 방법: 탑승</h1>
        <p className={styles.description}>
          메인페이지에서 슬라이드를 통해 예약 현황으로
          <br />
          편리하게 이동 가능하고, 탑승시간 40분 전/후
          <br />
          버스위치가 실시간 업데이트 됩니다.
        </p>
        <a href="/Login">
          <button className={styles.nextButton}>시작하기</button>
        </a>
      </section>
    </main>
  );
};

export default OnboardingPage;
