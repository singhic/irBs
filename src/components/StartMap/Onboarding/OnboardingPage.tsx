import React from "react";
import styles from "./OnboardingPage.module.css";

const OnboardingPage: React.FC = () => {
  return (
    <main className={styles.onboardingWrapper}>
      <img
        loading="lazy"
        src="/img/icon/introdoctionimage.png"
        className={styles.heroImage}
        alt="버스 예약 시스템 소개 이미지"
      />
      <section className={styles.contentSection}>
        <h1 className={styles.title}>더욱 간편해진 통합 버스 예약 시스템</h1>
        <p className={styles.description}>
          여러분의 통학을 책임지는 통학 버스 예약 시스템입니다.
          <br />
          앱으로 변환 및 간단한 사이트 이용
          <br />
          방법에 대해 설명드리겠습니다
        </p>
        <a href="/Onboarding1">
          <button
            className={styles.nextButton}
            onClick={() => {
              /* handle navigation */
            }}
            aria-label="다음 페이지로 이동"
          >
            다음
          </button>
        </a>
      </section>
    </main>
  );
};

export default OnboardingPage;
