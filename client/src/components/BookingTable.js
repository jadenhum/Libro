
import React, { useEffect, useState } from "react";
import OneTimeBookings from "./OneTimeBookings";
import RecurringBookings from "./RecurringBookings";
import EquipmentBookings from "./EquipmentBookings";
import config from "../config/config"; // Import the configuration
import apiRequest from "../util/api";

const BookingTable = ({ onEdit = () => {} }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [bookingToDelete, setBookingToDelete] = useState(null);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await apiRequest(config.bookingsByMember);
        const data = await response.json();

        if (response.ok) {
          setBookings(data);
        } else {
          setError(data.message || "Failed to fetch bookings.");
        }
      } catch (error) {
        setError("An error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleDelete = (bookingId) => {
    setBookingToDelete(bookingId);
    setShowConfirmPopup(true);
  };

  const confirmDelete = async () => {
    if (bookingToDelete) {
      try {
        const response = await apiRequest(`${config.bookings}/${bookingToDelete}`, {
          method: "DELETE",
        });
        if (response.ok) {
          setBookings((prevBookings) => prevBookings.filter((booking) => booking._id !== bookingToDelete));
        } else {
          const data = await response.json();
          setError(data.message || "Failed to delete booking. Please try again.");
        }
      } catch (error) {
        setError("An error occurred. Please try again.");
      }
    }
    setShowConfirmPopup(false);
    setBookingToDelete(null);
  };

  const cancelDelete = () => {
    setShowConfirmPopup(false);
    setBookingToDelete(null);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  return (
    <>
      {bookings.length !== 0 ? (
        <>
          <OneTimeBookings
            onEdit={onEdit}
            bookings={bookings.filter((booking) => booking.type === "one-time")}
            handleDelete={handleDelete}
            confirmDelete={confirmDelete}
            cancelDelete={cancelDelete}
            showConfirmPopup={showConfirmPopup}
          />
          <RecurringBookings
            onEdit={onEdit}
            bookings={bookings.filter((booking) => booking.type === "recurring")}
            handleDelete={handleDelete}
            confirmDelete={confirmDelete}
            cancelDelete={cancelDelete}
            showConfirmPopup={showConfirmPopup}
          />
          <EquipmentBookings
            onEdit={onEdit}
            bookings={bookings.filter((booking) => booking.type === "equipment")}
            handleDelete={handleDelete}
            confirmDelete={confirmDelete}
            cancelDelete={cancelDelete}
            showConfirmPopup={showConfirmPopup}
          />
        </>
      ) : (
        // Shows when there are no bookings
        <div className="absolute inset-0 m-auto w-[50%] h-[20%] flex items-center flex-col -z-50">
          <h1 className="text-3xl font-bold text-gray-400 mb-5">No bookings!</h1>
          <p className="text-gray-400">Your bookings will show up here.</p>
        </div>
      )}
    </>
  );
};

export default BookingTable;
