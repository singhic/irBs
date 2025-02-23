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
import Location from "./components/Main/Location/Location.tsx";

import LoginPage from "./components/Auth/Login/LoginPage.tsx";
import PasswordReset from "./components/Auth/PasswordReset/PasswordReset.tsx";
import Signup from "./components/Auth/Signup/Signup.tsx";

import Mypage from "./components/Members/MyPage/MyPage.tsx";
import UserProfile from "./components/Members/UserProfile/UserProfile.tsx";
import UserDelection from "./components/Members/UserProfile/UserDelection.tsx"
import FAQ from "./components/Members/FAQ/FAQ.tsx";

// 처음이신가요 페이지 삭제

import BookList from "./components/List/Booking/RecentBookings.tsx";
import PenaltyList from "./components/List/Penalty/RecentPenalties.tsx";
import MannerList from "./components/List/Manner/MannerHistory.tsx";
import Inquiry from "./components/List/Inquiry/InquiryForm.tsx";
import InquiryList from "./components/List/InquiryList/InquiryList.tsx";

import AuthLayout from "./components/layout/AuthLayout.tsx";
import PublicLayout from "./components/layout/PublicLayout.tsx";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/Login" />} />
        <Route element={<PublicLayout />}>
          {/* 처음이신가요 페이지 삭제  */}

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
          <Route path="/Location" element={<Location />} />

          <Route path="/MyPage" element={<Mypage />} />
          <Route path="/UserProfile" element={<UserProfile />} />
          <Route path="/UserDelection" element={<UserDelection />} />
          <Route path="/FAQ" element={<FAQ />} />

          <Route path="/BookList" element={<BookList />} />
          <Route path="/PenaltyList" element={<PenaltyList />} />
          <Route path="/MannerList" element={<MannerList />} />
          <Route path="/Inquiry" element={<Inquiry />} />
          <Route path="/InquiryList" element={<InquiryList />} />
        </Route>

        <Route path="*" element={<Navigate to="/MainPage" />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
