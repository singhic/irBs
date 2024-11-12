import React, { useState } from 'react';
import axios from 'axios';
import FormCard from './FormCard.tsx';
import styles from './UserProfile.module.css';

const UserProfile: React.FC = () => {
  const [idx, setIdx] = useState('');
  const [newpass, setnewpass] = useState('');
  const [pass, setpass] = useState('');
  const [phone,setphone] = useState('');
  const [card, setcard] = useState('');
  const [card_type, setcard_type] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [userName, setUserName] = useState<string | null>(null);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value); // 상태를 업데이트
  };
  const handlePasswordReset = async (event: React.FormEvent) => {
    event.preventDefault();
    if (newpass !== pass) {
      alert('비밀번호가 일치하지 않습니다. 다시 확인해 주세요.'); // 새비번 새비번 재입력 확인 
      return;
    }
    if (newpass==null|| pass==null) {
      alert('변경할 비밀번호를 입력해주세요.'); //아무것도 입력 x
      return;
    }
    const resetData = new URLSearchParams();
    resetData.append('id',idx);
    resetData.append('pass',pass);
    resetData.append('newpass',newpass);
    
    try {
        const response = await axios.post('/passport/update_pass_proc.php', resetData, {
        headers: {                        
          "Content-Type": "application/x-www-form-urlencoded",
          "Accept": "application/json",
        },
      });
      if (response.status === 200 && response.data.status === 'success') {
        alert(response.data.message);
        alert("비밀번호가 변경되었습니다.");
        window.location.href = '/Login';
        event.preventDefault();
       
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert('네트워크 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  

  const handleCardNumberChange = async (event: React.FormEvent) => {
   

    event.preventDefault();

    const resetData = new URLSearchParams();
    resetData.append('id',idx);
    resetData.append('card',card);
    resetData.append('phone', phone);
    resetData.append('card_type',card_type);
    
    try {
      const response = await axios.post('/passport/update_pass_proc.php', resetData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Accept": "application/json",
        },
      });
      if (response.status === 200 && response.data.status === 'success') {
        alert(response.data.message);
        alert("카드번호가 변경되었습니다.");
        window.location.href = '/Login';
        event.preventDefault();
      
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert('네트워크 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className={styles.profileContainer}>
           <h1 className={styles.backIcon}>
            안녕하세요. {userName}님
          </h1>
        
          <img 
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/000f5f913f98483ee512f05f509b6c27a28917768973c443b3543c86a04612d4?placeholderIfAbsent=true" 
            alt="Settings" 
            className={styles.settingsIcon} 
          />
    <FormCard
  title="비밀번호 변경"
  inputs={[
    { id: 'pass', placeholder: '새 비밀번호 입력', type: 'password', value: pass, onChange: (e) => setpass(e.target.value) },
    { id: 'newpass', placeholder: '새 비밀번호 재입력', type: 'password', value: newpass, onChange: (e) => setnewpass(e.target.value) },
  ]}
  buttonText="비밀번호 변경"
  onSubmit={handlePasswordReset}
/>
    <FormCard
        title="카드번호 변경"
        inputs={[
          { id: 'idx', placeholder: '아이디 입력', value: idx, onChange: (e) => setIdx(e.target.value) },
          { id: 'phone', placeholder: '전화번호 입력', type: 'text', value: phone, onChange: (e) => setphone(e.target.value) },
          { id: 'card', placeholder: '카드번호 입력', type: 'text', value: card, onChange: (e) => setcard(e.target.value) },
          { id: 'cardType', placeholder: '카드 종류 입력', type: 'text', value: card_type, onChange: (e) =>  setcard_type(e.target.value) },
        ]}
        buttonText="카드번호 변경"
        onSubmit={handleCardNumberChange}
      />
    </div>
  );
};

export default UserProfile;
