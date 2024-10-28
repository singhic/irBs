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
          예약, 탑승까지 원스톱으로!<br />
          버스 예약 후 탑승권 확인에 번거로움없이<br />
          빠르고 편리하게 탑승하세요.
        </p>
        <a href='/Login'>
        <button 
          className={styles.startButton}
          onClick={() => {/* handle start action */}}
        >
          시작하기
        </button>
        </a>
      </section>
    </main>
  );
};

export default OnboardingPage;