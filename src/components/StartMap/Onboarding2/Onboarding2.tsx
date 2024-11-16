import React from 'react';
import styles from './Onboarding2.module.css';

const OnboardingPage: React.FC = () => {
  return (
    <main className={styles.onboardingWrapper}>
      <img 
        loading="lazy" 
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/5c5bac3f88aab697059b3aadf82d2b250f9a6772de9c41d201614c05d07bd294?placeholderIfAbsent=true" 
        className={styles.heroImage} 
        alt="Bus reservation system illustration"
      />
      <section className={styles.contentSection}>
        <h1 className={styles.title}>
          더욱 간편해진 통합 버스 예약 시스템
        </h1>
        <p className={styles.description}>
          버스 예약부터 탑승까지!<br />
          번거로움없는 경험 해보실 준비 되셨나요?<br />
          기존 사용자는 회원가입 없이 바로 시작 가능합니다.
        </p>
        <a href='/Login'>
        <button 
          className={styles.startButton}
        >
          시작하기
        </button>
        </a>
      </section>
    </main>
  );
};

export default OnboardingPage;