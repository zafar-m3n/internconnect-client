import React, { useState, useEffect } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import { useNavigate } from "react-router-dom";
const { Dragger } = Upload;

const CVUpload = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const tips = [
    {
      key: "Customize Your CV",
      text: "Tailor your CV to the job you are applying for. Highlight relevant experience and skills that align with the job description.",
    },
    {
      key: "Keep It Concise",
      text: "Limit your CV to one or two pages. Only include information that is relevant to the job.",
    },
    {
      key: "Quantify Achievements",
      text: "Where possible, add numbers to your achievements. For example, 'increased sales by 20%' or 'managed a team of 10'.",
    },
    {
      key: "Proofread",
      text: "Always proofread your CV multiple times for spelling and grammar errors. Consider having a friend or a mentor review it as well.",
    },
    {
      key: "Use a Professional Format",
      text: "Choose a clean and professional format for your CV. Use a readable font and clear headings.",
    },
  ];

  const props = {
    name: "file",
    action: `${import.meta.env.VITE_INTERNCONNECT_API_BASE_URL}/api/v1/upload/upload`,
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: { userId: user.id },
    onChange(info) {
      const { status } = info.file;
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
        navigate("/profile");
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    accept: ".pdf",
    beforeUpload(file) {
      const isPdf = file.type === "application/pdf";
      if (!isPdf) {
        message.error("You can only upload a single PDF file.");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error("CV must be less than 2MB.");
      }
      return isPdf && isLt2M;
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setCurrentTipIndex((prevIndex) => (prevIndex + 1) % tips.length);
        setIsFading(false);
      }, 500);
    }, 2000);

    return () => clearInterval(intervalId);
  }, [tips.length]);

  return (
    <>
      <h2 className="text-center text-blue-900 font-semibold text-2xl mb-4">Upload your CV</h2>
      <div className="cv-tips">
        <h3 className="text-blue-950 font-semibold text-lg mb-3">CV Improvement Tips</h3>
        <ul className="list-none p-0 relative">
          <li
            key={tips[currentTipIndex].key}
            className={`bg-white mb-3 p-4 border-l-4 border-l-blue-600 rounded-md shadow-sm transition-opacity duration-500 ${
              isFading ? "opacity-0" : "opacity-100"
            }`}
          >
            <div className="tip">
              <strong className="text-blue-800">{tips[currentTipIndex].key}:</strong> {tips[currentTipIndex].text}
            </div>
          </li>
        </ul>
      </div>
      <div className="upload-section bg-white p-6 rounded-lg shadow-md flex justify-center items-center mt-6">
        <Dragger {...props} className="w-full">
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text text-gray-700">Click or drag your CV to this area to upload</p>
          <p className="ant-upload-hint text-gray-500">Your CV must be in PDF format and less than 2MB.</p>
        </Dragger>
      </div>
    </>
  );
};

export default CVUpload;
