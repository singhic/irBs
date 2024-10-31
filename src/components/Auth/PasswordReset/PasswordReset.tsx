import React, { useState } from 'react';
import axios from 'axios';
import { Input } from './Input.tsx'; // Adjust the import path as necessary
import styles from './PasswordReset.module.css'; // Adjust the import path as necessary

const PasswordReset: React.FC = () => {
  const [idx, setIdx] = useState('');
  const [name, setName] = useState('');

  const handleReset = async (event: React.FormEvent) => {
    event.preventDefault();

    const ResetData = new URLSearchParams();
    ResetData.append('id', idx);
    ResetData.append('name', name);

    try {
      const response = await axios.post('/findPassProc.php', ResetData, {
        headers: {
          "Content-Type": `application/x-www-form-urlencoded`,
          "Accept": "application/json",
          "Access-Control-Allow-Origin": `/findPassProc.php`,
          'Access-Control-Allow-Credentials': "true",
        }
      });
      if (response.status === 200) {
        console.log(response.data);
        if (response.data.status === 'success') {
          alert('임시 비밀번호가 발급되었습니다. 문자를 확인해주세요.');
          window.location.href = '/Login';
        }
      } else {
        console.error("Reset failed:", response.status);
        alert('정보가 일치하지 않습니다. 다시 확인해주세요.');
      }
    } catch (error) {
      console.error("Network or server error:", error);
      alert('네트워크 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>비밀번호 찾기</h1>
      
      <form>
        <Input  
          className={styles.inputField}
          value={idx}
          label="아이디(학번/사번)"
          onChange={(e) => setIdx(e.target.value)}
          id="userId"
          spacing="large"
        />
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          id="phone"
          label="이름"
        />
        
        <button type="submit" className={styles.submitButton} onClick={handleReset}>
          비밀번호 변경
        </button>
      </form>

      <footer className={styles.footer}>
        <p className={styles.footerText}>
          로그인 화면으로 돌아갈까요?
        </p>
       
        <a href='Login'>
          <p className={styles.loginLink}>
            로그인
          </p>
        </a>
      </footer>
    </main>
  );
};

export default PasswordReset;