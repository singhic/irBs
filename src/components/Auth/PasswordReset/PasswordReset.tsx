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
          label="핸드폰번호"
        />
        
        <div className={styles.verificationSection}>
          <Input
            id="verification"
            label="인증번호"
          />
        <button type="submit" className={styles.verifyButton}>
              인증
        </button>
        </div>
        
        <Input
          id="newPassword"
          label="변경하고싶은 비밀번호를 입력하세요"
        />
        
        <Input
          id="confirmPassword"
          label="변경하고싶은 비밀번호를 재입력하세요"
        />
        
        <button type="submit" className={styles.submitButton}>
          비밀번호 변경 완료
        </button>
      </form>

      <footer className={styles.footer}>
        <p className={styles.footerText}>
          로그인 화면으로 돌아갈까요?
        </p>
        <button className={styles.loginLink}>
          로그인
        </button>
      </footer>
    </main>
  );
};

export default PasswordReset;