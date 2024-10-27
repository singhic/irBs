import React, { Suspense } from 'react';
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
  return (
    <Router>
      <div className="App">
        <main>
          <Suspense fallback={<div>로딩중...</div>}>
            <ul>
              <li>
                <Link to={'/MainPage'}>메인페이지</Link>
              </li>
              <li>
                <Link to={'/BusSchedule'}>스케줄</Link>
              </li>
              <li>
                <Link to={'/SeatMap'}>좌석 현황</Link>
              </li>
              <li>
                <Link to={'/Reservations'}>예약 내역</Link>
              </li>

              <li>
                <Link to={'/MyPage'}>마이 페이지</Link>
              </li>
              <li>
                <Link to={'/UserProfile'}>내 정보 수정</Link>
              </li>
              <li>
                <Link to={'/FAQ'}>자주 묻는 질문</Link>
              </li>

              <li>
                <Link to={'/Login'}>로그인</Link>
              </li>
              <li>
                <Link to={'/PasswordReset'}>비밀번호 리셋</Link>
              </li>
              <li>
                <Link to={'/Signup'}>회원가입</Link>
              </li>

              <li>
                <Link to={'/Onboarding'}>시작하기1</Link>
              </li>
              <li>
                <Link to={'/Onboarding1'}>시작하기2</Link>
              </li>
              <li>
                <Link to={'/Penalty'}>패널티 시스템</Link>
              </li>
              <li>
                <Link to={'/Onboarding2'}>시작하기3</Link>
              </li>
            </ul>

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
    </Router>
  );
}

export default App;