import React from 'react';
import styles from './PenaltySystem.module.css';

const PenaltySystem: React.FC = () => {
  return (
    <main className={styles.container}>
      <img 
        src="/img/icon/introdoctionimage4.png" 
        alt="Penalty system illustration" 
        className={styles.banner} 
        loading="lazy" 
      />
      
      <section className={styles.content}>
        <h1 className={styles.title}>
          확실해진 패널티 시스템
        </h1>
        
        <p className={styles.description}>
          예약 후 탑승을 하지 않는 학우에 불편을 느꼈나요?<br />
          미탑승 시 패널티 시스템으로 불이익을 받을 수 있습니다.<br />
        </p>

        <a href='./Onboarding2'>
        <button 
          className={styles.nextButton}
          onClick={() => {}}
          aria-label="다음 단계로 이동"
        >
          다음
        </button>
        </a>
      </section>
    </main>
  );
};

export default PenaltySystem;