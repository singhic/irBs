import { FC, useEffect, useState } from "react";
import styles from "./ReservationStatus.module.css"; // CSS 확인
import { Ticket } from "./Ticket.tsx";
import { useSwipeable } from "react-swipeable";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as cheerio from "cheerio";
import React from "react";

// 예약 정보를 가져오는 함수
async function fetchReservation(): Promise<Array<{
  routeName: string;
  departureTime: string;
  seatNumber: string;
  departuredate: string;
}> | null> {
  try {
    const response = await axios.get("/index.php");
    const html = response.data;
    const $ = cheerio.load(html);

    const reservationElements = $('ul[data-role="listview"] li'); // 예약 항목 모두 선택
    const reservations: Array<{
      routeName: string;
      departureTime: string;
      seatNumber: string;
      departuredate: string;
    }> = [];

    // 오늘 날짜를 'YYYY.MM.DD' 형식으로 가져오기 (한국 시간)
    const now = new Date();
    const todayDate = `${now.getFullYear()}${(now.getMonth() + 1)
      .toString()
      .padStart(2, "0")}${now.getDate().toString().padStart(2, "0")}`;

    reservationElements.each((index, element) => {
      const dateText = $(element).find("h2").text().trim(); // 날짜 정보
      const routeNameText = $(element).find("p").first().text().trim(); // "노선 : 장유"
      const seatInfo = $(element).find("p").eq(1).text().trim(); // "차량 : 1호차 - 6번"

      // 예시 "노선 : 장유"에서 "장유"만 추출
      const routeNameMatch = routeNameText.match(/노선\s*:\s*([가-힣]+)/);
      if (!routeNameMatch) return; // "노선 : "이 없는 항목은 건너뛰기
      const routeName = routeNameMatch[1]; // "장유"

      // 좌석 번호만 추출
      const seatNumberMatch = seatInfo.match(/(\d+)번/);
      if (!seatNumberMatch) return; // 좌석 번호가 없으면 건너뛰기
      const seatNumber = seatNumberMatch[1]; // "6"

      // 날짜 추출 및 변환 (예: "11-19 (화) 18:10" -> 2024.11.19 18:10)
      const dateTextMatch = dateText.match(/(\d{1,2})-(\d{1,2})/); // "11-19"
      if (!dateTextMatch) return;
      const [_, month, day] = dateTextMatch;

      let year = now.getFullYear();
      if (Number(month) < now.getMonth() + 1) {
        year += 1; // 만약 현재 월보다 작은 월이면 1년 더함
      }

      const departuredate = `${year}.${String(month).padStart(2, "0")}.${String(
        day
      ).padStart(2, "0")}`;

      // 시간 추출 및 변환 (예: "18:10" -> 하교: 18:10)
      const timeText = dateText.match(/(\d{2}:\d{2})/);
      if (!timeText) return;
      let departureTime = timeText[0]; // 시간 부분
      const [hour, minute] = departureTime.split(":").map(Number);

      // 시간에 따라 "등교" 또는 "하교"로 변환
      if (hour >= 12) {
        departureTime = `하교: ${departureTime}`;
      } else {
        departureTime = `등교: ${departureTime}`;
      }

      // 예약 날짜와 시간을 Date 객체로 생성 (한국 시간 기준)
      const reservationDate = new Date(
        `${departuredate}T${departureTime.split(":")[1]}:${
          departureTime.split(":")[2]
        }:00+09:00`
      ); // 한국 시간 +9

      // 오늘 날짜와 예약 날짜가 같으면, 시간까지 비교하여 지나지 않은 예약만 반환
      const reservationDateOnly = `${reservationDate.getFullYear()}.${String(
        reservationDate.getMonth() + 1
      ).padStart(2, "0")}.${String(reservationDate.getDate()).padStart(
        2,
        "0"
      )}`;

      // 예약 날짜가 오늘 날짜보다 이후이거나, 오늘 날짜면 시간도 비교하여 지나지 않은 예약만 필터링
      // 예약 시간이 지나지 않았으면 배열에 추가
      if (
        reservationDateOnly > todayDate ||
        (reservationDateOnly === todayDate && reservationDate > now)
      ) {
        reservations.push({
          routeName: routeName,
          departureTime: departureTime,
          seatNumber: seatNumber,
          departuredate: departuredate,
        });
      }
    });

    // 예약 항목이 하나라도 있으면 반환
    return reservations.length ? reservations : null;
  } catch (error) {
    console.error("Error fetching reservation:", error);
    return null;
  }
}

export const ReservationStatus: FC = () => {
  const [reservations, setReservations] = useState<Array<{
    routeName: string;
    departureTime: string;
    seatNumber: string;
    departuredate: string;
  }> | null>(null);
  const [isSwipedDown, setIsSwipedDown] = useState(false);
  const navigate = useNavigate();
  const [showImage, setShowImage] = useState(false);

  const handleTicketClick = () => {
    setShowImage((prev) => !prev); // 클릭할 때마다 이미지 상태를 반전시킴
  };

  const handlers = useSwipeable({
    onSwipedDown: () => {
      setIsSwipedDown(true);
      setTimeout(() => {
        navigate("/MainPage");
      }, 300); // 애니메이션 지속 시간과 동일하게 설정
    },
    preventScrollOnSwipe: true,
    trackMouse: true,
    delta: 2
  });

  useEffect(() => {
    fetchReservation().then((data) => {
      setReservations(data);
    });

    if (isSwipedDown) {
      window.scrollTo(0, 0); // 페이지 맨 위로 스크롤
    }
  }, [isSwipedDown]);

  return (
    <main className={styles.container}>
      <div
        className={`${styles.movePage} ${
          isSwipedDown ? styles.swipedDown : ""
        }`}
        {...handlers}
      >
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/8746e8b4f306405ef2fe1ae0cea531f94bb78c78ef47147a23f5a296136d09d6?placeholderIfAbsent=true"
          alt="Company Logo"
          className={styles.logo}
        />
        <h1 className={styles.title}>예약현황</h1>
      </div>
      {showImage && (
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/0f61db433c249f130fcda82fa5f572c2258531aadcaccbd457170e401bd98d00?placeholderIfAbsent=true"
          alt="Bus Layout"
          className={styles.busLayout}
        />
      )}

      {reservations && reservations.length > 0 ? (
        reservations.map((reservation, index) => (
          <Ticket
            key={index}
            routeName={reservation.routeName}
            departuredate={reservation.departuredate}
            departureTime={reservation.departureTime}
            seatNumber={reservation.seatNumber}
            onClick={handleTicketClick} // Ticket 클릭 시 이미지 보이기
          />
        ))
      ) : (
        <p>예약 정보가 없습니다.</p>
      )}
    </main>
  );
};

export default ReservationStatus;
