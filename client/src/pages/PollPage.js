
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import config from "../config/config";
import apiRequest from "../util/api";

export const PollPage = () => {
  const [pollData, setPollData] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const pollUrl = document.URL;

  useEffect(() => {
    const fetchPoll = async () => {
      setLoading(true);
      try {
        const response = await apiRequest(config.polls("null"), {
          method: "POST",
          body: JSON.stringify({ pollUrl }),
        });
        const data = await response.json();

        if (response.status === 200) {
          setPollData(data);
        } else {
          setError(data.message || "Failed to load poll data.");
        }
      } catch (e) {
        setError("Error fetching poll data: " + e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPoll();
  }, [pollUrl]);

  const handleVote = async () => {
    if (!selectedOption) {
      setError("Please select an option to vote.");
      return;
    }

    setLoading(true);
    try {
      const response = await apiRequest(config.pollsVote("null"), {
        method: "POST",
        body: JSON.stringify({ optionId: selectedOption, pollUrl }),
      });

      const data = await response.json();
      setLoading(false);

      if (response.status === 200) {
        setShowPopup(true);
      } else {
        setError(data.message || "Failed to submit vote.");
      }
    } catch (e) {
      setLoading(false);
      setError("Error submitting vote: " + e.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-20">
      <h1 className="text-4xl font-bold mb-4">{pollData?.title || "Poll Title"}</h1>
      <p className="text-lg mb-6 text-gray-600">{pollData?.description}</p>
      <div className="w-full max-w-md space-y-4">
        {pollData?.pollOptions?.map((option) => (
          <label
            key={option._id}
            className="flex items-center space-x-2 border-2 p-4 rounded cursor-pointer hover:border-red-500 shadow"
          >
            <input
              type="radio"
              name="pollOption"
              value={option._id}
              onChange={() => setSelectedOption(option._id)}
              className="form-radio"
            />
            <span>
              {new Date(option.date).toUTCString().split(" ").slice(0, 4).join(" ")} {option.startTime} to{" "}
              {option.endTime}
            </span>
          </label>
        ))}
      </div>
      <div className="flex space-x-4 mt-6">
        <button
          onClick={handleVote}
          disabled={loading}
          className="px-4 py-2 bg-[#167cfd] text-white rounded hover:bg-blue-400"
        >
          {loading ? "Submitting..." : "Submit Vote"}
        </button>
        <button onClick={() => navigate("/")} className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-400">
          Cancel
        </button>
      </div>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Vote sent!</h2>
              <button onClick={() => navigate("/")} className="text-gray-500 hover:text-gray-700">
                &times;
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
