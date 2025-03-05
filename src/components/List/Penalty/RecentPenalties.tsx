import React, { useEffect, useState } from "react";
import styles from "./RecentPenalties.module.css";
import axios from "axios";
import * as cheerio from "cheerio";

export const getPenaltyCount = async (): Promise<number> => {
  try {
    const response = await axios.get("/penalty/list.php");
    const html = response.data;
    const $ = cheerio.load(html);
    
    let penaltyCount = 0;
    $("tr").each((_, element) => {
      const data = $(element).find("td");
      if (data.length > 0) penaltyCount++; // <td> 데이터가 있는 행만 카운트
    });

    return penaltyCount;
  } catch (error) {
    console.error("패널티 횟수 불러오기 실패:", error);
    return 0; // 오류 발생 시 기본값 0 반환
  }
};

interface PenaltyData {
  spans: string[];
  rows: { headers: string[]; data: string[] }[];
  penaltyCount: number;
}

const RecentPenalties: React.FC = () => {
  const [penaltyData, setPenaltyData] = useState<PenaltyData>({
    spans: [],
    rows: [],
    penaltyCount: 0,
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchHtmlContent = async () => {
    setIsLoading(true);
    try {
      console.log("데이터 요청 시작...");
      const response = await axios.get("/penalty/list.php");
      console.log("서버 응답 데이터:", response.data);

      const $ = cheerio.load(response.data);

      // <span> 태그 데이터 추출
      const extractedSpans: string[] = [];
      $("span").each((_, element) => {
        extractedSpans.push($(element).text().trim());
      });

      // <tr> 태그 내부 <th> 및 <td> 데이터 추출
      const extractedRows: { headers: string[]; data: string[] }[] = [];
      let penaltyCount = 0;

      $("tr").each((_, element) => {
        const headers: string[] = [];
        const data: string[] = [];

        $(element)
          .find("th")
          .each((_, thElement) => {
            headers.push($(thElement).text().trim());
          });

        $(element)
          .find("td")
          .each((_, tdElement) => {
            const text = $(tdElement).text().trim();
            data.push(text);
          });

        if (headers.length > 0 || data.length > 0) {
          extractedRows.push({ headers, data });
        }

        penaltyCount += data.length > 0 ? 1 : 0; // <td> 데이터가 있으면 1회 추가
      });

      setPenaltyData({ spans: extractedSpans, rows: extractedRows, penaltyCount });
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
    <div className={styles.container}>
      <header className={styles.header}>
        <a href="/Mypage" className={styles.headerIcon}>
          <img loading="lazy" src="img/icon/arrow-left.png" alt="뒤로가기" />
        </a>
        <h1 className={styles.headerTitle}>패널티 내역</h1>
      </header>

      <div className={`${styles.penaltyContent} ${styles.fadeIn}`}>
        {isLoading ? (
          <p>로딩 중...</p>
        ) : error ? (
          <p className={styles.error}>{error}</p>
        ) : (
          <>
            {/* 패널티 횟수 표시 */}
            <p className={styles.penaltyCount}>
              총 패널티 횟수: <strong>{penaltyData.penaltyCount}회</strong>
            </p>

            {/* <span> 태그 데이터 표시 */}
            {penaltyData.spans.length > 0 && (
              <div className={styles.spanContainer}>
                {penaltyData.spans.map((text, index) => (
                  <span key={index} className={styles.penaltySpan}>
                    {text}
                  </span>
                ))}
              </div>
            )}

            {/* <tr> 태그 내부 <th> 및 <td> 데이터 표시 */}
            {penaltyData.rows.length > 0 ? (
              <table className={styles.penaltyTable}>
                <thead>
                  {penaltyData.rows.map((row, index) =>
                    row.headers.length > 0 ? (
                      <tr key={index} className={styles.penaltyRow}>
                        {row.headers.map((header, i) => (
                          <th key={i} className={styles.penaltyHeaderCell}>
                            {header}
                          </th>
                        ))}
                      </tr>
                    ) : null
                  )}
                </thead>
                <tbody>
                  {penaltyData.rows.map((row, index) =>
                    row.data.length > 0 ? (
                      <tr key={index} className={styles.penaltyRow}>
                        {row.data.map((data, i) => (
                          <td key={i} className={styles.penaltyDataCell}>
                            {data}
                          </td>
                        ))}
                      </tr>
                    ) : null
                  )}
                </tbody>
              </table>
            ) : (
              <p>패널티 내역이 없습니다.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default RecentPenalties;
