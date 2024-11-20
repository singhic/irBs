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
  cancel_num: string;
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
      cancel_num: string;
    }> = [];

    reservationElements.each((index, element) => {
      const dateText = $(element).find("h2").text().trim();
      const routeNameText = $(element).find("p").first().text().trim();
      const seatInfo = $(element).find("p").eq(1).text().trim();

      const routeNameMatch = routeNameText.match(/노선\s*:\s*([가-힣]+)/);
      if (!routeNameMatch) return;
      const routeName = routeNameMatch[1];

      const seatNumberMatch = seatInfo.match(/(\d+)번/);
      if (!seatNumberMatch) return;
      const seatNumber = seatNumberMatch[1];

      const dateTextMatch = dateText.match(/(\d{1,2})-(\d{1,2})/);
      if (!dateTextMatch) return;
      const [_, month, day] = dateTextMatch;

      const now = new Date();
      let year = now.getFullYear();
      if (Number(month) < now.getMonth() + 1) year += 1;

      const departuredate = `${year}.${String(month).padStart(2, "0")}.${String(
        day
      ).padStart(2, "0")}`;

      const timeTextMatch = dateText.match(/(\d{2}:\d{2})/);
      if (!timeTextMatch) return;
      const departureTime = timeTextMatch[1];

      const fnCancelCall = $(element)
        .find('a[onclick*="fnCancel"]')
        .attr("onclick");
      const cancelNumMatch = fnCancelCall?.match(/fnCancel\((\d+),/);
      const cancel_num = cancelNumMatch ? cancelNumMatch[1] : null;

      if (!cancel_num) return;

      reservations.push({
        routeName,
        departureTime,
        seatNumber,
        departuredate,
        cancel_num,
      });
    });

    return reservations.length ? reservations : null;
  } catch (error) {
    console.error("Error fetching reservation:", error);
    return null;
  }
}

const cancel = async () => {
  const reservations = await fetchReservation();
  if (!reservations || reservations.length === 0) {
    alert("취소 가능한 예약이 없습니다.");
    return;
  }

  // 예약 리스트 렌더링 예시
  reservations.forEach((reservation) => {
    console.log(
      `노선: ${reservation.routeName}, 시간: ${reservation.departureTime}, 좌석: ${reservation.seatNumber}, 취소 번호: ${reservation.cancel_num}`
    );
  });

  // 특정 예약을 선택해 취소 (예시로 첫 번째 예약을 취소)
  const cancel_num = reservations[0].cancel_num;
  if (!cancel_num) {
    alert("해당 예약에 대한 취소 번호가 없습니다.");
    return;
  }

  const isConfirmed = window.confirm(`예약을 취소하시겠습니까?`);

  // 사용자가 예약을 확인하지 않은 경우
  if (!isConfirmed) {
    alert("예약이 취소되었습니다.");
    return;
  }

  const cancel_post = new URLSearchParams();
  cancel_post.append("seq", cancel_num);

  console.log(cancel_num);

  try {
    const response = await axios.post("/reserve/cancel_proc.php", cancel_post, {
      headers: {
        "Content-Type": `application/x-www-form-urlencoded`,
        Accept: "application/json",
        "Access-Control-Allow-Origin": `/reserve/cancel_proc.php`,
        "Access-Control-Allow-Credentials": "true",
      },
    });

    // 예약 성공 시
    if (response.status === 200 && response.data.status === "success") {
      alert(response.data.message);
      window.location.reload(); // 새로고침
    } else {
      // 예약 실패 시
      alert(response.data.message);
    }
  } catch (error) {
    console.error("Error:", error);
    alert("네트워크 오류가 발생했습니다. 다시 시도해주세요.");
  }
};

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
    delta: 2,
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
            onClick2={cancel}
          />
        ))
      ) : (
        <p>예약 정보가 없습니다.</p>
      )}
    </main>
  );
};

export default ReservationStatus;
