import React from 'react';
import styles from './MyPage.module.css';
import { UserStats } from './UserStats.tsx';
import { SectionHeader } from './SectionHeader.tsx';
import { RecentItem } from './RecentItem.tsx';

const MyPage: React.FC = () => {
  const recentItems = [
    { title: '최근 예약 내역', icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/3b5b699760f9f36075bc9a552e56880c6bd0c84df0b47dd25314d709e0f5a2a8?placeholderIfAbsent=true' },
    { title: '최근 패널티 내역', icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/3b5b699760f9f36075bc9a552e56880c6bd0c84df0b47dd25314d709e0f5a2a8?placeholderIfAbsent=true' },
    { title: '최근 비매너 내역', icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/3b5b699760f9f36075bc9a552e56880c6bd0c84df0b47dd25314d709e0f5a2a8?placeholderIfAbsent=true' }
  ];

  const inquiryItems = [
    { title: '문의하기', icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/36ac5afc41fb8dfec1741df2d612b8dcfd8bba445b9637163186741855d9e248?placeholderIfAbsent=true' },
    { title: '최근 문의 내역', icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/36ac5afc41fb8dfec1741df2d612b8dcfd8bba445b9637163186741855d9e248?placeholderIfAbsent=true' }
  ];

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/c6f39fd7de10126956016a660e84671a37b66231dcc86d58ff090a6a35e1599c?placeholderIfAbsent=true" alt="마이페이지 아이콘" />
          <h1>마이페이지</h1>
        </div>
        <div className={styles.userProfile}>
          <div>
            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/6596c95482616e0247ca02575e9d69257aa06be47f4bdd62637ebf1c9344ba88?placeholderIfAbsent=true" alt="프로필 이미지" className={styles.profileImage} />
            <span className={styles.userName}>사용자님</span>
          </div>
          <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/942bad32bb7686b37623a7bbd94277cca6dfadef154afacbe543d2856ad9a096?placeholderIfAbsent=true" alt="" />
        </div>
      </header>

      <section className={styles.mainContent}>
        <UserStats penaltyCount={1} mannerScore="측정불가" />
        
        <SectionHeader title="예약" icon="https://cdn.builder.io/api/v1/image/assets/TEMP/e93cc959cb72382063af44ef50d63c214975ce83016a1d9db492a7ef89ca62c8?placeholderIfAbsent=true" />
        <div className={styles.contentCard}>
          <div className={styles.recentList}>
            {recentItems.map((item, index) => (
              <RecentItem key={index} {...item} />
            ))}
          </div>
        </div>

        <SectionHeader title="문의" icon="https://cdn.builder.io/api/v1/image/assets/TEMP/e93cc959cb72382063af44ef50d63c214975ce83016a1d9db492a7ef89ca62c8?placeholderIfAbsent=true" />
        <div className={styles.contentCard}>
          <div className={styles.recentList}>
            {inquiryItems.map((item, index) => (
              <RecentItem key={index} {...item} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default MyPage;