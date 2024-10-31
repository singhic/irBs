import styles from './PasswordReset.module.css';
import React from 'react';
import { Input } from './Input.tsx';


export const PasswordReset: React.FC = () => {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>비밀번호 찾기</h1>
      
      <form>
        <Input  
          className={styles.inputField}
          label = "아이디(학번/사번) "
          id="userId"
          spacing="large"
        />
        <Input
          
          id="phone"
          label="이름"
        />
        
      
        
        <button type="submit" className={styles.submitButton}>
          비밀번호 변경 완료
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