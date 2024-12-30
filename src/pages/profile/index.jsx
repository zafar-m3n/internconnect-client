import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { formatName } from "@/utils/formatName";
import { formatCB } from "@/utils/formatCB";
import { message } from "antd";
import API from "@/services";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [cv, setCv] = useState(null);

  const statusColors = {
    pending: "yellow",
    approved: "green",
    rejected: "red",
  };

  const getCV = async () => {
    try {
      const response = await API.private.getCV();
      if (response.statusText === "OK") {
        setCv(response.data);
      }
    } catch (error) {
      message.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getCV();
  }, []);

  const onClick = () => {
    navigate("/cv/upload");
  };

  return (
    <div className="flex h-screen space-x-6">
      <div className="flex flex-col w-2/5 space-y-6">
        <section className="bg-white rounded shadow p-6">
          <div className="flex space-x-4 items-center">
            <img src={user?.profilePic} alt="User Profile Pic" className="w-24 h-24 object-cover rounded-full mb-4" />
            <div>
              <h4 className="text-xl font-bold text-blue-950">{formatName(user?.name)}</h4>
              <p className="text-blue-700 font-medium">
                {formatCB(user?.email)} | {user.batchCode}
              </p>
              <Button size="sm" variant="outline" className="mt-4" onClick={onClick}>
                {cv ? "Update CV" : "Upload CV"}
              </Button>
            </div>
          </div>
        </section>
        <section className="bg-white rounded shadow p-6">
          <h4 className="text-xl font-semibold mb-4">Applied Jobs</h4>
          <ul className="space-y-2">
            <li className="flex items-center justify-between">
              <span className="font-medium text-gray-800">WSO2</span>
              <span className="text-gray-600">Software Engineering Intern</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="font-medium text-gray-800">WSO2</span>
              <span className="text-gray-600">UI/UX Intern</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="font-medium text-gray-800">Virtusa</span>
              <span className="text-gray-600">Software Engineering Intern</span>
            </li>
          </ul>
        </section>
      </div>
      <div className="w-3/5 bg-white rounded shadow p-6 flex flex-col h-full">
        <h4 className="text-xl font-bold mb-2">CV Preview</h4>
        {cv ? (
          <div className="flex-grow overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <p className="text-blue-700 font-medium">{cv.filename}</p>
              <Badge text={cv.status} color={statusColors[cv.status]} className="capitalize" />
            </div>
            <iframe
              src={`${import.meta.env.VITE_INTERNCONNECT_API_BASE_URL}/${cv.path}`}
              title="CV Preview"
              className="w-full h-full border rounded"
            ></iframe>
          </div>
        ) : (
          <p className="text-gray-500 text-center">No CV uploaded yet.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
