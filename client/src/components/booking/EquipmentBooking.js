
import React from "react";
import TitleField from "./fields/TitleField";
import DescriptionField from "./fields/DescriptionField";
import TimeField from "./fields/TimeField";
import DateRangeField from "./fields/DateRangeField";

const EquipmentBooking = ({
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
}) => {
  return (
    <div className="w-full max-w-md">
      <div className="mb-4>">
        <TitleField title={title} setTitle={setTitle} />
      </div>
      <DescriptionField
        description={description}
        setDescription={setDescription}
      />
      <DateRangeField
        firstLabel="Borrow Date"
        secondLabel="Return Date"
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />
      <TimeField
        firstLabel="Borrow Time"
        secondLabel="Return Time"
        startTime={startTime}
        setStartTime={setStartTime}
        endTime={endTime}
        setEndTime={setEndTime}
      />
    </div>
  );
};

export default EquipmentBooking;
