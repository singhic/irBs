import React, { useEffect, useState } from "react";
import styles from "./RecentPenalties.module.css";
import axios from "axios";
import * as cheerio from 'cheerio';

const RecentPenalties: React.FC = () => {
  const [htmlContent, setHtmlContent] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchHtmlContent = async () => {
    setIsLoading(true);
    try {
      console.log("데이터 요청 시작...");
      const response = await axios.get("/penalty/list.php");
      console.log("서버 응답 데이터:", response.data);

      const html = response.data;
      setHtmlContent(html);
    } catch (err) {
      console.error("데이터 크롤링 중 오류:", err);
      setError("패널티 데이터를 불러오는 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHtmlContent();
  }, []);

  return (
    <div className={styles.penaltyContainer}>
      <header className={styles.penaltyHeader}>
        <a href="/Mypage" className={styles.headerIcon}>
          <img loading="lazy" src="img/icon/arrow-left.png" alt="뒤로가기" />
        </a>
        <h1 className={styles.headerTitle}>패널티 내역</h1>
      </header>

      <div className={styles.penaltyContent}>
        {isLoading ? (
          <p>로딩 중...</p>
        ) : error ? (
          <p className={styles.error}>{error}</p>
        ) : (
          <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        )}
      </div>
    </div>
  );
};

export default RecentPenalties;
