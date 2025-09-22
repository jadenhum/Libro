
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BookingTable from "../components/BookingTable";
import EditBookingForm from "../components/EditBookingForm";

const Dashboard = () => {
  const navigate = useNavigate();
  const [showBookingTable, setShowBookingTable] = useState(true);
  const [editingBooking, setEditingBooking] = useState(null);
  const [showHamburgerMenu, setShowHamburgerMenu] = useState(false);

  const handleEdit = (booking) => {
    setEditingBooking(booking);
    setShowBookingTable(false);
  };

  const handleSave = (updatedBooking) => {
    setEditingBooking(null);
    setShowBookingTable(true);
    // Update the booking table with the new information
    // You can fetch the updated bookings or update the state directly
  };

  const handleCancel = () => {
    setEditingBooking(null);
    setShowBookingTable(true);
  };

  const handleDelete = () => {
    setEditingBooking(null);
    setShowBookingTable(true);
  };

  const handleCreateBooking = () => {
    navigate("/create-booking");
  };

  const handleCreatePoll = () => {
    navigate("/create-poll");
  };

  const handleViewPolls = () => {
    navigate("/view-polls");
  };

  const toggleHamburgerMenu = () => {
    setShowHamburgerMenu((prev) => !prev);
  };

  // make hamburger menu disappear when expanding screen
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      setShowHamburgerMenu(false);
    }
  });

  return (
    <div className="w-full h-screen flex flex-col z-10">
      {!editingBooking && <Header />}
      <div className="flex-grow p-6">
        <div className="flex justify-between items-center mb-5">
          {!editingBooking && <h1 className="text-5xl font-bold">Dashboard</h1>}
          {!editingBooking ? (
            <>
              {" "}
              <div className=" hidden justify-end items-center mb-4 w-1/2 md:flex">
                <button
                  className="mr-8 px-4 py-2 text-white rounded font-bold bg-[#167cfd] hover:text-blue-300 text-lg"
                  onClick={handleCreateBooking}
                >
                  Create Booking
                </button>
                <button
                  className="mr-8 px-4 py-2 text-white rounded font-bold bg-[#167cfd] hover:text-blue-300 text-lg"
                  onClick={handleCreatePoll}
                >
                  Create Poll
                </button>
                <button
                  className="px-4 py-2 text-white rounded font-bold bg-[#167cfd] hover:text-blue-300 text-lg"
                  onClick={handleViewPolls}
                >
                  View Polls
                </button>
              </div>
              <div className="flex justify-end items-center mb-4 w-1/2 md:hidden" onClick={toggleHamburgerMenu}>
                <div className="flex items-center flex-col rounded-md shadow-md border p-4 bg-[#167cfd] hover:bg-blue-300">
                  <div className="w-10 h-1.5 bg-white my-1 rounded"></div>
                  <div className="w-10 h-1.5 bg-white my-1 rounded"></div>
                  <div className="w-10 h-1.5 bg-white my-1 rounded"></div>
                </div>
              </div>
            </>
          ) : null}
        </div>
        {showHamburgerMenu && (
          <div className="flex flex-col items-center space-y-4 bg-[#167cfd] p-4 rounded-md shadow-md border mb-5 z-10">
            <button
              className="px-4 py-2 text-white rounded font-bold bg-[#167cfd] hover:text-blue-300 text-lg z-10"
              onClick={handleCreateBooking}
            >
              Create Booking
            </button>
            <button
              className="px-4 py-2 text-white rounded font-bold bg-[#167cfd] hover:text-blue-300 text-lg z-10"
              onClick={handleCreatePoll}
            >
              Create Poll
            </button>
            <button
              className="px-4 py-2 text-white rounded font-bold bg-[#167cfd] hover:text-blue-300 text-lg z-10"
              onClick={handleViewPolls}
            >
              View Polls
            </button>
          </div>
        )}
        {showBookingTable && <BookingTable onEdit={handleEdit} />}
        {editingBooking && (
          <EditBookingForm
            booking={editingBooking}
            onSave={handleSave}
            onCancel={handleCancel}
            onDelete={handleDelete}
          />
        )}
      </div>
      {!editingBooking && <Footer />}
    </div>
  );
};

export default Dashboard;
