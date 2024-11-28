import React, { useState, useEffect } from "react";
import axios from "axios";
import * as cheerio from "cheerio";
import styles from "./SeatSelection.module.css";
import { Seat } from "./Seat.tsx";
import { DateButton } from "./DateButton.tsx";
import { ScheduleCard } from "./ScheduleCard.tsx";
import { LegendItem } from "./LegendItem.tsx";
import {
  DateButtonProps,
  ScheduleCardProps,
  SeatProps,
  SeatStatusProps,
} from "./types.ts";

type SeatStatus = "available" | "reserved" | "selected";

export const SeatSelection: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(0);
  const [tripType, setTripType] = useState<"departure" | "return">("departure");
  const [schedules, setSchedules] = useState<ScheduleCardProps[]>([]);
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);
  const [seats, setSeats] = useState<SeatStatusProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [seatSelectionVisible, setSeatSelectionVisible] = useState(false);
  const lineCode =
    new URLSearchParams(window.location.search).get("lineCode") ||
    "defaultCode";
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [busCode, setBusCode] = useState<string>(""); // busCode 상태 변수
  const [seat, setSeat] = useState<number | null>(null); // 선택된 좌석의 index

  // 현재 날짜부터 5일치 평일 생성
  const getWeekdays = (): DateButtonProps[] => {
    const weekdays: DateButtonProps[] = [];
    const today = new Date();
    let daysAdded = 0;

    while (daysAdded < 5) {
      const dayOfWeek = today.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        weekdays.push({
          date: `${today.getDate()}일`,
          day: ["일", "월", "화", "수", "목", "금", "토"][dayOfWeek],
        });
        daysAdded++;
      }
      today.setDate(today.getDate() + 1);
    }
    return weekdays;
  };

  const dates = getWeekdays();

  // 스케줄 데이터 가져오기
  const fetchBusSchedules = async (
    dateIndex: number,
    type: "departure" | "return"
  ) => {
    setLoading(true);

    // 현재 날짜 기준으로 처리
    const today = new Date();
    const selectedDate = parseInt(dates[dateIndex].date.replace("일", ""), 10);

    // 날짜 객체 생성
    let year = today.getFullYear();
    let month = today.getMonth() + 1; // 1월이 0부터 시작하므로 1 더함

    // 현재 날짜의 월 경계 처리
    if (selectedDate < today.getDate()) {
      // 선택한 날짜가 오늘보다 작다면 다음 달로 간주
      month += 1;
      if (month > 12) {
        month = 1; // 12월에서 넘어가면 1월로 변경
        year += 1; // 연도 증가
      }
    }
    const dateCode = `${year}${month.toString().padStart(2, "0")}${selectedDate
      .toString()
      .padStart(2, "0")}`;
    const url = `/reserve/time_select_proc.php?lineCode=${lineCode}&dateCode=${dateCode}`;

    try {
      const response = await axios.get(url, { responseType: "arraybuffer" });
      const decodedHtml = new TextDecoder("utf-8").decode(response.data);
      const $ = cheerio.load(decodedHtml);

      const times: ScheduleCardProps[] = [];
      $("option").each((_, element) => {
        const value = $(element).attr("value") || "";
        const text = $(element)
          .text()
          .trim()
          .replace(/\u00A0/g, " ");
        const timeMatch = text.match(/(\d{1,2}:\d{2})/);
        const seatMatch = text.match(/잔여(\d+)석/);
        const waitingMatch = text.match(/대기(\d+)명/);

        if (timeMatch && seatMatch && waitingMatch) {
          const time = timeMatch[0];
          const availableSeats = parseInt(seatMatch[1], 10);
          const waitingCount = parseInt(waitingMatch[1], 10);
          const scheduleType = text.includes("등교") ? "departure" : "return";

          if (scheduleType === type) {
            // value 값도 함께 추가
            times.push({ time, availableSeats, waitingCount, value });
          }
        }
      });
      setSchedules(times);
    } catch (error) {
      console.error("Error fetching schedules:", error);
      alert("네트워크 오류가 발생했습니다.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBusSchedules(selectedDate, tripType);
  }, []);

  // 날짜 선택 시 스케줄 데이터 업데이트
  const handleDateSelect = (index: number) => {
    setSelectedDate(index);
    fetchBusSchedules(index, tripType);
    setSelectedSeat(null);
  };

  // 등교/하교 버튼 클릭 시 스케줄 데이터 업데이트
  const handleTripTypeChange = (type: "departure" | "return") => {
    setTripType(type);
    fetchBusSchedules(selectedDate, type);
    setSelectedSeat(null);
  };

  // 좌석 데이터 업데이트 함수
  const fetchSeatData = async (index: number) => {
    const scheduleItem = schedules[index];
    const timeCode = scheduleItem?.value;

    if (!timeCode) {
      alert("유효한 시간 코드가 없습니다.");
      return;
    }

    const url = `/reserve/select_seat.php?lineCode=${lineCode}&timeCode=${timeCode}`;
    try {
      const response = await axios.get(url);
      const html = response.data;
      const $ = cheerio.load(html);

      const busCodeMatch = html.match(/fnSelectSeat\((\d+),/);
      if (busCodeMatch) {
        setBusCode(busCodeMatch[1]); // 첫 번째 숫자 117201 추출하여 busCode 상태에 저장
      }

      // 좌석 상태를 업데이트하기 위한 새로운 배열
      const updatedSeats = newseats.map((seat) => {
        const seatNumber = parseInt(seat.seatNumber); // 좌석 번호를 숫자로 변환

        if (seatNumber >= 1 && seatNumber <= 44) {
          const seatElement = $(
            ".ui-grid-d .ui-block-a, .ui-block-b, .ui-block-d, .ui-block-e"
          ).eq(seatNumber);
          const seatStatus = seatElement.find("a").text().trim();

          if (seatStatus === "X") {
            console.log(seatNumber, "is reserved");
            return { ...seat, initialStatus: "reserved" };
          } else {
            return { ...seat, initialStatus: "available" };
          }
        }
        return seat;
      });

      setNewSeats(updatedSeats);
      console.log("Updated newseats:", updatedSeats);
    } catch (error) {
      console.error("Error fetching seat data:", error);
      alert("좌석 데이터를 가져오는데 실패했습니다.");
    }
  };

  useEffect(() => {
    if (activeIndex !== null && schedules.length > 0) {
      fetchSeatData(activeIndex);
    }
  }, [activeIndex, schedules]);

  const handleSeatSelect = async (seatNumber: string) => {
    // 좌석 업데이트 로직
    const updatedSeats = seats.map((seat) => {
      if (seat.seatNumber === seatNumber && seat.initialStatus !== "reserved") {
        const newStatus =
          seat.initialStatus === "available" ? "selected" : "available";
        return {
          ...seat,
          initialStatus: newStatus,
        };
      }
      return seat;
    });

    setSeats(updatedSeats); // 상태 업데이트

    // `selectedSeat` 상태를 업데이트하고 바로 예약 요청을 실행
    setSelectedSeat(seatNumber);

    // 최신 선택된 좌석 정보를 push_result로 전달
    await push_result(seatNumber); // 선택된 좌석 넘기기
  };

  const push_result = async (seatNumber: string) => {
    // 스케줄이 선택되지 않은 경우
    if (activeIndex === null) {
      alert("스케줄을 선택해주세요.");
      setSelectedSeat(null);
      return;
    }

    // 좌석이 선택되지 않은 경우
    if (!seatNumber) {
      alert("좌석을 선택해주세요.");
      setSelectedSeat(null);
      return;
    }

    setSelectedSeat(seatNumber);

    // 사용자에게 예약 확인 요청
    const isConfirmed = window.confirm(
      `좌석 ${seatNumber}번을 예약하시겠습니까?`
    );

    // 사용자가 예약을 확인하지 않은 경우
    if (!isConfirmed) {
      alert("예약이 취소되었습니다.");
      setSelectedSeat(null);
      return;
    }

    // 예약 처리 시작
    const result = new URLSearchParams();
    result.append("busCode", busCode); // busCode 상태에서 가져옴
    result.append("seatNum", seatNumber); // 선택된 좌석의 index (seatNumber)을 추가
    result.append("oriCode", busCode);

    try {
      const response = await axios.post(
        "/reserve/insert_reserve_proc.php",
        result,
        {
          headers: {
            "Content-Type": `application/x-www-form-urlencoded`,
            Accept: "application/json",
            "Access-Control-Allow-Origin": `/reserve/insert_reserve_proc.php`,
            "Access-Control-Allow-Credentials": "true",
          },
        }
      );

      // 예약 성공 시
      if (response.status === 200 && response.data.status === "success") {
        alert(response.data.message);

        // 예약 성공 후 좌석 데이터를 다시 불러옴
        if (activeIndex !== null && schedules.length > 0) {
          await fetchSeatData(activeIndex); // 현재 활성화된 스케줄의 좌석 상태를 다시 가져오기
          setSelectedSeat(null);
        }
      } else {
        // 예약 실패 시
        alert(response.data.message);
        setSelectedSeat(null);
      }
    } catch (error) {
      console.error("Error:", error);
      setSelectedSeat(null);
      alert("네트워크 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  // 좌석 선택 창 열기
  const openSeatSelection = (index: number) => {
    setActiveIndex(index);
    setSeatSelectionVisible(false);
    fetchSeatData(index);
    setSelectedSeat(null);
  };

  const [newseats, setNewSeats] = useState<SeatProps[]>([
    { seatNumber: "1", initialStatus: "available", onSelect: handleSeatSelect },
    { seatNumber: "2", initialStatus: "available", onSelect: handleSeatSelect },
    { seatNumber: "3", initialStatus: "available", onSelect: handleSeatSelect },
    { seatNumber: "4", initialStatus: "available", onSelect: handleSeatSelect },
    { seatNumber: "5", initialStatus: "available", onSelect: handleSeatSelect },
    { seatNumber: "6", initialStatus: "available", onSelect: handleSeatSelect },
    { seatNumber: "7", initialStatus: "available", onSelect: handleSeatSelect },
    { seatNumber: "8", initialStatus: "available", onSelect: handleSeatSelect },
    { seatNumber: "9", initialStatus: "available", onSelect: handleSeatSelect },
    {
      seatNumber: "10",
      initialStatus: "available",
      onSelect: handleSeatSelect,
    },
    {
      seatNumber: "11",
      initialStatus: "available",
      onSelect: handleSeatSelect,
    },
    {
      seatNumber: "12",
      initialStatus: "available",
      onSelect: handleSeatSelect,
    },
    {
      seatNumber: "13",
      initialStatus: "available",
      onSelect: handleSeatSelect,
    },
    {
      seatNumber: "14",
      initialStatus: "available",
      onSelect: handleSeatSelect,
    },
    {
      seatNumber: "15",
      initialStatus: "available",
      onSelect: handleSeatSelect,
    },
    {
      seatNumber: "16",
      initialStatus: "available",
      onSelect: handleSeatSelect,
    },
    {
      seatNumber: "17",
      initialStatus: "available",
      onSelect: handleSeatSelect,
    },
    {
      seatNumber: "18",
      initialStatus: "available",
      onSelect: handleSeatSelect,
    },
    {
      seatNumber: "19",
      initialStatus: "available",
      onSelect: handleSeatSelect,
    },
    {
      seatNumber: "20",
      initialStatus: "available",
      onSelect: handleSeatSelect,
    },
    {
      seatNumber: "21",
      initialStatus: "available",
      onSelect: handleSeatSelect,
    },
    {
      seatNumber: "22",
      initialStatus: "available",
      onSelect: handleSeatSelect,
    },
    {
      seatNumber: "23",
      initialStatus: "available",
      onSelect: handleSeatSelect,
    },
    {
      seatNumber: "24",
      initialStatus: "available",
      onSelect: handleSeatSelect,
    },
    {
      seatNumber: "25",
      initialStatus: "available",
      onSelect: handleSeatSelect,
    },
    {
      seatNumber: "26",
      initialStatus: "available",
      onSelect: handleSeatSelect,
    },
    {
      seatNumber: "27",
      initialStatus: "available",
      onSelect: handleSeatSelect,
    },
    {
      seatNumber: "28",
      initialStatus: "available",
      onSelect: handleSeatSelect,
    },
    {
      seatNumber: "29",
      initialStatus: "available",
      onSelect: handleSeatSelect,
    },
    {
      seatNumber: "30",
      initialStatus: "available",
      onSelect: handleSeatSelect,
    },
    {
      seatNumber: "31",
      initialStatus: "available",
      onSelect: handleSeatSelect,
    },
    {
      seatNumber: "32",
      initialStatus: "available",
      onSelect: handleSeatSelect,
    },
    {
      seatNumber: "33",
      initialStatus: "available",
      onSelect: handleSeatSelect,
    },
    {
      seatNumber: "34",
      initialStatus: "available",
      onSelect: handleSeatSelect,
    },
    {
      seatNumber: "35",
      initialStatus: "available",
      onSelect: handleSeatSelect,
    },
    {
      seatNumber: "36",
      initialStatus: "available",
      onSelect: handleSeatSelect,
    },
    {
      seatNumber: "37",
      initialStatus: "available",
      onSelect: handleSeatSelect,
    },
    {
      seatNumber: "38",
      initialStatus: "available",
      onSelect: handleSeatSelect,
    },
    {
      seatNumber: "39",
      initialStatus: "available",
      onSelect: handleSeatSelect,
    },
    {
      seatNumber: "40",
      initialStatus: "available",
      onSelect: handleSeatSelect,
    },
    {
      seatNumber: "41",
      initialStatus: "available",
      onSelect: handleSeatSelect,
    },
    {
      seatNumber: "42",
      initialStatus: "available",
      onSelect: handleSeatSelect,
    },
    {
      seatNumber: "43",
      initialStatus: "available",
      onSelect: handleSeatSelect,
    },
    {
      seatNumber: "44",
      initialStatus: "available",
      onSelect: handleSeatSelect,
    },
  ]);

  // 컴포넌트 렌더링
  return (
    <div className={styles.seatSelection}>
      <header className={styles.header}>
        <a href="/BusSchedule" className={styles.backButton}>
          <img
            src="/img/icon/arrow-left.png"
            alt="Back"
            className={styles.backIcon}
          />
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
            className={`${styles.tripButton} ${
              tripType === "departure" ? styles.tripButtonActive : ""
            }`}
            onClick={() => handleTripTypeChange("departure")}
          >
            등교
          </button>
          <button
            className={`${styles.tripButton} ${
              tripType === "return" ? styles.tripButtonActive : ""
            }`}
            onClick={() => handleTripTypeChange("return")}
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
                isActive={activeIndex === index}
                onClick={() => openSeatSelection(index)}
              />
            ))
          )}
        </div>
      </section>

      {/* 좌석 선택 섹션 */}
      <section className={styles.seatingSection}>
        <div className={styles.legend}>
          {" "}
          {/* 전설 아이템 */}
          <LegendItem
            icon="/img/seat/seat_WHITE.png"
            label="빈좌석"
            alt="Empty seat icon"
          />{" "}
          {/* 빈 좌석 아이콘 */}
          <LegendItem
            icon="/img/seat/seat_GRAY.png"
            label="예약석"
            alt="Reserved seat icon"
          />{" "}
          {/* 예약 좌석 아이콘 */}
          <LegendItem
            icon="/img/seat/seat_GREEN.png"
            label="선택좌석"
            alt="Selected seat icon"
          />{" "}
          {/* 선택 좌석 아이콘 */}
        </div>

        <div className={styles.busLayout}>
          {" "}
          {/* 버스 레이아웃 */}
          <div className={styles.driverLayout}>
            <img
              src="/img/seat/driver.png"
              alt="Driver"
              className={styles.driverIcon}
            />{" "}
            {/* 운전사 아이콘 */}
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
        <a href="/reservations">
          <button className={styles.confirmButton}>예약 마치기</button>
        </a>
      </footer>
    </div>
  );
};

export default SeatSelection;
