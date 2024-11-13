import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as cheerio from 'cheerio';
import styles from './SeatSelection.module.css';
import { Seat } from './Seat.tsx';
import { DateButton } from './DateButton.tsx';
import { ScheduleCard } from './ScheduleCard.tsx';
import { LegendItem } from './LegendItem.tsx';
import { DateButtonProps, ScheduleCardProps, SeatStatusProps } from './types.ts';

type SeatStatus = "available" | "reserved" | "selected";

export const SeatSelection: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(0);
  const [tripType, setTripType] = useState<'departure' | 'return'>('departure');
  const [schedules, setSchedules] = useState<ScheduleCardProps[]>([]);
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);
  const [seats, setSeats] = useState<SeatStatusProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [seatSelectionVisible, setSeatSelectionVisible] = useState(false);
  const lineCode = new URLSearchParams(window.location.search).get('lineCode') || 'defaultCode';

  // 현재 날짜부터 5일치 평일 생성
  const getWeekdays = (): DateButtonProps[] => {
    const weekdays: DateButtonProps[] = [];
    const today = new Date();
    let daysAdded = 0;

    while (daysAdded < 5) {
      const dayOfWeek = today.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        weekdays.push({ date: `${today.getDate()}일`, day: ['일', '월', '화', '수', '목', '금', '토'][dayOfWeek] });
        daysAdded++;
      }
      today.setDate(today.getDate() + 1);
    }
    return weekdays;
  };
  const dates = getWeekdays();

  // 스케줄 데이터 가져오기
  const fetchBusSchedules = async (dateIndex: number, type: 'departure' | 'return') => {
    setLoading(true);
    const selectedDate = dates[dateIndex].date.replace('일', '');
    const today = new Date();
    const dateCode = `${today.getFullYear()}${(today.getMonth() + 1).toString().padStart(2, '0')}${selectedDate.padStart(2, '0')}`;
    const url = `/reserve/time_select_proc.php?lineCode=${lineCode}&dateCode=${dateCode}`;

    try {
      const response = await axios.get(url, { responseType: 'arraybuffer' });
      const decodedHtml = new TextDecoder('utf-8').decode(response.data);
      const $ = cheerio.load(decodedHtml);

      const times: ScheduleCardProps[] = [];
      $('option').each((_, element) => {
        const text = $(element).text().trim().replace(/\u00A0/g, ' ');
        const timeMatch = text.match(/(\d{1,2}:\d{2})/);
        const seatMatch = text.match(/잔여(\d+)석/);
        const waitingMatch = text.match(/대기(\d+)명/);

        if (timeMatch && seatMatch && waitingMatch) {
          const time = timeMatch[0];
          const availableSeats = parseInt(seatMatch[1], 10);
          const waitingCount = parseInt(waitingMatch[1], 10);
          const scheduleType = text.includes('등교') ? 'departure' : 'return';

          if (scheduleType === type) {
            times.push({ time, availableSeats, waitingCount });
          }
        }
      });
      setSchedules(times);
    } catch (error) {
      console.error('Error fetching schedules:', error);
      alert('네트워크 오류가 발생했습니다.');
    }
    setLoading(false);
  };

  // 날짜 선택 시 스케줄 데이터 업데이트
  const handleDateSelect = (index: number) => {
    setSelectedDate(index);
    fetchBusSchedules(index, tripType);
  };

  // 등교/하교 버튼 클릭 시 스케줄 데이터 업데이트
  const handleTripTypeChange = (type: 'departure' | 'return') => {
    setTripType(type);
    fetchBusSchedules(selectedDate, type);
  };

  // 좌석 데이터 가져오기
  const fetchSeatData = async () => {
    const url = `/reserve/seat_status.php?lineCode=${lineCode}`;
    try {
      const response = await axios.get(url);
      const seatData: SeatStatusProps[] = response.data.map((seat: any) => ({
        number: seat.number,
        status: seat.status as SeatStatus,
      }));
      setSeats(seatData);
    } catch (error) {
      console.error('Error fetching seat data:', error);
      alert('좌석 데이터를 가져오는데 실패했습니다.');
    }
  };

  // 좌석 선택 핸들러
  const handleSeatSelect = (seatNumber: string) => {
    setSelectedSeat(selectedSeat === seatNumber ? null : seatNumber);
  };

  const handleCancelAll = () => {
    setSelectedSeat(null);
  };

  // 좌석 선택 창 열기
  const openSeatSelection = () => {
    setSeatSelectionVisible(true);
    fetchSeatData();
  };

  const closeSeatSelection = () => {
    setSeatSelectionVisible(false);
  };
    
    // 좌석 배열 생성 어떻게 불러오는지 아직몰라서 그냥 다 넣음ㅋㅋㅋㅋㅋㅋㅋ
  const newseats: SeatProps[] = [
    { seatNumber: '1', initialStatus: 'available', onSelect: handleSeatSelect },
    { seatNumber: '2', initialStatus: 'reserved', onSelect: handleSeatSelect },
    { seatNumber: '3', initialStatus: 'available', onSelect: handleSeatSelect },
    { seatNumber: '4', initialStatus: 'available', onSelect: handleSeatSelect },
    { seatNumber: '5', initialStatus: 'available', onSelect: handleSeatSelect },
    { seatNumber: '6', initialStatus: 'available', onSelect: handleSeatSelect },
    { seatNumber: '7', initialStatus: 'available', onSelect: handleSeatSelect },
    { seatNumber: '8', initialStatus: 'available', onSelect: handleSeatSelect },
    { seatNumber: '9', initialStatus: 'available', onSelect: handleSeatSelect },
    { seatNumber: '10', initialStatus: 'available', onSelect: handleSeatSelect },
    { seatNumber: '11', initialStatus: 'available', onSelect: handleSeatSelect },
    { seatNumber: '12', initialStatus: 'available', onSelect: handleSeatSelect },
    { seatNumber: '13', initialStatus: 'available', onSelect: handleSeatSelect },
    { seatNumber: '14', initialStatus: 'available', onSelect: handleSeatSelect },
    { seatNumber: '15', initialStatus: 'available', onSelect: handleSeatSelect },
    { seatNumber: '16', initialStatus: 'available', onSelect: handleSeatSelect },
    { seatNumber: '17', initialStatus: 'available', onSelect: handleSeatSelect },
    { seatNumber: '18', initialStatus: 'available', onSelect: handleSeatSelect },
    { seatNumber: '19', initialStatus: 'available', onSelect: handleSeatSelect },
    { seatNumber: '20', initialStatus: 'available', onSelect: handleSeatSelect },
    { seatNumber: '21', initialStatus: 'reserved', onSelect: handleSeatSelect },
    { seatNumber: '22', initialStatus: 'reserved', onSelect: handleSeatSelect },
    { seatNumber: '23', initialStatus: 'reserved', onSelect: handleSeatSelect },
    { seatNumber: '24', initialStatus: 'reserved', onSelect: handleSeatSelect },
    { seatNumber: '25', initialStatus: 'reserved', onSelect: handleSeatSelect },
    { seatNumber: '26', initialStatus: 'reserved', onSelect: handleSeatSelect },
    { seatNumber: '27', initialStatus: 'reserved', onSelect: handleSeatSelect },
    { seatNumber: '28', initialStatus: 'reserved', onSelect: handleSeatSelect },
    { seatNumber: '29', initialStatus: 'reserved', onSelect: handleSeatSelect },
    { seatNumber: '30', initialStatus: 'reserved', onSelect: handleSeatSelect },
    { seatNumber: '31', initialStatus: 'available', onSelect: handleSeatSelect },
    { seatNumber: '32', initialStatus: 'available', onSelect: handleSeatSelect },
    { seatNumber: '33', initialStatus: 'available', onSelect: handleSeatSelect },
    { seatNumber: '34', initialStatus: 'available', onSelect: handleSeatSelect },
    { seatNumber: '35', initialStatus: 'available', onSelect: handleSeatSelect },
    { seatNumber: '36', initialStatus: 'available', onSelect: handleSeatSelect },
    { seatNumber: '37', initialStatus: 'available', onSelect: handleSeatSelect },
    { seatNumber: '38', initialStatus: 'available', onSelect: handleSeatSelect },
    { seatNumber: '39', initialStatus: 'available', onSelect: handleSeatSelect },
    { seatNumber: '40', initialStatus: 'available', onSelect: handleSeatSelect },
    { seatNumber: '41', initialStatus: 'reserved', onSelect: handleSeatSelect },
    { seatNumber: '42', initialStatus: 'reserved', onSelect: handleSeatSelect },
    { seatNumber: '43', initialStatus: 'reserved', onSelect: handleSeatSelect },
    { seatNumber: '44', initialStatus: 'reserved', onSelect: handleSeatSelect },
  ];
    
  // 컴포넌트 렌더링
  return (
    <div className={styles.seatSelection}>
      <header className={styles.header}>
        <a href="/BusSchedule" className={styles.backButton}>
          <img src="/img/icon/arrow-left.png" alt="Back" className={styles.backIcon} />
        </a>
        <h1 className={styles.title}>좌석 선택</h1>
      </header>

      <section className={styles.dateSection}>
        {dates.map((date, index) => (
          <DateButton
            key={date.date}
            {...date}
            isActive={selectedDate === index}
            onClick={() => handleDateSelect(index)}
          />
        ))}
      </section>

      <section className={styles.scheduleSection}>
        <div className={styles.tripType}>
          <button
            className={`${styles.tripButton} ${tripType === 'departure' ? styles.tripButtonActive : ''}`}
            onClick={() => handleTripTypeChange('departure')}
          >
            등교
          </button>
          <button
            className={`${styles.tripButton} ${tripType === 'return' ? styles.tripButtonActive : ''}`}
            onClick={() => handleTripTypeChange('return')}
          >
            하교
          </button>
        </div>
        <div className={styles.scheduleDivider} /> {/* 스케줄 구분선 */}
        <div className={styles.scheduleCards}>
          {loading ? (
            <p>좌석을 불러오고 있습니다.</p>
          ) : schedules.length === 0 ? (
            <p>스케줄이 없습니다.</p>
          ) : (
            schedules.map((schedule, index) => (
              <ScheduleCard
                key={index}
                {...schedule}
                onSeatSelect={openSeatSelection}
              />
            ))
          )}
        </div>
      </section>

      {/* 좌석 선택 섹션 */}
      <section className={styles.seatingSection}>
        <div className={styles.legend}> {/* 전설 아이템 */}
          <LegendItem icon="/img/seat/seat_WHITE.png" label="빈좌석" alt="Empty seat icon" /> {/* 빈 좌석 아이콘 */}
          <LegendItem icon="/img/seat/seat_GRAY.png" label="예약석" alt="Reserved seat icon" /> {/* 예약 좌석 아이콘 */}
          <LegendItem icon="/img/seat/seat_GREEN.png" label="선택좌석" alt="Selected seat icon" /> {/* 선택 좌석 아이콘 */}
        </div>

        <div className={styles.busLayout}> {/* 버스 레이아웃 */}
          <div className={styles.driverLayout}>
            <img src="/img/seat/driver.png" alt="Driver" className={styles.driverIcon} /> {/* 운전사 아이콘 */}
          </div>
          {/* <img src="/steering-wheel.svg" alt="Steering wheel" className={styles.steeringIcon} /> 운전대 아이콘 */}
          <div className={styles.seatGrid}>
            {Array.from({ length: Math.ceil(newseats.length / 2) }, (_, i) => (
              <div className={styles.pair} key={i}>
                <Seat
                  {...newseats[i * 2]}
                  isSelected={selectedSeat === newseats[i * 2].seatNumber}
                  onSelect={(seatNumber) => handleSeatSelect(seatNumber)}
                />
                {newseats[i * 2 + 1] && (
                  <Seat
                    {...newseats[i * 2 + 1]}
                    isSelected={selectedSeat === newseats[i * 2 + 1].seatNumber}
                    onSelect={(seatNumber) => handleSeatSelect(seatNumber)}
                  />
                )}
              </div>
             ))}
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <a href="/Reservations">
          <button className={styles.confirmButton}>예약 완료</button>
        </a>
        <button className={styles.cancelButton} onClick={handleCancelAll}>
          전체 취소
        </button>
      </footer>
    </div>
  );
};

export default SeatSelection;