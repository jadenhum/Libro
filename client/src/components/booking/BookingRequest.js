import React from "react";
import SingleDateField from "./fields/SingleDateField";
import TimeField from "./fields/TimeField";

const BookingRequest = ({ date, setDate, startTime, setStartTime, endTime, setEndTime }) => {
  return (
    <div className="w-full max-w-md">
      <SingleDateField label="Date" date={date} setDate={setDate} />
      <TimeField
        firstLabel="Start Time"
        secondLabel="End Time"
        startTime={startTime}
        setStartTime={setStartTime}
        endTime={endTime}
        setEndTime={setEndTime}
      />
    </div>
  );
};

export default BookingRequest;
