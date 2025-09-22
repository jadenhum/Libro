
import React from "react";

const PollOption = ({ date, setDate, startTime, setStartTime, endTime, setEndTime }) => {
  const [error, setError] = React.useState("");

  const handleChangeStartTime = (e) => {
    if (e.target.value > endTime && endTime) {
      setError("Start time must be before end time");
      setStartTime("");
      return;
    }
    setStartTime(e.target.value);
    setError("");
  };

  const handleChangeEndTime = (e) => {
    if (e.target.value < startTime && startTime) {
      setError("End time must be after start time");
      setEndTime("");
      return;
    }
    setEndTime(e.target.value);
    setError("");
  };

  return (
    <div className="w-full max-w-md">
      <div>
        <label className="block text-gray-700">Date</label>
        <input
          type="date"
          className="w-full px-4 py-2 border rounded"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-gray-700">Start Time</label>
        <input
          type="time"
          className="w-full px-4 py-2 border rounded"
          value={startTime}
          onChange={handleChangeStartTime}
          required
        />
      </div>
      <div>
        <label className="block text-gray-700">End Time</label>
        <input
          type="time"
          className="w-full px-4 py-2 border rounded"
          value={endTime}
          onChange={handleChangeEndTime}
          required
        />
      </div>
      <span className="text-xs text-[#167cfd]">{error}</span>
    </div>
  );
};

export default PollOption;
