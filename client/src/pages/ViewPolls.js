import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import config from "../config/config";
import apiRequest from "../util/api";

export const ViewPolls = () => {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [showHamburgerMenu, setShowHamburgerMenu] = useState(false);

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const response = await apiRequest(config.allUserPolls);
        const data = await response.json();
        if (response.ok) {
          setPolls(data);
        } else {
          setError(data.message || "failed to fetch polls");
        }
      } catch (error) {
        setError("Error fetching polls: " + error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPolls();
  }, []);

  const toggleHamburgerMenu = () => {
    setShowHamburgerMenu((prev) => !prev);
  };

  // make hamburger menu disappear when expanding screen
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      setShowHamburgerMenu(false);
    }
  });

  const handleBack = () => {
    navigate("/dashboard");
  };

  const handleCreatePoll = () => {
    navigate("/create-poll");
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <p className="text-xl">Loading polls...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-5xl font-bold">Polls</h1>
          <div className="flex justify-end items-center mb-4 w-1/2 md:hidden" onClick={toggleHamburgerMenu}>
            <div className="flex items-center flex-col rounded-md shadow-md border p-4 bg-[#167cfd] hover:bg-blue-300">
              <div className="w-10 h-1.5 bg-white my-1 rounded"></div>
              <div className="w-10 h-1.5 bg-white my-1 rounded"></div>
              <div className="w-10 h-1.5 bg-white my-1 rounded"></div>
            </div>
          </div>
          <div className="space-x-4 hidden md:block">
            <button
              onClick={handleCreatePoll}
              className="px-4 py-2 text-white rounded font-bold bg-[#167cfd] hover:text-blue-300 text-lg"
            >
              Create Poll
            </button>
            <button
              onClick={handleBack}
              className="px-4 py-2 text-white rounded font-bold bg-[#167cfd] hover:text-blue-300 text-lg"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
        {showHamburgerMenu && (
          <div className="flex flex-col items-center space-y-4 bg-[#167cfd] p-4 rounded-md shadow-md border mb-5 z-10">
            <button
              className="px-4 py-2 text-white rounded font-bold bg-[#167cfd] hover:text-blue-300 text-lg z-10"
              onClick={handleCreatePoll}
            >
              Create Poll
            </button>
            <button
              className="px-4 py-2 text-white rounded font-bold bg-[#167cfd] hover:text-blue-300 text-lg z-10"
              onClick={handleBack}
            >
              Back to Dashboard
            </button>
          </div>
        )}

        {error && <p>{error}</p>}

        {polls.length === 0 ? (
          <div className="absolute inset-0 m-auto w-[50%] h-[20%] flex items-center flex-col -z-50">
            <h1 className="text-3xl font-bold text-gray-400 mb-5">No polls!</h1>
            <p className="text-gray-400">Your polls will show up here.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {polls.map((poll) => (
              <div
                key={poll._id}
                className="bg-white p-6 rounded border-2 border-gray-200 transition-all hover:border-red-600 flex flex-col h-full shadow w-auto"
              >
                <div className="flex-grow">
                  <h2 className="text-xl font-bold mb-2">{poll.title}</h2>
                  <p className="text-gray-600 mb-4">{poll.description}</p>
                  <p className="text-sm text-gray-500 mb-2">Status: {poll.status}</p>

                  <div className="mb-4">
                    <h3 className="text-md font-bold mb-2">Vote Results: </h3>
                    {poll.pollOptions
                      .sort((a, b) => b.votes - a.votes)
                      .map((option) => {
                        const totalVotes = poll.pollOptions.reduce((sum, opt) => sum + opt.votes, 0);
                        const percentage = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0;
                        return (
                          <div key={option._id} className="mb-3 p-4">
                            <div className="flex justify-between mb-1">
                              <span className="text-sm">
                                {new Date(option.date).toUTCString().split(" ").slice(0, 4).join(" ")} -{" "}
                                {option.startTime} to {option.endTime}
                              </span>
                              <span className="text-sm font-semibold">
                                {option.votes} {option.votes === 1 ? "vote" : "votes"}
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="h-2 rounded-full bg-red-500" style={{ width: `${percentage}%` }}></div>
                            </div>
                          </div>
                        );
                      })}
                  </div>

                  <p className="text-sm">
                    <strong>Poll URL: </strong>
                    <a href={poll.URL} className="text-[#167cfd] hover:text-blue-400 underline break-all">
                      {poll.URL}
                    </a>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};
