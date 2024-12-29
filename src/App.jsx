import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "@/pages/home/index";
import Login from "@/pages/auth/Login";
import AuthSuccess from "@/pages/auth/AuthSuccess";
import ProtectedRoute from "@/components/ProtectedRoute";
import PublicRoute from "@/components/PublicRoute";
import DefaultLayout from "@/layouts/DefaultLayout";
import BatchSelection from "@/pages/auth/BatchSelection";
import { useSelector } from "react-redux";
import Loading from "@/components/Loading";
import Internships from "@/pages/internships/index";
import Notifications from "@/pages/notifications/index";
import Profile from "@/pages/profile/index";
import CVUpload from "@/pages/cv-upload/index";

const App = () => {
  const { loading } = useSelector((state) => state.alerts);

  return (
    <BrowserRouter>
      {loading ? (
        <Loading />
      ) : (
        <Routes>
          <Route
            element={
              <ProtectedRoute>
                <DefaultLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/" element={<HomePage />} />
            <Route path="/internships" element={<Internships />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/cv/upload" element={<CVUpload />} />
          </Route>

          <Route
            path="/auth/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          <Route path="/auth/success" element={<AuthSuccess />} />
          <Route path="/batch/selection" element={<BatchSelection />} />
        </Routes>
      )}
    </BrowserRouter>
  );
};

export default App;
