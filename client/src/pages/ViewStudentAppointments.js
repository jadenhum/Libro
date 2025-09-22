import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import config from "../config/config";
import apiRequest from "../util/api";

const AppointmentCard = ({ appointment }) => (
  <div className="p-7">
    <div>
      <div>
        <h2 className="text-xl font-semibold mb-3">Appointment Details</h2>
        <div className="grid grid-cols-2 gap-3">
          <p>
            <strong>Date: </strong>
            {new Date(appointment.date).toLocaleDateString()}
          </p>
          <p>
            <strong>Reserver ID: </strong>
            {appointment.reserverIdentifier}
          </p>
          <p>
            <strong>Time: </strong>
            {appointment.startTime} - {appointment.endTime}
          </p>
          <p>
            <strong>Student Code: </strong>
            {appointment.studentCode}
          </p>
          <p>
            <strong>Duration: </strong>
            {appointment.appointmentDuration} minutes
          </p>
          <p>
            <strong>Contact: </strong>
            {appointment.reserverContact || "N/A"}
          </p>
        </div>
      </div>
    </div>
  </div>
);

const ViewStudentAppointments = () => {
  const [pastAppointments, setPastAppointments] = useState([]);
  const [activeAppointments, setActiveAppointments] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const { studentCode } = useParams();
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await apiRequest(config.appointmentsByStudentCode(studentCode));
        const data = await response.json();

        if (response.ok) {
          const now = new Date();
          const sorted = data.appointments.reduce(
            (acc, appointment) => {
              const appointmentDate = new Date(appointment.date);
              if (appointmentDate >= now) {
                acc.active.push(appointment);
              } else {
                acc.past.push(appointment);
              }
              return acc;
            },
            { active: [], past: [] }
          );

          setActiveAppointments(sorted.active);
          setPastAppointments(sorted.past);
        } else {
          setError(data.message || "failed to fetch appts");
        }
      } catch (error) {
        setError("error fetching appts:" + error.message);
      } finally {
        setLoading(false);
      }
    };

    if (studentCode) {
      fetchAppointments();
    }
  }, [studentCode]);
  if (error) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <p className="text-2xl">{error}</p>
      </div>
    );
  }
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <p className="text-2xl">loading appointments..</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col h-[100vh]">
      <Header />
      <div className=" flex flex-grow p-6 mb-2">
        <div className="flex flex-col w-full mx-auto">
          <h1 className="font-bold text-5xl mb-8">Appointments</h1>

          {/* active appointments */}
          <div className="mb-8">
            <h2 className="text-1xl font-bold text-gray-500 mb-2">Active Appointments</h2>
            <div className="bg-white rounded-lg shadow border-2 border-gray-200">
              {activeAppointments.length === 0 ? (
                <p className="p-5">No active appointments</p>
              ) : (
                <div className="flex flex-col divide-y divide-gray-400">
                  {activeAppointments.map((appointment) => (
                    <AppointmentCard key={appointment._id} appointment={appointment} />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* past appointments */}
          <div>
            <h2 className="text-1xl font-bold text-gray-500 mb-2">Appointment History</h2>
            <div className="bg-white rounded-lg shadow border-2 border-gray-200">
              {pastAppointments.length === 0 ? (
                <p className="p-5">No past appointments</p>
              ) : (
                <div className="divide-y divide-gray-400">
                  {pastAppointments.map((appointment) => (
                    <AppointmentCard key={appointment._id} appointment={appointment} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
export default ViewStudentAppointments;
