import { FC, useEffect, useState } from "react";
import styles from "./Location.module.css";
import axios from "axios";
import * as cheerio from "cheerio";
import React from "react";
import { Ticket } from "./Ticket.tsx";
import { Map, MapMarker } from "react-kakao-maps-sdk";

// 버스 노선 타입 정의
interface BusRoute {
  location: string;
  value: string;
}

// 버스 노선 목록 (추후 동적으로 변경될 수 있음)
const busRoutes: BusRoute[] = [
  { location: "동래", value: "3" },
  { location: "마산", value: "2" },
  { location: "양산-물금", value: "18" },
  { location: "양산-북정", value: "11" },
  { location: "영도/부산역", value: "7" },
  { location: "울산", value: "12" },
  { location: "장유", value: "10" },
  { location: "진해", value: "9" },
  { location: "창원", value: "8" },
  { location: "창원-마산", value: "21" },
  { location: "하단", value: "4" },
  { location: "해운대", value: "5" },
];

// 처리된 cid 목록을 추적하기 위한 세트
const processedCids = new Set<string>();

// 라우트 목록 가져오기 함수
async function fetchAvailableRoutes(): Promise<string[] | null> {
  try {
    const response = await axios.get("/location/list.php");
    const html = response.data;
    const $ = cheerio.load(html);

    const availableRoutes = $('a').map((_, el) => $(el).text().trim()).get();
    return availableRoutes.length > 0 ? availableRoutes : null;
  } catch (error) {
    console.error("Error fetching available routes:", error);
    return null;
  }
}

// 버스 목록 크롤링 함수
async function fetchBusList(availableRoutes: string[]): Promise<Array<{
  lineCode: string;
  location: string;
  busRoutes: Array<{
    routeName: string;
    departureInfo: string;
    cid: string;
  }>;
}> | null> {
  try {
    const busRoutesList: Array<{
      lineCode: string;
      location: string;
      busRoutes: Array<{
        routeName: string;
        departureInfo: string;
        cid: string;
      }>;
    }> = [];

    // cid 중복 추적을 위한 세트 초기화
    processedCids.clear();

    for (const availableRoute of availableRoutes) {
      // 노선명과 일치하는 route 찾기
      const matchingRoute = busRoutes.find(route =>
          availableRoute.includes(route.location) || route.location.includes(availableRoute)
      );

      if (matchingRoute) {
        const response = await axios.get(`/location/view.php?lineCode=${matchingRoute.value}`);
        const html = response.data;
        const $ = cheerio.load(html);

        const busRoutesForLocation: Array<{
          routeName: string;
          departureInfo: string;
          cid: string;
        }> = [];

        $('a[href^="/location/gps.php?cid="]').each((_, el) => {
          const href = $(el).attr('href');
          const cid = href ? href.split('cid=')[1] : '';

          // 이미 처리된 cid인지 확인
          if (cid && !processedCids.has(cid)) {
            processedCids.add(cid);

            const routeName = $(el).text().trim().split(' ')[0];
            const departureInfo = $(el).find('span').text().trim();

            busRoutesForLocation.push({
              routeName,
              departureInfo,
              cid
            });
          }
        });

        if (busRoutesForLocation.length > 0) {
          busRoutesList.push({
            lineCode: matchingRoute.value,
            location: matchingRoute.location,
            busRoutes: busRoutesForLocation
          });
        }
      }
    }

    return busRoutesList.length ? busRoutesList : null;
  } catch (error) {
    console.error("Error fetching bus list:", error);
    return null;
  }
}

// 버스 위치 타입 정의
interface BusLocation {
  lat: string | null;
  lng: string | null;
  time: string | null;
}

// 개별 버스 위치 크롤링 함수
async function fetchBusLocation(cid: string): Promise<BusLocation | null> {
  try {
    const response = await axios.get(`/location/gps.php?cid=${cid}`);
    const html = response.data;
    const $ = cheerio.load(html);

    const scriptContent = $('script:contains("markers.push")').html();
    if (!scriptContent) {
      console.error("Could not find map script.");
      return null;
    }

    const firstMarkerMatch = scriptContent.match(/new daum\.maps\.LatLng\(([-+]?\d*\.\d+),([-+]?\d*\.\d+)\)/);
    const lat = firstMarkerMatch ? firstMarkerMatch[1] : null;
    const lng = firstMarkerMatch ? firstMarkerMatch[2] : null;

    const timeMatch = scriptContent.match(/title\s*:\s*'([^']+)'/);
    const time = timeMatch ? timeMatch[1] : null;

    return { lat, lng, time };
  } catch (error) {
    console.error("Error fetching bus location:", error);
    return null;
  }
}

export const BusLocationTracker: FC = () => {
  const [busList, setBusList] = useState<Array<{
    lineCode: string;
    location: string;
    busRoutes: Array<{
      routeName: string;
      departureInfo: string;
      cid: string;
    }>;
  }> | null>(null);

  const [selectedBus, setSelectedBus] = useState<{
    cid: string | null;
    location: {
      lat: number;
      lng: number;
      time: string | null;
    } | null;
  }>({
    cid: null,
    location: null
  });

  // 로딩 상태 추가
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadingMessage, setLoadingMessage] = useState<string>("버스 정보를 불러오는 중...");
  const [loadingBusLocation, setLoadingBusLocation] = useState<boolean>(false);

  const handleBusSelect = async (cid: string) => {
    // 이미 선택된 버스를 다시 선택하면 선택 해제
    if (selectedBus.cid === cid) {
      setSelectedBus({ cid: null, location: null });
      return;
    }

    setLoadingBusLocation(true);

    try {
      const location = await fetchBusLocation(cid);
      if (location) {
        setSelectedBus({
          cid,
          location: {
            lat: location.lat ? parseFloat(location.lat) : 35.248694,
            lng: location.lng ? parseFloat(location.lng) : 128.902572,
            time: location.time
          }
        });
      }
    } catch (error) {
      console.error("버스 위치 정보를 가져오는 중 오류 발생:", error);
    } finally {
      setLoadingBusLocation(false);
    }
  };

  useEffect(() => {
    const fetchRoutes = async () => {
      setIsLoading(true);
      setLoadingMessage("버스 정보를 불러오는 중입니다. 인터넷 상태에 따라 30초에서 1분 정도 소요될 수 있습니다.");

      try {
        const availableRoutes = await fetchAvailableRoutes();
        if (availableRoutes) {
          const busListResult = await fetchBusList(availableRoutes);
          console.log("버스 리스트 가져옴:", busListResult); // 디버깅용 로그
          setBusList(busListResult);
        } else {
          console.log("사용 가능한 노선이 없습니다.");
        }
      } catch (error) {
        console.error("버스 정보를 가져오는 중 오류 발생:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRoutes();
  }, []);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (selectedBus.cid) {
      intervalId = setInterval(async () => {
        const location = await fetchBusLocation(selectedBus.cid!);
        if (location) {
          setSelectedBus(prev => ({
            ...prev,
            location: {
              lat: location.lat ? parseFloat(location.lat) : 35.248694,
              lng: location.lng ? parseFloat(location.lng) : 128.902572,
              time: location.time
            }
          }));
        }
      }, 10000); // 10초마다 새로고침
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [selectedBus.cid]);

  // const renderNoDataMessage = () => {
  //   if (!isLoading && (!busList || busList.length === 0)) {
  //     return (
  //         <div className={styles.noDataMessage}>
  //           <p>위치 확인이 가능한 버스가 존재하지않습니다.</p>
  //           <p>다시 시도해주세요.</p>
  //           <button
  //               className={styles.retryButton}
  //               onClick={() => window.location.reload()}
  //           >
  //             새로고침
  //           </button>
  //         </div>
  //     );
  //   }
  //   return null;
  // };

  return (
      <main className={styles.container}>
        <header className={styles.scheduleHeader}>
          <a href="/MainPage">
            <img
                src="\img\icon\arrow-left.png"
                alt="arrow-left"
                className={styles.headerIcon}
            />
          </a>
          <h1 className={styles.title}>버스 현재 위치</h1>
        </header>

        {isLoading && (
            <div className={styles.loadingContainer}>
              <div className={styles.spinner}></div>
              <p className={styles.loadingText}>{loadingMessage}</p>
            </div>
        )}

        {/*{renderNoDataMessage()}*/}

        {loadingBusLocation && (
            <div className={styles.loadingContainer}>
              <div className={styles.spinner}></div>
              <p className={styles.loadingText}>버스 위치를 불러오는 중...</p>
            </div>
        )}

        {!loadingBusLocation && selectedBus.location && (
            <div className={styles.mapContainer}>
              <Map
                  center={{
                    lat: selectedBus.location.lat,
                    lng: selectedBus.location.lng,
                  }}
                  style={{
                    width: "350px",
                    height: "400px",
                    borderRadius: "20px",
                  }}
                  level={3}
              >
                <MapMarker
                    position={{
                      lat: selectedBus.location.lat,
                      lng: selectedBus.location.lng,
                    }}
                >
                  <div
                      style={{
                        color: "#71b3ff",
                        fontSize: "14px",
                        fontWeight: "500",
                        textAlign: "center",
                      }}
                  >
                    {selectedBus.location.time
                        ? `${selectedBus.location.time} 기준 위치`
                        : "위치 정보 없음"}
                  </div>
                </MapMarker>
              </Map>
            </div>
        )}

        {!isLoading && busList && busList.length > 0 && busList.map((route) => (
            <div key={route.lineCode} className={styles.routeSection}>
              <h2 className={styles.routeTitle}>{route.location}</h2>
              {route.busRoutes.length > 0 ? (
                  route.busRoutes.map((bus) => (
                      <div
                          key={bus.cid}
                          className={`${styles.busCard} ${selectedBus.cid === bus.cid ? styles.selectedBusCard : ''}`}
                          onClick={() => handleBusSelect(bus.cid)}
                      >
                        <Ticket
                            routeName={bus.routeName}
                            departureTime={bus.departureInfo}
                        />
                      </div>
                  ))
              ) : (
                  <p className={styles.noBusMessage}>이 노선에 운행 중인 버스가 없습니다.</p>
              )}
            </div>
        ))}
      </main>
  );
};

export default BusLocationTracker;