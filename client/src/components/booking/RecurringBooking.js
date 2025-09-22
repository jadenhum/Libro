
import React from "react";
import TitleField from "./fields/TitleField";
import DescriptionField from "./fields/DescriptionField";
import DaysOfWeekField from "./fields/DaysOfWeekField";
import AppointmentDurationField from "./fields/AppointmentDurationField";
import DateRangeField from "./fields/DateRangeField";
import TimeField from "./fields/TimeField";

const RecurringBooking = ({
  title,
  setTitle,
  description,
  setDescription,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  daysOfWeek,
  setDaysOfWeek,
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
      <DateRangeField
        firstLabel="Start Date"
        secondLabel="End Date"
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />
      <TimeField
        firstLabel="Start Time"
        secondLabel="End Time"
        startTime={startTime}
        setStartTime={setStartTime}
        endTime={endTime}
        setEndTime={setEndTime}
      />
      <DaysOfWeekField daysOfWeek={daysOfWeek} setDaysOfWeek={setDaysOfWeek} />
      <AppointmentDurationField
        appointmentDuration={appointmentDuration}
        setAppointmentDuration={setAppointmentDuration}
        startTime={startTime}
        endTime={endTime}
      />
    </div>
  );
};

export default RecurringBooking;
