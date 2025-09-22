
import React from "react";
import TitleField from "./fields/TitleField";
import DescriptionField from "./fields/DescriptionField";
import SingleDateField from "./fields/SingleDateField";
import TimeField from "./fields/TimeField";
import AppointmentDurationField from "./fields/AppointmentDurationField";

const OneTimeBooking = ({
  title,
  setTitle,
  description,
  setDescription,
  date,
  setDate,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  appointmentDuration,
  setAppointmentDuration,
}) => {
  return (
    <div className="w-full max-w-md">
      <div className="mb-4">
        <TitleField title={title} setTitle={setTitle} />
      </div>
      <DescriptionField
        description={description}
        setDescription={setDescription}
      />
      <SingleDateField label="Date" date={date} setDate={setDate} />
      <TimeField
        firstLabel="Start Time"
        secondLabel="End Time"
        startTime={startTime}
        setStartTime={setStartTime}
        endTime={endTime}
        setEndTime={setEndTime}
      />
      <AppointmentDurationField
        appointmentDuration={appointmentDuration}
        setAppointmentDuration={setAppointmentDuration}
        startTime={startTime}
        endTime={endTime}
      />
    </div>
  );
};

export default OneTimeBooking;
