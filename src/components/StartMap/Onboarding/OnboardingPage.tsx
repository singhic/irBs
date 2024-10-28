import React from 'react';
import styles from './OnboardingPage.module.css';

const OnboardingPage: React.FC = () => {
  return (
    <main className={styles.onboardingWrapper}>
      <img 
        loading="lazy" 
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/347975659241c29eb2e0162868a88629b69156724b24ac436247000b1d1315d6?placeholderIfAbsent=true" 
        className={styles.heroImage} 
        alt="버스 예약 시스템 소개 이미지"
      />
      <section className={styles.contentSection}>
        <h1 className={styles.title}>
          더욱 간편해진 통합 버스 예약 시스템
        </h1>
        <p className={styles.description}>
          예약, 탑승까지 원스톱으로!<br />
          버스 예약 후 탑승권 확인에 번거로움없이<br />
          빠르고 편리하게 탑승하세요.
        </p>
        <a href='/Onboarding1'>
        <button 
          className={styles.nextButton}
          onClick={() => {/* handle navigation */}}
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