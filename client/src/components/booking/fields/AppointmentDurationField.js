
import React from "react";

const AppointmentDurationField = ({
  appointmentDuration,
  setAppointmentDuration = () => {},
  startTime,
  endTime,
}) => {
  const handleDurationChange = (duration) => {
    setAppointmentDuration(duration);
  };

  const calculateDuration = (start, end) => {
    const startDate = new Date(`1970-01-01T${start}:00`);
    const endDate = new Date(`1970-01-01T${end}:00`);
    const diff = (endDate - startDate) / 60000;
    return diff;
  };

  const duration = calculateDuration(startTime, endTime);

  return (
    <div>
      <div className="mt-4 mb-2">
        <label className="block text-gray-700">Appointment Duration</label>
      </div>
      <div className="flex space-x-2">
        <button
          type="button"
          className={`px-4 py-2 ${
            appointmentDuration === 5 ? "bg-red-600 text-white" : "bg-gray-200"
          } rounded`}
          onClick={() => handleDurationChange(5)}
        >
          5 min
        </button>
        <button
          type="button"
          className={`px-4 py-2 ${
            appointmentDuration === 10 ? "bg-red-600 text-white" : "bg-gray-200"
          } rounded`}
          onClick={() => handleDurationChange(10)}
        >
          10 min
        </button>
        <button
          type="button"
          className={`px-4 py-2 ${
            appointmentDuration === 15 ? "bg-red-600 text-white" : "bg-gray-200"
          } rounded`}
          onClick={() => handleDurationChange(15)}
        >
          15 min
        </button>
        <button
          type="button"
          className={`px-4 py-2 ${
            duration < 30
              ? "bg-gray-400 text-gray-600"
              : appointmentDuration === 30
              ? "bg-red-600 text-white"
              : "bg-gray-200"
          } rounded`}
          onClick={() => handleDurationChange(30)}
          disabled={duration < 30}
        >
          30 min
        </button>
        <button
          type="button"
          className={`px-4 py-2 ${
            duration < 60
              ? "bg-gray-400 text-gray-600"
              : appointmentDuration === 60
              ? "bg-red-600 text-white"
              : "bg-gray-200"
          } rounded`}
          onClick={() => handleDurationChange(60)}
          disabled={duration < 60}
        >
          1 hour
        </button>
      </div>
    </div>
  );
};

export default AppointmentDurationField;
