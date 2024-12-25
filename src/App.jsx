import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "@/pages/home/index";
import Login from "@/pages/auth/Login";
import AuthSuccess from "@/pages/auth/AuthSuccess";
import ProtectedRoute from "@/components/ProtectedRoute";
import PublicRoute from "@/components/PublicRoute";
import { useSelector } from "react-redux";
import Loading from "@/components/Loading";
import BatchSelection from "@/pages/auth/BatchSelection";

const App = () => {
  const { loading } = useSelector((state) => state.alerts);

  return (
    <BrowserRouter>
      {loading ? (
        <Loading />
      ) : (
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
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
