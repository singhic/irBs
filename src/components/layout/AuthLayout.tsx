import React, { useEffect } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const AuthLayout = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

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
          Cookies.set("id", data.id, {
            secure: true,
            sameSite: "lax",
          });
        } else {
          navigate("/Login", { state: { from: pathname } });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        navigate("/Login", { state: { from: pathname } });
      }
    };

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
