import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import MainPage from "./components/Main/MainPage/MainPage.tsx";
import BusSchedule from "./components/Main/BusSchedule/BusSchedule.tsx";
import SeatMap from "./components/Main/SeatMap/SeatSelection.tsx";
import Reservations from "./components/Main/Reservations/ReservationStatus.tsx";
import Notification from "./components/Main/Notification/NotificationList.tsx";

import LoginPage from "./components/Auth/Login/LoginPage.tsx";
import PasswordReset from "./components/Auth/PasswordReset/PasswordReset.tsx";
import Signup from "./components/Auth/Signup/Signup.tsx";

import Mypage from "./components/Members/MyPage/MyPage.tsx";
import UserProfile from "./components/Members/UserProfile/UserProfile.tsx";
import FAQ from "./components/Members/FAQ/FAQ.tsx";

import OnboardingPage from "./components/StartMap/Onboarding/OnboardingPage.tsx";
import Onboarding1 from "./components/StartMap/Onboarding1/Onboarding1.tsx";
import Onboarding2 from "./components/StartMap/Onboarding2/Onboarding2.tsx";
import Onboarding3 from "./components/StartMap/Onboarding3/Onboarding3.tsx";

import BookingList from "./components/List/Booking/RecentBookings.tsx";

import AuthLayout from "./components/layout/AuthLayout.tsx";
import PublicLayout from "./components/layout/PublicLayout.tsx";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/Login" />} />
        <Route element={<PublicLayout />}>
          <Route path="/Onboarding" element={<OnboardingPage />} />
          <Route path="/Onboarding1" element={<Onboarding1 />} />
          <Route path="/Onboarding2" element={<Onboarding2 />} />
          <Route path="/Onboarding3" element={<Onboarding3 />} />

          <Route path="/Login" element={<LoginPage />} />
          <Route path="/PasswordReset" element={<PasswordReset />} />
          <Route path="/Signup" element={<Signup />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/MainPage" element={<MainPage />} />
          <Route path="/Notification" element={<Notification />} />
          <Route path="/BusSchedule" element={<BusSchedule />} />
          <Route path="/SeatMap" element={<SeatMap />} />
          <Route path="/Reservations" element={<Reservations />} />

          <Route path="/MyPage" element={<Mypage />} />
          <Route path="/UserProfile" element={<UserProfile />} />
          <Route path="/FAQ" element={<FAQ />} />

          <Route path="/BookingList" element={<BookingList />} />
        </Route>

        <Route path="*" element={<Navigate to="/MainPage" />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
