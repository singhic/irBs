import React from "react";
import styles from "./Onboarding1.module.css";

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
        <h1 className={styles.title}>앱으로 변환이 가능해요</h1>
        <p className={styles.description}>
          웹사이트로 사용하는게 불편하셨죠?
          <br />
          위 3개 이미지 중 한가지를 누르고
          <br />홈 화면에 추가만 누르면 앱으로 이용이 가능합니다.
        </p>
        <a href="/Onboarding2">
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
