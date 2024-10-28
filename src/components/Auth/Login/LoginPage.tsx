import React, { useState } from 'react';
import styles from './LoginPage.module.css';

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className={styles.loginContainer}>
      <img 
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/ae3ee0e389dff35e40300bc2397c9fe81fb76d12614c12cef8a5b883e7581063?placeholderIfAbsent=true" 
        alt="인제대학교 로고" 
        className={styles.logo}
      />
      
      <h1 className={styles.title}>
        인제대학교 <br /> 통합 버스 예약 시스템
      </h1>

      <form className={styles.loginForm}>
        <label htmlFor="userId" className={styles['visually-hidden']}>
          아이디 (학번/사번)
        </label>
        <input
          type="text"
          id="userId"
          className={styles.inputField}
          placeholder="아이디 (학번/사번)"
        />

        <div className={styles.passwordContainer}>
          <label htmlFor="password" className={styles['visually-hidden']}>
            비밀번호
          </label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            placeholder="비밀번호"
            className={styles.inputField}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
          >
            <img 
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/32d79ff2a100ed4ac1e5d06ca835cb8f8297e2a4970f5859f1a109b670fd299c?placeholderIfAbsent=true" 
              alt="" 
              className={styles.passwordIcon}
            />
          </button>
        </div>

        <button type="submit" className={styles.loginButton}>
          <img 
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/27ab334dd17dc9de946c30c832cb0a06db7c8dbea05cb2dacbcfc926384075b5?placeholderIfAbsent=true" 
            alt="" 
            className={styles.loginButtonBg} 
          />
          <span className={styles.loginButtonText}>로그인</span>
        </button>
      </form>

      <nav className={styles.helpLinks}>
        <a href="/password-reset">비밀번호 찾기</a>
        <div className={styles.divider} aria-hidden="true" />
        <a href="/signup">회원가입</a>
      </nav>
      
      <a href='/Onboarding'>
      <p className={styles.newUserText}>처음이신가요?</p>
      </a>
    </main>
  );
};

export default LoginPage;