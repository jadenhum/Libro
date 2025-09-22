
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TitleField from "../components/booking/fields/TitleField";
import DescriptionField from "../components/booking/fields/DescriptionField";
import PollOption from "../components/PollOption";
import { v4 as uuidv4 } from "uuid";
import { FaTrash } from "react-icons/fa";
import config from "../config/config";
import apiRequest from "../util/api";

export const CreatePoll = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [pollOptions, setPollOptions] = useState([
    { date: new Date(), startTime: "", endTime: "" },
    { date: new Date(), startTime: "", endTime: "" },
  ]);
  const [linkCopied, setLinkCopied] = useState(false);
  const navigate = useNavigate();

  // Generate a unique URL
  const domain = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://libro.works";
  const uniqueURL = `${domain}/poll/${uuidv4()}`;
  const [generatedURL, setGeneratedURL] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const pollData = {
      title,
      description,
      pollOptions,
      URL: uniqueURL,
    };

    try {
      const response = await apiRequest(config.pollsCreate, {
        method: "POST",
        body: JSON.stringify(pollData), // Serialize pollData
      });

      const data = await response.json();
      setLoading(false);

      if (response.status === 201) {
        setGeneratedURL(data.URL);
        setShowPopup(true);
      } else {
        setError("Server: " + data.message);
      }
    } catch (e) {
      setLoading(false);
      setError("Error: " + e);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(generatedURL);
    setLinkCopied(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    navigate("/view-polls"); // Navigate forward
  };

  const handleCancel = () => {
    navigate("/dashboard"); // Navigate back
  };

  const handleAddOption = () => {
    setPollOptions((prev) => prev.concat({ date: new Date(), startTime: "", endTime: "" }));
    setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 100);
  };

  const handleRemoveOption = (index) => () => {
    setPollOptions((prev) => prev.filter((_, i) => i !== index)); // Remove the option
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen pl-20 pr-20 pb-20 pt-12">
      <h1 className="text-4xl font-bold mb-4">Create Poll</h1>
      <form className="mt-4 space-y-4 w-full max-w-md" onSubmit={handleSubmit}>
        <TitleField title={title} setTitle={setTitle} />
        <DescriptionField description={description} setDescription={setDescription} />
        <h3 className="text-2xl font-bold mb-4">Poll Options</h3>
        {pollOptions.map((_, index) => (
          <React.Fragment key={index}>
            <br></br>
            <div className="flex justify-between align-center">
              <span className="font-bold mb-4 text-gray-500">{`Option ${index + 1}`}</span>
              {pollOptions.length > 2 && (
                <FaTrash
                  onClick={handleRemoveOption(index)}
                  className="text-red-500 hover:text-red-400 text-xl cursor-pointer mt-1"
                  size={16}
                />
              )}
            </div>
            <PollOption
              date={pollOptions[index].date}
              setDate={(date) =>
                setPollOptions((prev) => {
                  const copy = [...prev];
                  copy[index].date = date;
                  return copy;
                })
              }
              startTime={pollOptions[index].startTime}
              setStartTime={(startTime) =>
                setPollOptions((prev) => {
                  const copy = [...prev];
                  copy[index].startTime = startTime;
                  return copy;
                })
              }
              endTime={pollOptions[index].endTime}
              setEndTime={(endTime) =>
                setPollOptions((prev) => {
                  const copy = [...prev];
                  copy[index].endTime = endTime;
                  return copy;
                })
              }
            />
          </React.Fragment>
        ))}
        {error && <p className="text-red-600">{error}</p>}
        <div className="flex space-x-4">
          <button
            type="button"
            className="px-4 py-2 bg-[#167cfd] text-white rounded hover:bg-blue-400"
            onClick={handleAddOption}
          >
            Add Option
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-[#ea1512] text-white rounded hover:bg-red-400"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Poll"}
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
              <h2 className="text-xl font-bold">Poll Created Successfully!</h2>
              <button onClick={handleClosePopup} className="text-gray-500 hover:text-gray-700 text-xl">
                &times;
              </button>
            </div>
            <p className="text-gray-700 mb-4">
              Your Poll URL:{" "}
              <a href={generatedURL} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                {generatedURL}
              </a>
            </p>
            <button onClick={handleCopyLink} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-400">
              Copy Link
            </button>
            {linkCopied && <span className="font-bold m-8 text-blue-500">Link Copied!</span>}
          </div>
        </div>
      )}
    </div>
  );
};
