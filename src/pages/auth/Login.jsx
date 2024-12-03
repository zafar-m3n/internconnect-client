import React from "react";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "@/redux/features/alertSlice";
import { message } from "antd";

const Login = () => {
  const dispatch = useDispatch();

  const performLogin = async () => {
    try {
      dispatch(showLoading());
      window.location.href = `${
        import.meta.env.VITE_INTERNCONNECT_API_BASE_URL
      }/api/v1/auth/microsoft`;
      dispatch(hideLoading());
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("An error occurred. Please try again later.");
    }
  };

  return (
    <div>
      <header className="bg-[#19376d] text-center text-[#a5d7e8] py-4 px-8 flex items-center">
        <img src="/images/logo.png" alt="logo" className="h-[100px] mr-5" />
        <h1 className="text-2xl font-bold">APIIT InternConnect</h1>
      </header>

      <div
        className="flex flex-col justify-center items-center bg-cover bg-center bg-no-repeat py-5 px-5"
        style={{ backgroundImage: 'url("/images/internship.jpg")' }}
      >
        <div className="bg-[#a5d7e8] bg-opacity-90 w-4/5 lg:w-2/3 xl:w-1/2 rounded-lg p-6 mb-6 font-semibold text-[#19376d] text-center">
          <p>
            <strong>Dear Students,</strong>
          </p>
          <p>
            Click on "STUDENTS’ OFFICE 365 EDUCATION LOGIN" button to log in to
            the LMS.
          </p>
          <p>
            If you cannot remember the password, go to&nbsp;
            <a
              href="https://www.office.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600"
            >
              www.office.com
            </a>
            &nbsp;and get it recovered with the "FORGOT PASSWORD" option.
          </p>
          <p>Please use the chat window to contact ICT department.</p>
        </div>

        <div className="bg-[#a5d7e8] bg-opacity-90 w-4/5 lg:w-2/3 xl:w-1/2 rounded-lg p-6 mb-6 font-semibold text-[#19376d]">
          <p>Cookies must be enabled in your browser</p>
          <p>Log into your InternConnect account via:</p>
          <button
            onClick={performLogin}
            className="bg-[#007bff] text-white py-2 px-4 rounded-md hover:bg-[#0056b3] flex items-center justify-center mx-auto my-4 transition duration-150"
          >
            <img src="/images/office_logo.png" alt="" className="mr-3" />
            MICROSOFT OFFICE 365 LOGIN
          </button>
        </div>

        <div className="bg-[#a5d7e8] bg-opacity-90 w-4/5 lg:w-2/3 xl:w-1/2 rounded-lg p-6 mb-6 font-semibold text-[#19376d]">
          <h3 className="text-lg font-light">Is this your first time here?</h3>
          <p>
            Students may get their password by logging in to&nbsp;
            <a
              href="https://www.office.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600"
            >
              www.office.com
            </a>
            .
          </p>
        </div>
      </div>

      <footer className="bg-[#19376d] text-center text-[#a5d7e8] py-4">
        <p className="text-lg font-semibold">
          All rights reserved 2024 | APIIT ICT Department | E - it@apiit.lk | T
          - Colombo City Campus 0117675120/123 , Law School 0117675216 | W -
          www.apiit.lk
        </p>
      </footer>
    </div>
  );
};

export default Login;
