import React, { useEffect } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const AuthLayout = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    // PHP 파일에서 id 값을 가져와 쿠키에 저장하는 함수
    const fetchData = async () => {
      try {
        // PHP 서버에 인증 데이터를 요청
        const response = await fetch("/login_proc.php", {
          method: "GET",
          credentials: "include", // 쿠키 포함해서 요청
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data from PHP file");
        }

        // 서버에서 응답받은 JSON 데이터
        const data = await response.json();
        console.log("Fetched Data:", data); // 서버에서 응답받은 데이터를 확인

        // `id` 데이터가 있다면 쿠키에 저장하고, 없으면 로그인 페이지로 리다이렉트
        if (data && data.id) {
          Cookies.set("id", data.id, { expires: 1 }); // 쿠키 유효 기간을 1일로 설정
        } else {
          // 데이터가 없을 경우 로그인 페이지로 이동
          navigate("/Login", { state: { from: pathname } });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        // 요청 실패 시 로그인 페이지로 이동
        navigate("/Login", { state: { from: pathname } });
      }
    };

    // 쿠키가 존재하지 않으면 fetchData 함수 호출
    const cookieId = Cookies.get("id");
    if (!cookieId) {
      fetchData();
    }
  }, [navigate, pathname]);

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
