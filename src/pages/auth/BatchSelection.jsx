import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import Logo from "@/assets/logo.png";
import API from "@/services/index";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const batchOptions = [
  { value: "CF2361", label: "CF2361" },
  { value: "IF2361", label: "IF2361" },
  { value: "HF2361", label: "HF2361" },
];

const BatchSelection = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [selectedBatch, setSelectedBatch] = useState(null);

  const onSubmit = async () => {
    try {
      if (selectedBatch) {
        const response = await API.private.updateUser({
          batchCode: selectedBatch.value,
        });
        if (response.data.success) {
          message.success("Batch code updated successfully");
          navigate("/");
        } else {
          message.error("An error occurred. Please try again.");
        }
      }
    } catch (error) {
      message.error("An error occurred. Please try again.");
    }
  };

  const handleBatchChange = (selectedOption) => {
    setSelectedBatch(selectedOption);
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
          <h2 className="text-2xl font-bold text-center text-blue-900">Select Your Batch Code</h2>
          <p className="text-center text-gray-400 mb-4">Select your university batch code to continue.</p>

          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <Controller
              name="batchCode"
              control={control}
              rules={{ required: "Batch code is required" }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={batchOptions}
                  onChange={(selectedOption) => {
                    field.onChange(selectedOption);
                    handleBatchChange(selectedOption);
                  }}
                  placeholder="Select your batch code..."
                  className="mb-4"
                  classNamePrefix="react-select"
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      borderColor: errors.batchCode ? "red" : "#d1d5db",
                      boxShadow: "none",
                      "&:hover": { borderColor: errors.batchCode ? "red" : "#d1d5db" },
                    }),
                    placeholder: (provided) => ({
                      ...provided,
                      fontSize: "0.875rem", // text-sm
                    }),
                    singleValue: (provided) => ({
                      ...provided,
                      fontSize: "1rem",
                    }),
                    indicatorSeparator: (provided) => ({
                      ...provided,
                      display: "none",
                    }),
                  }}
                />
              )}
            />
            {errors.batchCode && <p className="text-red-500 text-sm">{errors.batchCode.message}</p>}

            <button
              type="submit"
              className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full mt-4 ${
                !selectedBatch && "opacity-50 cursor-not-allowed"
              }`}
              disabled={!selectedBatch}
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BatchSelection;
