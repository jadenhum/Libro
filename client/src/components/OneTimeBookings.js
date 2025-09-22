
import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { FaArrowUpRightFromSquare, FaCopy } from "react-icons/fa6";
import { Link } from "react-router-dom";

const OneTimeBookings = ({
  onEdit = () => {},
  bookings,
  handleDelete = () => {},
  confirmDelete = () => {},
  cancelDelete = () => {},
  showConfirmPopup,
}) => {
  const [popup, setPopup] = useState("");

  const handleOpenURL = (url) => {
    window.open(url, "_blank");
  };

  const handleCopyURL = (url, e) => {
    setPopup(url);
    navigator.clipboard.writeText(url);
  };

  return (
    bookings.length !== 0 && (
      <>
        {bookings.length === 1 ? (
          <h1 className="text-1xl font-bold text-gray-500 mb-2">One-time Booking</h1>
        ) : (
          <h1 className="text-1xl font-bold text-gray-500 mb-2">One-time Bookings</h1>
        )}
        <div className="overflow-x-auto rounded border-2 border-gray-200 shadow">
          <table className="min-w-full table-fixed bg-white border border-gray-200">
            <thead>
              <tr className="text-left bg-gray-100">
                <th className="py-2 px-4 border-b w-20"></th>
                <th className="py-2 px-4 border-b w-[200px]">Title</th>
                <th className="py-2 px-4 border-b">Description</th>
                <th className="py-2 px-4 border-b">Date</th>
                <th className="py-2 px-4 border-b">Availability Period</th>
                <th className="py-2 px-4 border-b">Day</th>
                <th className="py-2 px-4 border-b">Appointment Duration</th>
                <th className="py-2 px-4 border-b"></th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id}>
                  <td className="py-3 px-4 border-b">
                    <div className="flex justify-start align-center">
                      <div className="inline-block">
                        <FaCopy
                          size={20}
                          onClick={(e) => handleCopyURL(booking.URL, e)}
                          className="text-[#167cfd] hover:text-blue-400 hover:cursor-pointer my-auto"
                        />
                      </div>
                      <div className="inline-block ml-5 my-auto">
                        <FaArrowUpRightFromSquare
                          onClick={() => handleOpenURL(booking.URL)}
                          className="text-[#167cfd] hover:text-blue-400 hover:cursor-pointer my-auto"
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 border-b">
                    <Link to={`/view-booking/${booking._id}`} className="text-[#167cfd] text-bold hover:text-blue-800">
                      {booking.title}
                    </Link>
                  </td>
                  <td className="py-3 px-4 border-b">{booking.description}</td>
                  <td className="py-3 px-4 border-b">
                    {new Date(booking.date).toUTCString().split(" ").slice(0, 4).join(" ")}
                  </td>
                  <td className="py-3 px-4 border-b">{`${booking.startTime} - ${booking.endTime}`}</td>
                  <td className="py-3 px-4 border-b">
                    {new Date(booking.date).toLocaleDateString("en-US", { weekday: "short" })}
                  </td>
                  <td className="py-3 px-4 border-b">{`${booking.appointmentDuration} minutes`}</td>
                  <td className="py-3 px-4 border-b">
                    <div className="flex justify-end align-center">
                      <div className="inline-block">
                        <FaEdit
                          onClick={() => onEdit(booking)}
                          size={21}
                          className="text-gray-500 hover:text-gray-400 ml-5 my-auto hover:cursor-pointer"
                        />
                      </div>
                      <div className="inline-block ml-5 my-auto">
                        <FaTrash
                          className="text-red-700 hover:text-red-600 hover:cursor-pointer"
                          onClick={() => handleDelete(booking._id)}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {popup && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Link Copied!</h2>
                  <button onClick={() => setPopup("")} className="text-gray-500 hover:text-gray-700 text-xl">
                    &times;
                  </button>
                </div>
                <p className="text-gray-700 mb-4">
                  Your URL:{" "}
                  <a href={popup} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                    {popup}
                  </a>
                </p>
              </div>
            </div>
          )}

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
                  <button
                    onClick={confirmDelete}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-400 ml-4"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </>
    )
  );
};

export default OneTimeBookings;
