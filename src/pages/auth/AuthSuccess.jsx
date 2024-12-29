import React, { useEffect } from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { hideLoading, showLoading } from "@/redux/features/alertSlice";
import { setUser } from "@/redux/features/userSlice";
import API from "@/services/index";

const AuthSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const getUser = async () => {
    try {
      dispatch(showLoading());
      const response = await API.private.getUserData({
        token: localStorage.getItem("token"),
      });
      dispatch(hideLoading());
      if (response.data.success) {
        dispatch(setUser(response.data.data));
        const userData = response.data.data;

        // Check if the user is an admin
        if (!userData.isAdmin && userData.batchCode === "CBXXXXXX") {
          navigate("/batch/selection");
        } else {
          navigate("/");
        }
      } else {
        <Navigate to="/auth/login" />;
        localStorage.clear();
      }
    } catch (error) {
      localStorage.clear();
      dispatch(hideLoading());
      console.log(error);
    }
  };

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const token = query.get("token");

    if (token) {
      localStorage.setItem("token", token);

      message.destroy();
      message.success("Login Successful");
      if (!user) {
        getUser();
      }
    } else {
      navigate("/auth/login", {
        state: { error: "Authentication failed. Please try again." },
      });
    }
  }, [location, navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="text-xl font-semibold text-gray-700">Logging in...</div>
    </div>
  );
};

export default AuthSuccess;
