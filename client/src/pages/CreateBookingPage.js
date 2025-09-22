
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import TypeField from "../components/booking/fields/TypeField";
import OneTimeBooking from "../components/booking/OneTimeBooking";
import RecurringBooking from "../components/booking/RecurringBooking";
import EquipmentBooking from "../components/booking/EquipmentBooking";
import config from "../config/config";
import apiRequest from "../util/api";

const CreateBookingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("one-time");
  const [date, setDate] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [daysOfWeek, setDaysOfWeek] = useState([]);
  const [appointmentDuration, setAppointmentDuration] = useState(15); // Default to 15 minutes
  const [generatedURL, setGeneratedURL] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validate required fields
    if (
      type === "one-time" &&
      (!date || startTime === "-" || endTime === "-")
    ) {
      setError(
        "Start date, start time, and end time are required for one-time bookings."
      );
      setLoading(false);
      return;
    }
    if (
      (type === "recurring" || type === "equipment") &&
      (!startDate || !endDate || startTime === "-" || endTime === "-")
    ) {
      setError(
        "Start date, end date, start time, and end time are required for recurring and equipment bookings."
      );
      setLoading(false);
      return;
    }

    const domain =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://libro.works";
    const uniqueURL = `${domain}/book/${uuidv4().slice(0, 8)}`;

    const requestBody = {
      title,
      description,
      type,
      date,
      startDate,
      endDate,
      startTime,
      endTime,
      daysOfWeek,
      appointmentDuration,
      URL: uniqueURL,
    };

    console.log("requestBody:", requestBody);

    try {
      const token = document.cookie.split("=")[1]; // Get the token from cookies
      const response = await apiRequest(config.bookings, {
        method: "POST",
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (response.ok) {
        setGeneratedURL(uniqueURL); // Display the generated URL to the user
        setShowPopup(true); // Show the popup
      } else {
        setError(data.message || "Failed to create booking. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(generatedURL);
    setLinkCopied(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    navigate("/dashboard"); // Navigate back to the dashboard
  };

  const handleCancel = () => {
    navigate("/dashboard"); // Navigate back to the dashboard
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen pl-20 pr-20 pb-20 pt-12 mt-12">
      <h1 className="text-4xl font-bold mb-4">Create Booking</h1>
      <form className="mt-4 space-y-4 w-full max-w-md" onSubmit={handleSubmit}>
        <TypeField type={type} setType={setType} />
        {type === "one-time" && (
          <OneTimeBooking
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
            date={date}
            setDate={setDate}
            startTime={startTime}
            setStartTime={setStartTime}
            endTime={endTime}
            setEndTime={setEndTime}
            appointmentDuration={appointmentDuration}
            setAppointmentDuration={setAppointmentDuration}
          />
        )}
        {type === "recurring" && (
          <RecurringBooking
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            startTime={startTime}
            setStartTime={setStartTime}
            endTime={endTime}
            setEndTime={setEndTime}
            daysOfWeek={daysOfWeek}
            setDaysOfWeek={setDaysOfWeek}
            appointmentDuration={appointmentDuration}
            setAppointmentDuration={setAppointmentDuration}
          />
        )}
        {type === "equipment" && (
          <EquipmentBooking
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            startTime={startTime}
            setStartTime={setStartTime}
            endTime={endTime}
            setEndTime={setEndTime}
          />
        )}
        {error && <p className="text-red-600">{error}</p>}
        <div className="flex space-x-4">
          <button
            type="submit"
            className="px-4 py-2 bg-red-600 text-white rounded"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Booking"}
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-gray-600 text-white rounded"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
        <div className="mb-4"></div>
      </form>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                Booking Created Successfully!
              </h2>
              <button
                onClick={handleClosePopup}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>
            <p className="text-gray-700 mb-4">
              Your booking URL:
              <a
                href={generatedURL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                {generatedURL}
              </a>
            </p>
            <button
              onClick={handleCopyLink}
              className="px-4 py-2 bg-red-600 text-white rounded"
            >
              Copy Link
            </button>
            {linkCopied && (
              <span className="font-bold m-8 text-blue-500">Link Copied!</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateBookingPage;
