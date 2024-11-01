import React, { useState } from 'react';
import styles from './Signup.module.css';
import axios from 'axios';

const Signup: React.FC = () => {
  const [idx, setIdx] = useState('');
  const [birth, setBirth] = useState('');
  const [phone, setPhone] = useState('');
  const [certCode, setcertCode] = useState('');
  const [card, setCard] = useState('');

  const handlefirstcheck = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    
    // x-www-form-urlencoded에 맞게 데이터를 변환
    const loginData = new URLSearchParams();
    loginData.append('idx', idx);
    loginData.append('birth', birth);

    try {
      const response = await axios.post('/passport/select_proc.php', loginData, {
        headers: {
          "Content-Type": `application/x-www-form-urlencoded`,
          "Accept": "application/json",
          "Access-Control-Allow-Origin": `/passport/select_proc.php`,
          'Access-Control-Allow-Credentials': "true",
        }
      });
      if (response.status === 200) {
        console.log(response.data); // 서버에서 응답으로 오는 데이터를 확인
        if (response.data.status === 'success') {
          alert('인증이 완료되었습니다.');
        }
      } else {
        console.error("School Cert failed:", response.status); // 에러 상세 정보 출력
        alert('정보를 다시 확인해주세요.');
      }
    } catch (error) {
      console.error("Network or server error:", error); // 네트워크 또는 서버 오류를 출력
      alert('네트워크 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  const handlephonecert = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    
    // x-www-form-urlencoded에 맞게 데이터를 변환
    const loginData = new URLSearchParams();
    loginData.append('idx', idx);
    loginData.append('phone', phone);

    try {
      const response = await axios.post('/passport/cert_insert_proc.php', loginData, {
        headers: {
          "Content-Type": `application/x-www-form-urlencoded`,
          "Accept": "application/json",
          "Access-Control-Allow-Origin": `/passport/cert_insert_proc.php`,
          'Access-Control-Allow-Credentials': "true",
        }
      });
      if (response.status === 200) {
        console.log(response.data); // 서버에서 응답으로 오는 데이터를 확인
        if (response.data.status === 'success') {
          alert('인증번호가 전송되었습니다. 문자를 확인해주세요.');
        }
      } else {
        console.error("Phone Cert failed:", response.status); // 에러 상세 정보 출력
        alert('정보를 다시 확인해주세요');
      }
    } catch (error) {
      console.error("Network or server error:", error); // 네트워크 또는 서버 오류를 출력
      alert('네트워크 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  const handleSignup = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    
    // x-www-form-urlencoded에 맞게 데이터를 변환
    const loginData = new URLSearchParams();
    loginData.append('idx', idx);
    loginData.append('phone', phone);
    loginData.append('birth', birth);
    loginData.append('card', card); // Append card as a string
    loginData.append('s_cookie', '');

    try {
      const response = await axios.post('/login_proc.php', loginData, {
        headers: {
          "Content-Type": `application/x-www-form-urlencoded`,
          "Accept": "application/json",
          "Access-Control-Allow-Origin": `/login_proc.php`,
          'Access-Control-Allow-Credentials': "true",
        }
      });
      if (response.status === 200) {
        console.log(response.data); // 서버에서 응답으로 오는 데이터를 확인
        if (response.data.status === 'success') {
          alert('로그인 성공');
          window.location.href = '/MainPage';
        }
      } else {
        console.error("Login failed:", response.status); // 에러 상세 정보 출력
        alert('비밀번호가 일치하지 않습니다. 비밀번호를 3회 이상 잘못 입력할 경우 해당 계정은 차단 됩니다(N회)');
      }
    } catch (error) {
      console.error("Network or server error:", error); // 네트워크 또는 서버 오류를 출력
      alert('네트워크 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>회원가입</h1>
      
      <form>
            <label htmlFor="studentId" className={styles['visually-hidden']}>학번/사번</label>
            <input
              type="text"
              id="studentId"
              onChange={(e) => setIdx(e.target.value)}
              value={idx}
              className={styles.formInput}
              placeholder="학번/사번"
            />
              <label htmlFor="birthdate" className={styles['visually-hidden']}>생년월일</label>
            <input
              type="text"
              id="birthdate"
              onChange={(e) => setBirth(e.target.value)}
              value={birth}
              className={styles.formInput2}
              placeholder="생년월일(주민번호 앞자리)"
        
            />  
            <button type="submit" className={styles.verifyButton} onClick={handlefirstcheck}>
              인증
        </button>
          
            

        <label htmlFor="phone" className={styles['visually-hidden']}>핸드폰번호</label>
        <input
          type="tel"
          id="phone"
          onChange={(e) => setPhone(e.target.value)}
          value={phone}
          className={styles.formInput_phonenum}
          placeholder="핸드폰번호"
        />

        <div className={styles.verificationGroup}>
          <label htmlFor="verificationCode" className={styles['visually-hidden']}>인증번호</label>
          <input
            type="text"
            id="verificationCode"
            onChange={(e) => setcertCode(e.target.value)}
            value={certCode}
            className={styles.formInput}
            placeholder="인증번호"
          />
          <button type="submit" className={styles.verifyButton2} onClick={handlephonecert}>
              인증
        </button>
        </div>

        <label htmlFor="cardNumber" className={styles['visually-hidden']}>카드번호</label>
        <input
          type="text"
          id="cardNumber"
          value={card}
          onChange={(e) => setCard(e.target.value)}
          className={styles.cardInput}
          placeholder="카드번호를 입력하세요 <br> 이즐(구 케시비) 또는 신한카드 후불교통카드 16자리"
        />
        <br/>
        <button type="submit" className={styles.submitButton} onClick={handleSignup}>
          <span>회원가입 완료</span>
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