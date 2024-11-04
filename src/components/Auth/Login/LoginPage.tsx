import React, { useState } from 'react';
import styles from './LoginPage.module.css';
import axios from 'axios';
import Cookies from 'js-cookie';

const LoginPage: React.FC = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    
    // x-www-form-urlencoded에 맞게 데이터를 변환
    const loginData = new URLSearchParams();
    loginData.append('id', userId);
    loginData.append('password', password);
    loginData.append('s_cookie', '');

    try {
      const response = await axios.post('/login_proc.php', loginData, {
        headers: {
          "Content-Type": `application/x-www-form-urlencoded`,
          "Accept": "application/json",
          // 추가  
          "Access-Control-Allow-Origin": `/login_proc.php`,
          'Access-Control-Allow-Credentials':"true",
      }
      });
      if (response.status === 200) {
        console.log(response.data); // 서버에서 응답으로 오는 데이터를 확인
        if (response.data.status === 'success') {
          alert(response.data.message);
          Cookies.set("id", userId, {secure: true, sameSite: "Lax"});
          window.location.href = '/MainPage';
        } else {
          console.error("Login failed:", response.status); // 에러 상세 정보 출력
          alert(response.data.message);
        }
      }
    } catch (error) {
      console.error("Network or server error:", error); // 네트워크 또는 서버 오류를 출력
      alert('네트워크 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

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
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className={styles.inputField}
          placeholder="      아이디 (학번/사번)"
        />


          <label htmlFor="password" className={styles['visually-hidden']}>
            비밀번호
          </label>
          <div className={styles.inputWrapper}>
            <input
              type="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="      비밀번호"
              className={styles.inputField}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
              className={styles.iconButton}
            >
            </button>
          </div>


        <button className={styles.loginButton} onClick={handleLogin}>
          
          <img 
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/27ab334dd17dc9de946c30c832cb0a06db7c8dbea05cb2dacbcfc926384075b5?placeholderIfAbsent=true" 
            alt="" 
            className={styles.loginButtonBg} 
          />
          <span className={styles.loginButtonText}>로그인</span>
        </button>
      </form>

      <nav className={styles.helpLinks}>
        <a href="/passwordreset">비밀번호 찾기</a>
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