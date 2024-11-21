import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const AuthLayout = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 관리

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/login_proc.php", {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data from PHP file");
        }

        const data = await response.json();
        console.log("Fetched Data:", data);

        if (data && data.id) {
          // 세션 ID가 있으면 쿠키 설정
          const phpSessionId = Cookies.get("PHPSESSID");
          if (phpSessionId) {
            Cookies.set("Id", phpSessionId, { secure: true, sameSite: "Lax" });
          }
        } else {
          navigate("/Login", { state: { from: pathname } });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        navigate("/Login", { state: { from: pathname } });
      } finally {
        setIsLoading(false); // 로딩 완료
      }
    };

    const cookieId = Cookies.get("Id");
    if (!cookieId) {
      fetchData(); // 로그인 상태가 아니면 fetchData 호출
    } else {
      setIsLoading(false); // 이미 로그인된 경우 로딩 완료
    }
  }, [navigate, pathname]);

  // 로딩 중에는 Outlet을 렌더링하지 않음
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
