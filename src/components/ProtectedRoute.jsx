import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { hideLoading, showLoading } from "@/redux/features/alertSlice";
import { setUser } from "@/redux/features/userSlice";
import API from "@/services/index";

export default function ProtectedRoute({ children }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const getUser = async () => {
      try {
        dispatch(showLoading());
        const response = await API.private.getUserData({
          token: localStorage.getItem("token"),
        });
        dispatch(hideLoading());
        if (response.data.success) {
          const userData = response.data.data;
          localStorage.setItem("user", JSON.stringify(userData));
          dispatch(setUser(userData));
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
    if (!user) {
      getUser();
    }
  }, [user, dispatch]);

  if (localStorage.getItem("token")) {
    return children;
  } else {
    return <Navigate to="/auth/login" />;
  }
}
