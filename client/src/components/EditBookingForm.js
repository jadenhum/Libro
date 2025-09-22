
import React, { useState, useEffect } from "react";
import TitleField from "./booking/fields/TitleField";
import DescriptionField from "./booking/fields/DescriptionField";
import TypeField from "./booking/fields/TypeField";
import SingleDateField from "./booking/fields/SingleDateField";
import DateRangeField from "./booking/fields/DateRangeField";
import TimeField from "./booking/fields/TimeField";
import DaysOfWeekField from "./booking/fields/DaysOfWeekField";
import AppointmentDurationField from "./booking/fields/AppointmentDurationField";
import config from "../config/config";
import apiRequest from "../util/api";

const EditBookingForm = ({ booking, onSave, onCancel, onDelete }) => {
  const [title, setTitle] = useState(booking.title);
  const [description, setDescription] = useState(booking.description);
  const [type, setType] = useState(booking.type);
  const [date, setDate] = useState("");
  const [startDate, setStartDate] = useState(booking.startDate);
  const [endDate, setEndDate] = useState(booking.endDate);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [daysOfWeek, setDaysOfWeek] = useState(booking.daysOfWeek);
  const [appointmentDuration, setAppointmentDuration] = useState(30); // Default to 30 minutes
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);

  useEffect(() => {
    if (type === "one-time") {
      const start = new Date(booking.startDate);
      setDate(start.toISOString().split("T")[0]);
      setStartTime(start.toISOString().split("T")[1].substring(0, 5));
      const end = new Date(booking.endDate);
      setEndTime(() => end.toISOString().split("T")[1].substring(0, 5));
    }
  }, [booking, type]);

  const handleDurationChange = (duration) => {
    setAppointmentDuration(duration);
  };

  const handleDayToggle = (day) => {
    setDaysOfWeek((prevDays) => (prevDays.includes(day) ? prevDays.filter((d) => d !== day) : [...prevDays, day]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const updatedBooking = {
      ...booking,
      title,
      description,
      type,
      startDate,
      endDate,
      daysOfWeek,
    };

    try {
      const response = await apiRequest(config.bookingById(booking._id), {
        method: "PATCH",
        body: JSON.stringify(updatedBooking),
      });

      const data = await response.json();

      if (response.ok) {
        onSave(data);
      } else {
        setError(data.message || "Failed to update booking. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
    setShowConfirmPopup(true);
  };

  const confirmDelete = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await apiRequest(config.bookingById(booking._id), {
        method: "DELETE",
      });
      if (response.ok) {
        onDelete();
      } else {
        const data = await response.json();
        setError(data.message || "Failed to delete booking. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
      setShowConfirmPopup(false);
    }
  };

  const cancelDelete = () => {
    setShowConfirmPopup(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen pl-20 pr-20 pb-20">
      <h1 className="text-4xl font-bold mb-4">Edit Booking</h1>
      <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
        <TitleField title={title} setTitle={setTitle} />
        <DescriptionField description={description} setDescription={setDescription} />
        <TypeField type={type} setType={setType} />
        {type === "one-time" && (
          <>
            <SingleDateField label="Date" date={date} setDate={setDate} />
            <TimeField label="Start Time" time={startTime} setTime={setStartTime} />
            <TimeField label="End Time" time={endTime} setTime={setEndTime} />
          </>
        )}
        {type === "recurring" && (
          <>
            <DateRangeField
              label="Date Range"
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
            />
            <TimeField label="Start Time" time={startTime} setTime={setStartTime} />
            <TimeField label="End Time" time={endTime} setTime={setEndTime} />
            <DaysOfWeekField daysOfWeek={daysOfWeek} handleDayToggle={handleDayToggle} />
          </>
        )}
        {type === "equipment" && (
          <>
            <SingleDateField label="Borrow Date" date={startDate} setDate={setStartDate} />
            <TimeField label="Borrow Time" time={startTime} setTime={setStartTime} />
            <SingleDateField label="Return Date" date={endDate} setDate={setEndDate} />
            <TimeField label="Return Time" time={endTime} setTime={setEndTime} />
          </>
        )}
        <AppointmentDurationField
          appointmentDuration={appointmentDuration}
          handleDurationChange={handleDurationChange}
        />
        {error && <p className="text-red-600">{error}</p>}
        <div className="flex space-x-4">
          <button
            type="submit"
            className="px-4 py-2 bg-[#167cfd] text-white rounded hover:bg-blue-400"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-400"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-[#ea1512] text-white rounded hover:bg-red-400"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </form>

      {showConfirmPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Are you sure you want to delete this booking?</h2>
            </div>
            <div className="flex flex-start">
              <button onClick={cancelDelete} className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-400">
                Cancel
              </button>
              <button onClick={confirmDelete} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-400 ml-4">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditBookingForm;
