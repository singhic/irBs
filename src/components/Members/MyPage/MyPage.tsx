import React, { useState, useEffect } from "react";
import styles from "./MyPage.module.css";
import { UserStats } from "./UserStats.tsx";
import { SectionHeader } from "./SectionHeader.tsx";
import { RecentItem } from "./RecentItem.tsx";
import { Button, hexToRgb } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import axios from "axios";
import * as cheerio from "cheerio";

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

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
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
    { title: "예약 내역", icon: "/light-left-arrow.svg", href: "/Booklist" },
    {
      title: "패널티 내역",
      icon: "/light-left-arrow.svg",
      href: "/Penaltylist",
    },
    {
      title: "매너 내역",
      icon: "/light-left-arrow.svg",
      href: "/Mannerlist",
    },
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
            <img
              id="icon"
              src="/img/icon/big-arrow-left.svg"
              alt="뒤로가기 아이콘"
              className={styles.backicon}
            />
          </a>
          <p className={styles.myTitle}>마이페이지</p>
        </div>

        <div className={styles.userProfile}>
          <img
            src="/img/icon/profilelogo.svg"
            alt="프로필 이미지"
            className={styles.profileImage}
          />
          <div className={styles.userNP}>
            <span className={styles.userName}>{userName}님</span>
            <a href="/userprofile" className={styles.move_userprofile}>
              <img src="/img/icon/small-arrow-right.svg" alt="내 정보 수정" />
            </a>
          </div>
        </div>
      </header>

      <section className={styles.mainContent}>
        <UserStats penaltyCount="조회불가" mannerScore="85점" />

        <SectionHeader title="예약" icon="/img/icon/asklogo.svg" />
        {/* <div className={styles.contentCard}>
          <div className={styles.recentList}>
            {recentItems.map((item, index) => (
              <RecentItem key={index} {...item} />
            ))}
          </div>
          
        </div> */}

        <Paper square={false} sx={{ padding: 2, backgroundColor: "white" }}>
          <Stack spacing={2}>
            {recentItems.map((item, index) => (
              <RecentItem key={index} {...item} />
            ))}
          </Stack>
        </Paper>

        <SectionHeader title="문의" icon="/img/icon/asklogo.svg" />
        {/*<div className={styles.contentCard}>
          <div className={styles.recentList}>
            {inquiryItems.map((item, index) => (
              <RecentItem key={index} {...item} />
            ))}
          </div>
        </div>*/}

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
