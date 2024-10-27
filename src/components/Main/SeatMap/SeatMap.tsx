import { FC } from 'react';
import styles from './SeatMap.module.css';
import { SeatRow } from './SeatRow';
import { LegendItem } from './LegendItem.tsx';
import React from 'react';

const seatData = [
  [
    { number: '1', type: 'red' },
    { number: '2', type: 'red' },
    { number: '3', type: 'red' },
    { number: '4', type: 'red' }
  ],
  // ... rest of seat data following same pattern
];

const legendItems = [
  { icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/ac276051c164d3e8172952e36bd31d233e6ba95b2aa4c36cec4bdee859294814?placeholderIfAbsent=true&apiKey=c37b27135006443aab5f3858d3155b30', text: '빈좌석' },
  { icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/d42877d7ffcc3c83f4008d371f3b4d46b3d34e8f06cd2733e50ae0052751470e?placeholderIfAbsent=true&apiKey=c37b27135006443aab5f3858d3155b30', text: '예약석' },
  { icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/ee20e95ffdeb15a5079fa16090c423c862ce8274825547be52ab3f8978821916?placeholderIfAbsent=true&apiKey=c37b27135006443aab5f3858d3155b30', text: '선택좌석' }
];

export const SeatMap: FC = () => {
  return (
    <section className={styles.container}>
      <header className={styles.legend}>
        {legendItems.map((item, index) => (
          <LegendItem key={index} {...item} />
        ))}
      </header>
      
      <main className={styles.seatMapContainer}>
        {seatData.map((row, index) => (
          <SeatRow key={index} seats={row} />
        ))}
      </main>

      <footer>
        <button className={styles.confirmButton}>예약 완료</button>
        <button className={styles.cancelButton}>전체 취소</button>
      </footer>
    </section>
  );
};