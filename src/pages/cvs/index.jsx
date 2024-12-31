import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import API from "@/services/index";
import Pagination from "@/components/ui/Pagination";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Icon from "@/components/ui/Icon";
import Modal from "@/components/ui/Modal";
import { formatName } from "@/utils/formatName";
import { formatCB } from "@/utils/formatCB";

const CVPage = () => {
  const navigate = useNavigate();
  const [cvs, setCvs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [selectedCV, setSelectedCV] = useState(null);
  const [rejectReason, setRejectReason] = useState("");

  const batches = [
    { label: "IF2361", value: "IF2361" },
    { label: "CF2361", value: "CF2361" },
    { label: "HF2361", value: "HF2361" },
  ];

  const getAllCvs = async (page = 1, limit = 10, search = "", sort = "date", batch = null) => {
    try {
      const response = await API.private.getAllCvs(page, limit, search, sort, batch);
      if (response.data.success) {
        setCvs(response.data.cvs);
        setCurrentPage(response.data.currentPage);
        setTotalPages(response.data.totalPages);
      }
    } catch (error) {
      console.error(error);
      message.error("Error while fetching CVs");
    }
  };

  const handleSearch = () => {
    getAllCvs(1, 10, searchQuery, sortBy, selectedBatch);
  };

  const handleBatchSelection = (batchValue) => {
    setSortBy("batchCode");
    setSelectedBatch(batchValue);
    getAllCvs(1, 10, searchQuery, "batchCode", batchValue);
  };

  const handleReset = () => {
    setSortBy("date");
    setSelectedBatch(null);
    setSearchQuery("");
    getAllCvs(1, 10, "", "date");
  };

  const handlePageChange = (page) => {
    getAllCvs(page, 10, searchQuery, sortBy, selectedBatch);
  };

  const openApproveModal = (cv) => {
    setSelectedCV(cv);
    setIsApproveModalOpen(true);
  };

  const openRejectModal = (cv) => {
    setSelectedCV(cv);
    setIsRejectModalOpen(true);
  };

  const closeModals = () => {
    setIsApproveModalOpen(false);
    setIsRejectModalOpen(false);
    setRejectReason("");
    setSelectedCV(null);
  };

  const viewCv = (cv) => () => {
    const url = `${import.meta.env.VITE_INTERNCONNECT_API_BASE_URL}/${cv.path}`;
    window.open(url, "_blank");
  };

  const approveCV = (cv) => async () => {
    try {
      const response = await API.private.approveCv(cv.id);
      if (response.data.success) {
        message.success(response.data.message);
        closeModals();
        getAllCvs();
      }
    } catch (error) {
      console.error(error);
      message.error(error.response.data.message);
    }
  };

  const rejectCV = (cv) => async () => {
    try {
      const response = await API.private.rejectCv(cv.id, rejectReason);
      if (response.data.success) {
        message.success(response.data.message);
        closeModals();
        getAllCvs();
      }
    } catch (error) {
      console.error(error);
      message.error(error.response.data.message);
    }
  };

  const statusColors = {
    pending: "yellow",
    approved: "green",
    rejected: "red",
  };

  useEffect(() => {
    getAllCvs();
  }, []);

  return (
    <div className="p-6 bg-white rounded-md shadow-md">
      <div className="mb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search by name or CB number"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button color="primary" onClick={handleSearch}>
              <Icon icon="heroicons:magnifying-glass" />
            </Button>
          </div>
          <Button color="dark" onClick={handleReset}>
            <Icon icon="heroicons:arrow-path" />
          </Button>
        </div>
        <div className="flex items-center space-x-6">
          <p className="font-medium text-gray-700">Sort by Batch:</p>
          {batches.map((batch) => (
            <label key={batch.value} className="flex items-center space-x-2">
              <input
                type="radio"
                name="batch"
                value={batch.value}
                checked={selectedBatch === batch.value}
                onChange={() => handleBatchSelection(batch.value)}
                className="form-radio text-blue-500"
              />
              <span>{batch.label}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200 rounded-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-200 px-4 py-2 text-left">CB Number</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Batch Code</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Student Name</th>
              <th className="border border-gray-200 px-4 py-2 text-left">File Name</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Status</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cvs.length > 0 ? (
              cvs.map((cv, index) => (
                <tr key={cv.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50 hover:bg-gray-100"}>
                  <td className="border border-gray-200 px-4 py-2">{formatCB(cv.user.email)}</td>
                  <td className="border border-gray-200 px-4 py-2">{cv.user.batchCode || "N/A"}</td>
                  <td className="border border-gray-200 px-4 py-2">{formatName(cv.user.name)}</td>
                  <td className="border border-gray-200 px-4 py-2">{cv.filename}</td>
                  <td className="border border-gray-200 px-4 py-2 capitalize">
                    <Badge text={cv.status} color={statusColors[cv.status]} className="capitalize" />
                  </td>
                  <td className="border border-gray-200 px-4 py-2 space-x-2">
                    {cv.status === "pending" && (
                      <>
                        <Button variant="outline" color="success" size="sm" onClick={() => openApproveModal(cv)}>
                          Approve
                        </Button>
                        <Button variant="outline" color="danger" size="sm" onClick={() => openRejectModal(cv)}>
                          Reject
                        </Button>
                      </>
                    )}
                    <Button variant="outline" color="info" size="sm" className="inline-block" onClick={viewCv(cv)}>
                      View CV
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="border border-gray-200 px-4 py-6 text-center text-gray-500">
                  No CVs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end mt-6">
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>
      <Modal isOpen={isApproveModalOpen} onClose={closeModals} title="Approve CV">
        <p>Are you sure you want to accept the CV for {selectedCV && formatName(selectedCV.user.name)}?</p>
        <div className="flex justify-end space-x-2 mt-4">
          <Button color="light" size="sm" onClick={closeModals}>
            Cancel
          </Button>
          <Button color="success" size="sm" onClick={approveCV(selectedCV)}>
            Confirm
          </Button>
        </div>
      </Modal>
      <Modal isOpen={isRejectModalOpen} onClose={closeModals} title="Reject CV">
        <p>Are you sure you want to reject the CV for {selectedCV && formatName(selectedCV.user.name)}?</p>
        <div className="mt-4">
          <label htmlFor="rejectReason" className="block text-sm font-medium text-gray-700">
            Reason
          </label>
          <input
            type="text"
            id="rejectReason"
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            className="mt-1 px-4 py-2 border border-gray-300 rounded-md focus:border-gray-500 focus:outline-none w-full"
            placeholder="Enter the reason for rejection"
            required
          />
        </div>
        <div className="flex justify-end space-x-2 mt-4">
          <Button color="light" size="sm" onClick={closeModals}>
            Cancel
          </Button>
          <Button color="danger" size="sm" disabled={!rejectReason} onClick={rejectCV(selectedCV)}>
            Reject
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default CVPage;
