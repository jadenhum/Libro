
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import config from "../config/config";
import apiRequest from "../util/api";

const ViewBooking = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await apiRequest(config.bookingById(bookingId));
        const data = await response.json();

        if (response.ok) {
          setBooking(data);
        } else {
          setError(data.message || "Failed to fetch booking.");
        }
      } catch (error) {
        setError("An error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [bookingId]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await apiRequest(config.appointmentsByBookingId(bookingId), {
          method: "POST",
        });
        const data = await response.json();

        if (response.ok) {
          setAppointments(data);
        } else {
          setError(data.message || "Failed to fetch appointments.");
        }
      } catch (error) {
        setError("An error occurred while fetching appointments.");
      }
    };

    if (bookingId) {
      fetchAppointments();
    }
  }, [bookingId]);

  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-red-600">{error}</p>
        <button
          className="mt-4 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-400"
          onClick={handleBackToDashboard}
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p>No booking found.</p>
        <button
          className="mt-4 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-400"
          onClick={handleBackToDashboard}
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  const daysOfWeekMap = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen pl-20 pr-20 pb-20 pt-11">
      <h1 className="text-4xl font-bold mb-4">Booking Details</h1>
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-2xl font-semibold">{booking.title}</h2>
        <p className="text-gray-700 mt-4">{booking.description}</p>
        <div className="mt-4 space-y-2">
          <p>
            <strong>Type:</strong> {booking.type}
          </p>
          {booking.type === "one-time" && (
            <>
              <p>
                <strong>Date:</strong> {new Date(booking.startDate).toUTCString().split(" ").slice(0, 4).join(" ")}
              </p>
              <p>
                <strong>Availability:</strong> {`${booking.startTime} - ${booking.endTime}`}
              </p>
            </>
          )}
          {booking.type === "recurring" && (
            <p>
              <strong>Begins On:</strong>
              {`${new Date(booking.startDate).toUTCString().split(" ").slice(0, 4).join(" ")}`}
            </p>
          )}
          {booking.type === "equipment" && (
            <p>
              <strong>Borrow From:</strong>
              {`${new Date(booking.startDate).toUTCString().split(" ").slice(0, 4).join(" ")} - ${booking.startTime}`}
            </p>
          )}
          {booking.type === "recurring" && (
            <>
              <p>
                <strong>Ends On:</strong>{" "}
                {`${new Date(booking.endDate).toUTCString().split(" ").slice(0, 4).join(" ")}`}
              </p>
              <p>
                <strong>Availability:</strong> {`${booking.startTime} - ${booking.endTime}`}
              </p>
            </>
          )}
          {booking.type === "equipment" && (
            <p>
              <strong>Return Before:</strong>{" "}
              {`${new Date(booking.endDate).toUTCString().split(" ").slice(0, 4).join(" ")} - ${booking.endTime}`}
            </p>
          )}
          {booking.daysOfWeek && booking.daysOfWeek.length > 0 && (
            <p>
              <strong>Days:</strong> {booking.daysOfWeek.map((day) => daysOfWeekMap[day]).join(", ")}
            </p>
          )}
        </div>
      </div>

      <div className="mt-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Appointments</h2>
        {appointments.length > 0 ? (
          <ul className="space-y-4">
            {appointments.map((appointment) => (
              <li key={appointment.id} className="bg-gray-100 p-4 rounded-lg shadow-md">
                <p>
                  <strong>Date:</strong> {new Date(appointment.date).toUTCString().split(" ").slice(0, 4).join(" ")}
                </p>
                <p>
                  <strong>From:</strong> {appointment.startTime}
                </p>
                <p>
                  <strong>Until:</strong> {appointment.endTime}
                </p>
                <p>
                  <strong>Student Code:</strong> {appointment.studentCode || "N/A"}
                </p>
                <p>
                  <strong>Booked:</strong> {appointment.booked ? "Yes" : "No"}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No appointments found for this booking.</p>
        )}
      </div>

      <div className="mt-6 flex justify-end space-x-4">
        <button className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-400" onClick={handleBackToDashboard}>
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default ViewBooking;
