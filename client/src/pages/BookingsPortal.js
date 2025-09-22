
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState } from "react";
import config from "../config/config";
import apiRequest from "../util/api";

const BookingsPortal = () => {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!url) {
      setError("Please enter a URL");
      setLoading(false);
      return;
    }
    try {
      setError("");
      const response = await apiRequest(config.bookingByUrl("null"), {
        method: "POST",
        body: JSON.stringify({ myurl: url }),
      });

      if (response.ok) {
        window.open(url);
      } else {
        setError("We couldn't find a booking for this URL.");
      }
    } catch (error1) {
      setError("error verifying URL:" + error1.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
        <div className="text-left md:w-1/2 md:ml-8">
          <h1 className="text-6xl font-bold mb-4 leading-snug">Book</h1>
          <p className="text-2xl leading-relaxed">Enter a booking URL to book an appointment</p>
        </div>
        <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700">URL</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-red-600">{error}</p>}
            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-400"
                onClick={(e) => handleSubmit(e, true)}
              >
                {loading ? "Verifying URL..." : "View Booking"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BookingsPortal;
