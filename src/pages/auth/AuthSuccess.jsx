import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { message } from "antd";

const AuthSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      const query = new URLSearchParams(location.search);
      const token = query.get("token");

      if (token) {
        localStorage.setItem("token", token);
        message.destroy();
        message.success("Login Successful");
        navigate("/");
      } else {
        navigate("/auth/login", {
          state: { error: "Authentication failed. Please try again." },
        });
      }
    }, 2000);

    // Cleanup timeout on component unmount
    return () => clearTimeout(timeout);
  }, [location, navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="text-xl font-semibold text-gray-700">Logging in...</div>
    </div>
  );
};

export default AuthSuccess;
