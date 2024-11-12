import React, { useState, useEffect } from 'react';
import styles from './MyPage.module.css';
import { UserStats } from './UserStats.tsx';
import { SectionHeader } from './SectionHeader.tsx';
import { RecentItem } from './RecentItem.tsx';
import { Button } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';  
import Paper from '@mui/material/Paper';
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

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));


const MyPage: React.FC = () => {
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const value = await fetchValueFromExternalSite();
      setUserName(value); // value is now guaranteed to be string or null
    };

    fetchData();
  }, []);


  const recentItems = [
    { title: '최근 예약 내역', icon:  '/light-left-arrow.svg'},
    { title: '최근 패널티 내역', icon: '/light-left-arrow.svg' },
    { title: '최근 비매너 내역', icon: '/light-left-arrow.svg' }
  ];

  const inquiryItems = [
    { title: '문의하기', icon: '/light-left-arrow.svg' },
    { title: '최근 문의 내역', icon: '/light-left-arrow.svg' }
  ];

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <div className={styles.myHeader}>
            <a href='/MainPage'>
              <img id="icon" src="https://cdn.builder.io/api/v1/image/assets/TEMP/c6f39fd7de10126956016a660e84671a37b66231dcc86d58ff090a6a35e1599c?placeholderIfAbsent=true" alt="뒤로가기 아이콘" className={styles.backicon}/>
            </a>
            <h1>마이페이지</h1>
          </div>
          </div>

          <div className={styles.userProfile}>
            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/6596c95482616e0247ca02575e9d69257aa06be47f4bdd62637ebf1c9344ba88?placeholderIfAbsent=true" alt="프로필 이미지" className={styles.profileImage} />
            <span className={styles.userName}>{userName}님
            <a href='/userprofile' className={styles.move_userprofile}>
              <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/942bad32bb7686b37623a7bbd94277cca6dfadef154afacbe543d2856ad9a096?placeholderIfAbsent=true&apiKey=c37b27135006443aab5f3858d3155b30" alt="내 정보 수정" />
            </a>
            </span>
          </div>
      </header>

      <section className={styles.mainContent}>
        <UserStats penaltyCount={1} mannerScore="측정불가" />
        
        <SectionHeader title="예약" icon="https://cdn.builder.io/api/v1/image/assets/TEMP/e93cc959cb72382063af44ef50d63c214975ce83016a1d9db492a7ef89ca62c8?placeholderIfAbsent=true" />
        {/* <div className={styles.contentCard}>
          <div className={styles.recentList}>
            {recentItems.map((item, index) => (
              <RecentItem key={index} {...item} />
            ))}
          </div>
          
        </div> */}

        <Paper square={false} sx={{ padding: 2, backgroundColor: 'white',  }}>
        <Stack spacing={2}>
          {recentItems.map((item, index) => (
            <RecentItem key={index} {...item} />
            ))}
          </Stack>
        </Paper>

        <SectionHeader title="문의" icon="https://cdn.builder.io/api/v1/image/assets/TEMP/e93cc959cb72382063af44ef50d63c214975ce83016a1d9db492a7ef89ca62c8?placeholderIfAbsent=true" />
        {/*<div className={styles.contentCard}>
          <div className={styles.recentList}>
            {inquiryItems.map((item, index) => (
              <RecentItem key={index} {...item} />
            ))}
          </div>
        </div>*/}

        <Paper square={false} sx={{ padding: 2, backgroundColor: 'white',  }}>
        <Stack spacing={2}>
          {inquiryItems.map((item, index) => (
            <RecentItem key={index} {...item} />
            ))}
          </Stack>
        </Paper>
      </section> 
    </main>
  );
};

export default MyPage;