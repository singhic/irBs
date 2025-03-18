import React, { useState } from "react";
import FaqData from "react-faq-component";
import styles from "./FAQ.module.css";

function Faq() {
  const [rows, setRowsOption] = useState(null);

  const data1 = {
    title: "예약 및 이용 방법",
    rows: [
      {
        title: "통학버스를 이용하려면 반드시 예약해야 하나요?",
        content: `사전 예약 없이도 남은 좌석(미예약 좌석)이 있는 경우 탑승할 수 있습니다. 입석은 불가능하며, 예약 대기 상태라면 다른 교통수단을 이용해 주세요. 인제대역 순환버스는 예약 없이 무료로 이용 가능합니다.`,
      },
      {
        title: "예약은 언제까지 가능한가요?",
        content:
          "출발 30분 전까지 예약할 수 있습니다. 매주 수요일 0시 이후부터 다음 주 1주일분 예약도 가능합니다.",
      },
      {
        title: "예약 취소는 언제까지 가능하며, 페널티는 어떻게 적용되나요?",
        content: `출발 1시간 이전까지 취소하면 페널티가 부과되지 않습니다. 출발 1시간 이내 취소하거나 예약 후 미탑승하면, 대기자가 있을 경우 페널티가 부과됩니다. 페널티는 1년 주기로 초기화됩니다.`,
      },
      {
        title: "예약 없이 탑승할 수 있나요?",
        content: `남은 좌석이 있는 경우만 예약 없이 탑승 가능합니다. 입석은 허용되지 않습니다.`,
      },
    ],
  };

  const data2 = {
    title: "요금 및 결제",
    rows: [
      {
        title: "통학버스 요금은 어떻게 결제하나요?",
        content: `현금 승차는 불가능하며, 반드시 교통카드(이즐, 신한 제휴 후불교통카드)를 사용해야 합니다. 학생증에도 이즐(캐시비) 기능이 포함되어 있으니 학생증으로도 결제 가능합니다.`,
      },
      {
        title: "후불교통카드는 어떤 카드만 가능한가요?",
        content: `신한카드 제휴 후불교통카드만 이용 가능합니다. 기존에 등록된 다른 교통카드가 있더라도 추가로 등록할 수 있습니다.`,
      },
      {
        title:
          "카드 결제 시 '사용할 수 없는 카드입니다'라는 메시지가 나옵니다.",
        content: `새로 구입한 교통카드가 단말기에서 인식되지 않을 수 있습니다. 이 경우, 일단 승차 후 통학버스 사무실(☎327-0625)로 문의하거나 방문해 주세요.`,
      },
    ],
  };
  const data3 = {
    title: "운행 노선 및 시간표",
    rows: [
      {
        title: "통학버스의 운행 노선은 어떻게 되나요?",
        content: `부산지역(동래, 하단, 영도/부산역, 해운대), 경남지역(양산, 마산, 창원, 진해, 장유, 인제대역), 울산지역(공업탑, 신복로터리) 노선이 운행됩니다. 자세한 정보는 학교홈페이지[원클릭서비스/재학생/통학버스]를 참조해 주세요.`,
      },
      {
        title: "하교 승차장소는 어디인가요?",
        content: `A동 승강장: 동래, 영도/부산역, 하단, 해운대, 양산, 인제대역 노선\n운동장 위 승강장: 마산, 창원, 진해, 장유, 울산 노선`,
      },
    ],
  };
  const data4 = {
    title: "페널티 및 정책",
    rows: [
      {
        title: "페널티는 어떻게 부과되나요?",
        content: `대기자가 있는 차량에 예약 후 미탑승하거나 출발 1시간 이내 예약 취소 시 페널티가 부과됩니다. 페널티는 1회(주의), 2회(경고), 3회(3일간 이용 정지 후 미납 요금 정산 시 해지)로 단계별 적용됩니다.`,
      },
      {
        title: "페널티는 언제 초기화되나요?",
        content: `페널티는 1년 주기로 초기화됩니다.`,
      },
    ],
  };
  const data5 = {
    title: "기타",
    rows: [
      {
        title: "통학버스에서 물품을 분실했을 때 어디로 연락해야 하나요?",
        content: `통학버스 사무실(☎327-0625)로 연락하거나 예약 시스템 게시판에 글을 남겨주시면 확인 후 답변 드립니다.`,
      },
      {
        title: "오늘 탑승했는데 미탑승으로 나옵니다. 어떻게 해야 하나요?",
        content: `탑승 데이터가 반영되는 데 2일 정도 소요됩니다. 탑승 기록이 확인되기 전에는 미탑승으로 표시될 수 있지만 페널티는 적용되지 않습니다.`,
      },
      {
        title: "후불교통카드를 다른 카드와 함께 등록할 수 있나요?",
        content: `네, 가능합니다. 기존에 등록된 교통카드 외에 후불교통카드를 추가 등록할 수 있습니다.`,
      },
    ],
  };
  // 스타일 추가
  const faqStyles = {
    bgColor: "white",
    titleTextColor: "black",
    rowTitleColor: "black",
    rowContentColor: "grey",
    arrowColor: "black",
  };

  const headerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "33%",
    padding: "20px",
  };

  const iconStyle = {
    width: "24px",
    height: "24px",
  };

  const titleStyle = {
    margin: 0,
  };

  return (
    <div>
      <div style={headerStyle}>
        <a href="/MainPage">
          <img
            id="icon"
            src="/img/icon/big-arrow-left.svg"
            alt="뒤로가기 아이콘"
            style={iconStyle}
          />
        </a>
        <h2 style={titleStyle}>My FAQ&apos;s</h2>
      </div>
      <div className="faq-style-wrapper">
        <FaqData
          data={data1}
          styles={faqStyles}
          getRowOptions={setRowsOption}
        />
        <FaqData
          data={data2}
          styles={faqStyles}
          getRowOptions={setRowsOption}
        />
        <FaqData
          data={data3}
          styles={faqStyles}
          getRowOptions={setRowsOption}
        />
        <FaqData
          data={data4}
          styles={faqStyles}
          getRowOptions={setRowsOption}
        />
        <FaqData
          data={data5}
          styles={faqStyles}
          getRowOptions={setRowsOption}
        />
      </div>
    </div>
  );
}

export default Faq;
