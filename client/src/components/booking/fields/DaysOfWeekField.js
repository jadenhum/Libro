
import React from "react";

const DaysOfWeekField = ({ daysOfWeek, setDaysOfWeek }) => {
  const handleDayToggle = (day) => {
    setDaysOfWeek((prevDays) =>
      prevDays.includes(day)
        ? prevDays.filter((d) => d !== day)
        : [...prevDays, day]
    );
  };

  return (
    <div>
      <div className="mb-2">
        <label className="block text-gray-700">Days of the Week</label>
      </div>
      <div className="flex space-x-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
          <button
            key={index}
            type="button"
            className={`px-4 py-2 rounded-full ${
              daysOfWeek.includes(index)
                ? "bg-red-600 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => handleDayToggle(index)}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DaysOfWeekField;
