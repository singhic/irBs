import React, { useState, useEffect } from "react";
import styles from "./MainPage.module.css";
import axios from "axios";

interface setWeatherProps {
  description: string;
  icon: string;
  temp: number;
  name: string;
}

const weatherDescKo: { [key: number]: string } = {
  201: "가벼운 비를 동반한 천둥구름",
  200: "비를 동반한 천둥구름",
  202: "폭우를 동반한 천둥구름",
  210: "약한 천둥구름",
  211: "천둥구름",
  212: "강한 천둥구름",
  221: "불규칙적 천둥구름",
  230: "약한 연무를 동반한 천둥구름",
  231: "연무를 동반한 천둥구름",
  232: "강한 안개비를 동반한 천둥구름",
  300: "가벼운 안개비",
  301: "안개비",
  302: "강한 안개비",
  310: "가벼운 적은비",
  311: "적은비",
  312: "강한 적은비",
  313: "소나기와 안개비",
  314: "강한 소나기와 안개비",
  321: "소나기",
  500: "약한 비",
  501: "중간 비",
  502: "강한 비",
  503: "매우 강한 비",
  504: "극심한 비",
  511: "우박",
  520: "약한 소나기 비",
  521: "소나기 비",
  522: "강한 소나기 비",
  531: "불규칙적 소나기 비",
  600: "가벼운 눈",
  601: "눈",
  602: "강한 눈",
  611: "진눈깨비",
  612: "소나기 진눈깨비",
  615: "약한 비와 눈",
  616: "비와 눈",
  620: "약한 소나기 눈",
  621: "소나기 눈",
  622: "강한 소나기 눈",
  701: "박무",
  711: "연기",
  721: "연무",
  731: "모래 먼지",
  741: "안개",
  751: "모래",
  761: "먼지",
  762: "화산재",
  771: "돌풍",
  781: "토네이도",
  800: "구름 한 점 없는 맑은 하늘",
  801: "약간의 구름이 낀 하늘",
  802: "드문드문 구름이 낀 하늘",
  803: "구름이 거의 없는 하늘",
  804: "구름으로 뒤덮인 흐린 하늘",
  900: "토네이도",
  901: "태풍",
  902: "허리케인",
  903: "한랭",
  904: "고온",
  905: "바람부는",
  906: "우박",
  951: "바람이 거의 없는",
  952: "약한 바람",
  953: "부드러운 바람",
  954: "중간 세기 바람",
  955: "신선한 바람",
  956: "센 바람",
  957: "돌풍에 가까운 센 바람",
  958: "돌풍",
  959: "심각한 돌풍",
  960: "폭풍",
  961: "강한 폭풍",
  962: "허리케인",
};

const WeatherComponent = ({
  cityName = "Gimhae",
  lat = 35.245,
  lon = 128.9043,
}) => {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [error, setError] = useState<string | null>(null); // 에러 상태 추가

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const apiKey = process.env.REACT_APP_OPEN_WEATHER_API_KEY;
        if (!apiKey) {
          throw new Error("API 키가 설정되지 않았습니다.");
        }
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
        );
        console.log(res);
        const weatherId = res.data.weather[0].id;
        const description = weatherDescKo[weatherId] || "날씨 정보 없음";
        const icon = `http://openweathermap.org/img/wn/${res.data.weather[0].icon}@2x.png`;
        const temp = Math.round(res.data.main.temp);

        setWeather({ description, icon, temp, name: res.data.name });
      } catch (err) {
        console.error("날씨 정보 요청 중 오류:", err);
        setError(err.message || "날씨 정보를 가져오는 중 오류가 발생했습니다."); // 에러 메시지 설정
        setWeather(null); // 에러 발생 시 weather 상태 초기화
      }
    };

    fetchWeather();
  }, [lat, lon]); // lat, lon이 변경될 때마다 API 요청

  if (error) {
    return <div>오류: {error}</div>;
  }

  if (!weather) {
    return <div>날씨 정보를 불러오는 중입니다.</div>;
  }

  return (
    <div>
      <p className={styles.weatherStatus}>
        금일 김해캠퍼스 날씨는 {weather.description}입니다.
      </p>
      <img
        src={weather.icon}
        alt={weather.description}
        className={styles.weatherIcon}
      />
    </div>
  );
};

export default WeatherComponent;
