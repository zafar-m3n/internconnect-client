import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { formatName } from "@/utils/formatName";
import { formatCB } from "@/utils/formatCB";
import { useSelector } from "react-redux";
import { message } from "antd";
import API from "@/services";
import Button from "@/components/ui/Button";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [cv, setCv] = useState(null);

  const statusColors = {
    pending: "text-yellow-500",
    approved: "text-green-500",
    rejected: "text-red-500",
  };

  const getCV = async () => {
    try {
      const response = await API.private.getCV();
      if (response.data.data) {
        setCv(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching CV:", error.response);
      message.error("An error occurred while fetching the CV.");
    }
  };

  useEffect(() => {
    getCV();
  }, []);

  const onClick = () => {
    navigate("/cv/upload");
  };

  return (
    <div className="grid grid-cols-12 grid-rows-2 gap-6">
      <section className="col-span-4 bg-white rounded shadow p-6">
        <div className="flex space-x-4 items-center">
          <img src={user?.profilePic} alt="User Profile Pic" className="w-24 h-24 object-cover rounded-full mb-4" />
          <div>
            <h4 className="text-xl font-bold text-blue-950">{formatName(user?.name)}</h4>
            <p className="text-blue-700">{formatCB(user?.email)}</p>
            <Button size="sm" variant="outline" className="mt-4" onClick={onClick}>
              Upload CV
            </Button>
          </div>
        </div>
      </section>
      <section className="col-span-8 row-span-2 bg-white rounded shadow p-6">
        <h4 className="text-xl font-semibold mb-4">CV Preview</h4>
        {cv ? (
          <iframe
            src={`http://localhost:8080/${cv.path}`}
            title="CV Preview"
            className="w-full h-96 border rounded"
          ></iframe>
        ) : (
          <p className="text-gray-500 text-center">No CV uploaded yet.</p>
        )}
      </section>
      <section className="col-span-4 bg-white rounded shadow p-6">
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
  );
};

export default Profile;
