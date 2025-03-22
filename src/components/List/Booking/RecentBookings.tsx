import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { load } from 'cheerio';
import styles from './RecentBookings.module.css';

const ReservationStatus = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('use/list.php');
        const $ = load(response.data);

        const reservationDetails = [];

        $('ul[data-role="listview"]').each((i, ulElem) => {
          const date = $(ulElem).find('li[data-role="list-divider"]').text().trim();

          const li = $(ulElem).find('li').not('[data-role="list-divider"]');
          const h2s = li.find('h2');

          const category = $(h2s[0]).text().replace('구분 :', '').trim();
          const rawDetail = $(h2s[1]).text().replace('내역 :', '').trim().replace(/\s+/g, ' ');
          const cancelInfo = $(h2s[2]).text().replace('탑승여부 :', '').trim();

          const parts = rawDetail.split('/').map(part => part.trim());
          const time = parts[0] || '';
          const route = `${parts[1] || ''} / ${parts[2] || ''}`;
          const vehicle = `${parts[3] || ''} / ${parts[4] || ''}`;

          reservationDetails.push({
            timestamp: date,
            category,
            time,
            route,
            vehicle,
            cancelInfo,
          });
        });

        setReservations(reservationDetails);
      } catch (error) {
        console.error('Error fetching the page:', error);
        setReservations([]);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      {/* 🔹 상단 네비게이션 바 */}
      <div className={styles.navBar}>
        <a href="/MainPage" className={styles.navLink}>🏠 홈으로</a>
        <a href="/Mypage" className={styles.navLink}>👤 마이페이지</a>
      </div>

      <h1 className={styles.title}>예약 현황</h1>

      <div className={styles.ticketList}>
        {reservations.length > 0 ? (
          reservations.map((res, index) => (
            <div key={index} className={styles.ticket}>
              <div className={styles.date}>{res.timestamp}</div>
              <div className={styles.ticketRow}>
                <span className={styles.label}>시간:</span>
                <span className={styles.value}>{res.time}</span>
              </div>
              <div className={styles.ticketRow}>
                <span className={styles.label}>경로:</span>
                <span className={styles.value}>{res.route}</span>
              </div>
              <div className={styles.ticketRow}>
                <span className={styles.label}>차량:</span>
                <span className={styles.value}>{res.vehicle}</span>
              </div>
              <div className={styles.ticketRow}>
                <span className={styles.labelRed}>탑승여부:</span>
                <span className={styles.value}>{res.cancelInfo}</span>
              </div>
            </div>
          ))
        ) : (
          <p className={styles.noData}>예약 내역이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default ReservationStatus;