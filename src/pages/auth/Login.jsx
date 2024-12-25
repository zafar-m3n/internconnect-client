import React from "react";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "@/redux/features/alertSlice";
import { message } from "antd";
import Logo from "@/assets/logo.png";

const Login = () => {
  const dispatch = useDispatch();

  const performLogin = async () => {
    try {
      dispatch(showLoading());
      window.location.href = `${import.meta.env.VITE_INTERNCONNECT_API_BASE_URL}/api/v1/auth/microsoft`;
      dispatch(hideLoading());
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="w-1/2 bg-blue-50 h-screen flex flex-col justify-start items-start p-10">
        <img src={Logo} alt="logo" className="h-32 mb-6" />
        <h1 className="text-3xl font-bold text-blue-900 mb-4">InternConnect</h1>
        <p className="text-lg text-gray-700 max-w-xl">
          Your one-stop platform for managing internships, connecting with opportunities, and enhancing your learning
          experience.
        </p>
      </div>
      <div className="w-1/2 bg-slate-50 h-screen flex flex-col justify-center items-center">
        <div className="bg-white shadow-sm rounded-lg w-[30rem] p-6">
          <h2 className="text-2xl font-bold text-center text-blue-900">Welcome</h2>
          <p className="text-center text-gray-400 mb-4">Login with your student email to continue to InternConnect.</p>

          <div className="bg-gray-100/15 text-gray-600 rounded text-sm p-4 space-y-2">
            <p>Click on "STUDENTS' OFFICE 365 EDUCATION LOGIN" to log in to LMS.</p>
            <p>
              If you cannot remember the password, go to{" "}
              <a
                href="https://www.office.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                www.office.com
              </a>{" "}
              and use the "FORGOT PASSWORD" option.
            </p>
            <p>Ensure cookies are enabled in your browser.</p>
          </div>

          <button
            onClick={performLogin}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full mt-4"
          >
            STUDENTS' OFFICE 365 EDUCATION LOGIN
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
