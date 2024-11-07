import React, { useEffect, useState } from 'react';
import styles from './UserProfile.module.css';
import { FormCard } from './FormCard.tsx';
import axios from 'axios';
import * as cheerio from 'cheerio';

async function fetchValueFromExternalSite(): Promise<string | null> {
  try {
    const response = await axios.get('/passport/list.php');
    const html = response.data;
    const $ = cheerio.load(html);
    const value = $('#p_name').attr('value');

    return value || null; // Ensure the return type is string or null
  } catch (error) {
    console.error('Error fetching value:', error);
    return null;
  }
}

export const UserProfile: React.FC = () => {
  const cardInputs = {
    cardNumber: [{
      id: 'cardNumber',
      placeholder: '이즐(케시비) 또는 신한 후불교통카드 16자리'
    }],
    password: [
      { id: 'newPassword', placeholder: '변경하고싶은 비밀번호를 입력하세요', type: 'password' },
      { id: 'confirmPassword', placeholder: '변경하고싶은 비밀번호를 재입력하세요', type: 'password' }
    ]
  };

  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const value = await fetchValueFromExternalSite();
      setUserName(value); // value is now guaranteed to be string or null
    };

    fetchData();
  }, []);

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
      />

      <FormCard
        title="비밀번호 변경"
        inputs={cardInputs.password}
        submitButtonSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/ebb3d84a5c2f4cc3eb994d8431c0402baaedfce83b320239cdb47457321352b1?placeholderIfAbsent=true"
      />

      <a href="#" className={styles.deactivateLink}>
        회원탈퇴를 찾으시나요?
      </a>
    </main>
  );
};

export default UserProfile;