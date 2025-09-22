
import React from "react";
import SingleDateField from "./SingleDateField";
import { addDays } from "date-fns";

const DateRangeField = ({
  label,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  firstLabel,
  secondLabel,
}) => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex space-x-4">
        <SingleDateField
          label={firstLabel}
          date={startDate}
          setDate={setStartDate}
        />
        <SingleDateField
          label={secondLabel}
          date={endDate}
          setDate={setEndDate}
          minDate={addDays(new Date(startDate), 1)}
        />
      </div>
    </div>
  );
};

export default DateRangeField;
