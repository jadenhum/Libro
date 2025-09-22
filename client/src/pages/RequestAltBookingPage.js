
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BookingRequest from "../components/booking/BookingRequest";
import config from "../config/config";
import apiRequest from "../util/api";

const RequestAltBookingPage = () => {
  const navigate = useNavigate();

  const [date, setDate] = useState(null);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const { bookingID } = useParams();
  const [data, setData] = useState({});
  const [linkCopied, setLinkCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const requestBody = {
      bookingID,
      date,
      startTime,
      endTime,
    };

    console.log("requestBody:", requestBody);

    try {
      const response = await apiRequest(config.bookingRequest, {
        method: "POST",
        body: JSON.stringify(requestBody),
      });

      setData(await response.json());

      if (response.status === 200) {
        setLoading(false);
        setShowPopup(true); // Show the popup
      } else {
        setError("Failed to create booking request. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(data.email);
    setLinkCopied(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    navigate(-1); // Navigate back
  };

  const handleCancel = () => {
    navigate(-1); // Navigate back
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-10 pb-12">
      <h1 className="text-4xl font-bold mb-5">Request Booking</h1>
      <p className="mb-2 text-gray-500 text-lg">
        Please select an alternate date and availability window for your booking request
      </p>
      <p className="mb-4 text-gray-500 text-lg">We will send the request to the booking creator</p>
      <form className="mt-4 space-y-4 w-full max-w-md" onSubmit={handleSubmit}>
        <BookingRequest
          date={date}
          setDate={setDate}
          startTime={startTime}
          setStartTime={setStartTime}
          endTime={endTime}
          setEndTime={setEndTime}
        />
        {error && <p className="text-red-600">{error}</p>}
        <div className="flex space-x-4">
          <button
            type="submit"
            className="px-4 py-2 bg-[#167cfd] text-white rounded hover:bg-blue-400"
            disabled={loading}
          >
            {loading ? "Creating..." : "Send Request"}
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-400"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Booking Request Sent!</h2>
              <button onClick={handleClosePopup} className="text-gray-500 hover:text-gray-700 text-xl">
                &times;
              </button>
            </div>
            <p className="text-gray-700 mb-4">
              Recipient:{" "}
              <a
                href={`mailto:${data.email}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                {data.email}
              </a>
            </p>
            <button onClick={handleCopyLink} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-400">
              Copy Email
            </button>
            {linkCopied && <span className="font-bold m-8 text-blue-500">Email Copied!</span>}
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestAltBookingPage;
