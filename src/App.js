import React, { Suspense, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';

import MainPage from './components/Main/MainPage/MainPage.tsx';
import BusSchedule from './components/Main/BusSchedule/BusSchedule.tsx';
import SeatMap from './components/Main/SeatMap/SeatSelection.tsx';
import Reservations from './components/Main/Reservations/ReservationStatus.tsx';

import Mypage from './components/Members/MyPage/MyPage.tsx';
import UserProfile from './components/Members/UserProfile/UserProfile.tsx';
import FAQ from './components/Members/FAQ/FAQ.tsx';

import Login from './components/Auth/Login/LoginPage.tsx';
import PasswordReset from './components/Auth/PasswordReset/PasswordReset.tsx';
import Signup from './components/Auth/Signup/Signup.tsx';

import Onboarding from './components/StartMap/Onboarding/OnboardingPage.tsx';
import Onboarding1 from './components/StartMap/Onboarding1/Onboarding1.tsx';
import Penalty from './components/StartMap/PenaltySystem/PenaltySystem.tsx';
import Onboarding2 from './components/StartMap/Onboarding2/Onboarding2.tsx';

function App() {
  const containerRef = useRef(null);

    const scaleContainer = () => {
        if (containerRef.current) {
            // 화면 크기에 맞춰 scale 조정
            const scaleX = window.innerWidth / 360;
            const scaleY = window.innerHeight / 740;
            const scale = Math.min(scaleX, scaleY, 1); // 최대 배율을 1로 제한하여 스크롤 방지

            containerRef.current.style.transform = `scale(${scale})`;
            containerRef.current.style.transformOrigin = 'top left';

            // 상단 고정 및 수평 중앙 배치를 위한 left 계산
            const left = (window.innerWidth - 360 * scale) / 2;

            containerRef.current.style.position = 'absolute';
            containerRef.current.style.left = `${left}px`;
            containerRef.current.style.top = `0px`; // 상단에 고정
        }
    };

    useEffect(() => {
        scaleContainer();
        window.addEventListener('resize', scaleContainer);
        return () => window.removeEventListener('resize', scaleContainer);
    }, []);

  return (
    <Router>
      <div
            ref={containerRef}
            className="container" // 스타일은 index.css나 App.css에 추가 가능
        >
      <div className="App">
        <main>
          <Suspense fallback={<div>로딩중...</div>}>

            <Routes>
              <Route path="/MainPage" element={<MainPage />} />
              <Route path="/BusSchedule" element={<BusSchedule />} />
              <Route path="/SeatMap" element={<SeatMap />} />
              <Route path="/Reservations" element={<Reservations />} />

              <Route path="/MyPage" element={<Mypage />} />
              <Route path="/UserProfile" element={<UserProfile />} />
              <Route path="/FAQ" element={<FAQ />} />

              <Route path="/Login" element={<Login />} />
              <Route path="/PasswordReset" element={<PasswordReset />} />
              <Route path="/Signup" element={<Signup />} />

              <Route path="/Onboarding" element={<Onboarding />} />
              <Route path="/Onboarding1" element={<Onboarding1 />} />
              <Route path="/Penalty" element={<Penalty />} />
              <Route path="/Onboarding2" element={<Onboarding2 />} />
            </Routes>
          </Suspense>
        </main>
      </div>
      </div>
    </Router>
  );
}

export default App;