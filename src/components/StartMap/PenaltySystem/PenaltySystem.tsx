import React from 'react';
import styles from './PenaltySystem.module.css';

const PenaltySystem: React.FC = () => {
  return (
    <main className={styles.container}>
      <img 
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/0b74ddd0b53d5d2e05bc2395c9d4f6172cf57b505231f2fbbda674440c3752f8?placeholderIfAbsent=true&apiKey=c37b27135006443aab5f3858d3155b30" 
        alt="Penalty system illustration" 
        className={styles.banner} 
        loading="lazy" 
      />
      
      <section className={styles.content}>
        <h1 className={styles.title}>
          확실해진 패널티 시스템
        </h1>
        
        <p className={styles.description}>
          예약 후 탑승을 하지 않았나요?<br />
          패널티 시스템으로 불이익을 받을 수 있습니다.<br />
          자세한 기준은 자주 묻는 질문탭에서 확인 가능합니다.
        </p>

        <button 
          className={styles.nextButton}
          onClick={() => {}}
          aria-label="다음 단계로 이동"
        >
          다음
        </button>
      </section>
    </main>
  );
};

export default PenaltySystem;