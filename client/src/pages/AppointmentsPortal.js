
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../config/config";
import apiRequest from "../util/api";

const AppointmentsPortal = () => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    //Verify student code and redirect to student's appointments page if applicable
    e.preventDefault();
    setLoading(true);
    if (!code) {
      setError("Please enter a student code");
      setLoading(false);
      return;
    }
    try {
      setError("");
      const response = await apiRequest(config.appointmentsByStudentCode(code));
      const data = await response.json();

      if (response.ok) {
        if (data.appointments.length > 0) {
          // Redirect to the student's appointments page
          navigate(`/appointments/${code}`);
        } else {
          setError("We couldn't find any appointments for this student code.");
        }
      } else {
        setError("We couldn't find any appointments for this student code.");
      }
    } catch (error1) {
      setError("error verifying code:" + error1.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
        <div className="text-left md:w-1/2 md:ml-8">
          <h1 className="text-6xl font-bold mb-4 leading-snug">Appointments</h1>
          <p className="text-2xl leading-relaxed">Enter a student code to view your appointments</p>
        </div>
        <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700">Student code</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-red-600">{error}</p>}
            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-400"
                onClick={(e) => handleSubmit(e, true)}
              >
                {loading ? "Verifying code..." : "View Appointments"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AppointmentsPortal;
