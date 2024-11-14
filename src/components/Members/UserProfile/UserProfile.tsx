import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormCard from './FormCard.tsx';
import * as cheerio from 'cheerio';
import styles from './UserProfile.module.css';
import IconButton from '@mui/material/IconButton';

const UserProfile: React.FC = () => {
  const [idx, setIdx] = useState<string>(''); // Ensure idx is always a string
  const [newpass, setnewpass] = useState('');
  const [pass, setpass] = useState('');
  const [phone, setphone] = useState('');
  const [card, setcard] = useState('');
  const [userName, setUserName] = useState<string | null>(null);

  const handlePasswordReset = async (event: React.FormEvent) => { // 비번 버튼 구현 함수
    event.preventDefault();
    if (newpass !== pass) {
      alert('비밀번호가 일치하지 않습니다. 다시 확인해 주세요.');
      return;
    }
    if (!newpass || !pass) {
      alert('변경할 비밀번호를 입력해주세요.');
      return;
    }
    const resetData = new URLSearchParams();
    resetData.append('id', idx);
    resetData.append('pass', pass);
    resetData.append('newpass', newpass);
    try {
      const response = await axios.post('/passport/update_pass_proc.php', resetData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Accept": "application/json",
        },
      });
      if (response.status === 200 && response.data.status === 'success') {
        alert("비밀번호가 변경되었습니다.");
        window.location.href = '/Login';
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert('네트워크 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };
  
  // Function to fetch user data from the server // idx값이랑 사용자 이름 값 가져오기
  async function fetchUserData(): Promise<{ idx: string | null; userName: string | null }> {
    try {
      const response = await axios.get('/passport/list.php');
      const html = response.data;
      const $ = cheerio.load(html);
      const idx = $('#p_idx').attr('value') || null;
      const userName = $('#p_name').attr('value') || null;

      return { idx, userName };
    } catch (error) {
      console.error('Error fetching user data:', error);
      return { idx: null, userName: null };
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const { idx, userName } = await fetchUserData();
      setIdx(idx || ''); // Ensure idx is set to a string, even if null is returned
      setUserName(userName || ''); // Set to empty string if null
    };

    fetchData();
  }, []);

  // Rest of your code continues here...
  // The rest of the code is unchanged

  // 카드 번호 유효성 검사 함수
  const isCardValid = (card: string) => /^\d{16}$/.test(card);

  const cardInputs = { // Input 값
    cardNumber: [
      {
        id: 'phoneNumber',
        placeholder: '전화번호를 입력하세요.',
        type: 'tel',
        value: phone,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => setphone(e.target.value)
      },
      {
        id: 'cardNumber',
        placeholder: '카드번호를 입력하세요.',
        type: 'text',
        value: card,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => setcard(e.target.value)
      }
    ]
  };
  const passwordInputs = {
    password: [
      {
        id: 'newPassword',
        placeholder: '변경하고 싶은 비밀번호를 입력하세요.',
        type: 'password',
        value: pass,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => setpass(e.target.value)
      },
      {
        id: 'confirmPassword',
        placeholder: '변경하고 싶은 비밀번호를 재입력하세요.',
        type: 'password',
        value: newpass,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => setnewpass(e.target.value)
      }
    ]
  };
  
  const handleCardNumberChange = async (event: React.FormEvent) => { //카드번호 버튼 구현 함수
    event.preventDefault();

    

    if (!phone || !card) {
      alert('빈 곳을 입력해주세요.');
      return;
    }
    if (!isCardValid(card)) {
      alert('카드 번호는 16자리 숫자여야 합니다.');
      return;
    }
    const resetData = new URLSearchParams();
    resetData.append('id', idx);
    resetData.append('card', card);
    resetData.append('phone', phone);
    resetData.append('card_type', 'd');
    console.log(resetData.toString());

    try {
      const response = await axios.post('/passport/update_proc.php', resetData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Accept": "application/json",
        },
      });
      if (response.status === 200 && response.data.status === 'success') {
        alert("카드번호가 변경되었습니다.");
        
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert('네트워크 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

   //css문
  return (
    <main className={styles.profileContainer}>
      <header className={styles.headerSection}>
        <a href='/MyPage'>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/c6f39fd7de10126956016a660e84671a37b66231dcc86d58ff090a6a35e1599c?placeholderIfAbsent=true"
            alt="Back"
            className={styles.backIcon}
          />
        </a>

        <IconButton sx={{ textAlign: 'center' }}>
          
        </IconButton>

        <h1>내 정보 수정</h1>
      </header>

      <section className={styles.userInfoSection}>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/6596c95482616e0247ca02575e9d69257aa06be47f4bdd62637ebf1c9344ba88?placeholderIfAbsent=true"
          alt="User avatar"
          className={styles.userAvatar}
        />
        <span className={styles.userName}>{userName}님</span>
      </section>

      <FormCard
        title="카드번호 변경"
        inputs={cardInputs.cardNumber}
        submitButtonSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/d02499e6f4144a4f444d0ac404794178a86350f292f81844d4a8ecafbbd84876?placeholderIfAbsent=true"
        buttonText="카드번호 변경"
        buttonDisabled={!phone || !isCardValid(card)}
        onSubmit={handleCardNumberChange}
      />

      <FormCard
        title="비밀번호 변경"
        inputs={passwordInputs.password}
        submitButtonSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/ebb3d84a5c2f4cc3eb994d8431c0402baaedfce83b320239cdb47457321352b1?placeholderIfAbsent=true"
        buttonText="비밀번호 변경"
        buttonDisabled={!newpass || !pass}
        onSubmit={handlePasswordReset}
      />
      <a href="#" className={styles.deactivateLink}>
        회원탈퇴를 찾으시나요?
      </a>
    </main>
  );
};

export default UserProfile;
