import React, { useState, useEffect } from "react";
import styles from "./MyPage.module.css";
import { UserStats } from "./UserStats.tsx";
import { SectionHeader } from "./SectionHeader.tsx";
import { RecentItem } from "./RecentItem.tsx";
import { Button } from "@mui/material";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import axios from "axios";
import * as cheerio from "cheerio";
import Grid from "@mui/material/Grid";
import { getPenaltyCount } from "../../List/Penalty/RecentPenalties.tsx";


const MyPage: React.FC = () => {
  const [userName, setUserName] = useState<string | null>(null);
  const [penaltyCount, setPenaltyCount] = useState<number>(0); // ✅ 패널티 횟수 상태 추가
  async function fetchValueFromExternalSite(): Promise<string | null> {
    try {
      const response = await axios.get("/passport/list.php");
      const html = response.data;
      const $ = cheerio.load(html);
      const value = $("#p_name").attr("value");
  
      return value || null; // Ensure the return type is string or null
    } catch (error) {
      console.error("Error fetching value:", error);
      return null;
    }
  }
  
  
  useEffect(() => {
    const fetchUserData = async () => {
      const value = await fetchValueFromExternalSite();
      setUserName(value);
    };

    const fetchPenaltyData = async () => {
      const count = await getPenaltyCount(); // ✅ 패널티 횟수 가져오기
      setPenaltyCount(count);
    };

    fetchUserData();
    fetchPenaltyData();
  }, []);

  const recentItems = [
    { title: "예약 내역", icon: "/light-left-arrow.svg", href: "/Booklist" },
    { title: "패널티 내역", icon: "/light-left-arrow.svg", href: "/Penaltylist" },
    { title: "매너 내역", icon: "/light-left-arrow.svg", href: "/Mannerlist" },
  ];

  const inquiryItems = [
    { title: "문의하기", icon: "/light-left-arrow.svg", href: "/Inquiry" },
    { title: "문의 내역", icon: "/light-left-arrow.svg", href: "/Inquirylist" },
  ];

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.myHeader}>
          <a href="/MainPage">
            <img id="icon" src="/img/icon/big-arrow-left.svg" alt="뒤로가기 아이콘" className={styles.backicon} />
          </a>
          <p className={styles.myTitle}>마이페이지</p>
        </div>

        <div className={styles.userProfile}>
          <img src="/img/icon/profilelogo.svg" alt="프로필 이미지" className={styles.profileImage} />
          <div className={styles.userNP}>
            <span className={styles.userName}>{userName}</span>
          </div>
          <Button
            variant="outlined"
            size="small"
            sx={{
              borderRadius: "10px",
              backgroundColor: "rgb(176, 224, 230)",
              border: "rgba(0, 0, 0, 0.4)",
              color: "text.secondary",
            }}
            href="/userprofile"
          >
            내정보 수정
          </Button>
        </div>
      </header>

      <section className={styles.mainContent}>
        {/* ✅ 패널티 횟수 값 적용 */}
        <UserStats penaltyCount={penaltyCount} mannerScore="85점" />

        <SectionHeader title="예약" icon="/img/icon/asklogo.svg" />

        <Paper square={false} sx={{ padding: 2, backgroundColor: "white" }}>
          <Stack spacing={2}>
            {recentItems.map((item, index) => (
              <RecentItem key={index} {...item} />
            ))}
          </Stack>
        </Paper>

        <SectionHeader title="문의" icon="/img/icon/asklogo.svg" />

        <Paper square={false} sx={{ padding: 2, backgroundColor: "white" }}>
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
