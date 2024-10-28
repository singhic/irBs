import React from 'react';
import styles from './Onboarding1.module.css';

const OnboardingInfo: React.FC = () => {
  const handleNext = () => {
    // Handle next button click
  };

  return (
    <main className={styles.container}>
      <img 
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/6461bb6e39fe3abfff37f1da48ec1c5f8741bc365f466629151fd3e7115d4635?placeholderIfAbsent=true" 
        alt="Onboarding illustration" 
        className={styles.heroImage} 
      />
      <section className={styles.contentSection}>
        <h1 className={styles.title}>
          간편한 내 정보 수정
        </h1>
        <p className={styles.description}>
          카드번호 변경, 비밀번호 변경에 불편하신가요?
          <br />
          새로워진 예약 시스템을 이용해보세요.
        </p>
        <a href='/Penalty'>
        <button 
          className={styles.nextButton}
          onClick={handleNext}
          aria-label="다음 단계로 이동"
        >
          다음
        </button>
        </a>
      </section>
    </main>
  );
};

export default OnboardingInfo;