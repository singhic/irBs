import React from 'react';
import styles from './Signup.module.css';

const Signup: React.FC = () => {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>회원가입</h1>
      
      <form>
        <div className={styles.inputGroup}>
          <div className={styles.inputWrapper}>
            <label htmlFor="studentId" className={styles['visually-hidden']}>학번/사번</label>
            <input
              type="text"
              id="studentId"
              className={styles.formInput}
              placeholder="학번/사번"
            />
            
            <label htmlFor="birthdate" className={styles['visually-hidden']}>생년월일</label>
            <input
              type="text"
              id="birthdate"
              className={styles.formInput}
              placeholder="생년월일(주민번호 앞자리)"
            />
          </div>
          <button type="button" className={styles.verifyButton}>
          <img 
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/384718c8a2226903135deccb78910cca6a57fbc6d7246521c2eb0f9246ded2c9?placeholderIfAbsent=true"
            alt=""
            className={styles.verifyImage}
          />
          </button>
        </div>

        <label htmlFor="phone" className={styles['visually-hidden']}>핸드폰번호</label>
        <input
          type="tel"
          id="phone"
          className={styles.formInput_phonenum}
          placeholder="핸드폰번호"
        />

        <div className={styles.verificationGroup}>
          <label htmlFor="verificationCode" className={styles['visually-hidden']}>인증번호</label>
          <input
            type="text"
            id="verificationCode"
            className={styles.formInput}
            placeholder="인증번호"
          />
          <img 
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/1ebcadbfbb3dbee30aafba733f3375e883d0cf2eb1ef3e19b2409957e0a6e375?placeholderIfAbsent=true"
            alt=""
            className={styles.verifyButton}
          />
        </div>

        <label htmlFor="password" className={styles['visually-hidden']}>비밀번호</label>
        <input
          type="password"
          id="password"
          className={styles.formInput}
          placeholder="비밀번호를 입력하세요"
        />

        <label htmlFor="confirmPassword" className={styles['visually-hidden']}>비밀번호 확인</label>
        <input
          type="password"
          id="confirmPassword"
          className={styles.formInput}
          placeholder="비밀번호를 재입력하세요"
        />

        <label htmlFor="cardNumber" className={styles['visually-hidden']}>카드번호</label>
        <input
          type="text"
          id="cardNumber"
          className={styles.cardInput}
          placeholder="카드번호를 입력하세요 <br> 이즐(구 케시비) 또는 신한카드 후불교통카드 16자리"
        />
        <br/>
        <button type="submit" className={styles.submitButton}>
          <a href='/Login'>
          <span>회원가입 완료</span>
          </a>
        </button>
      </form>

      <div className={styles.loginPrompt}>
      <a href='/Login'>
        <p className={styles.loginText}>아이디가 있나요?</p>
      </a>
      </div>
    </main>
  );
};

export default Signup;