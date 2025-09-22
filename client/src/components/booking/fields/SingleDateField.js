
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { subDays, format } from "date-fns";

const SingleDateField = ({ label, date, setDate, minDate }) => {
  const handleDateChange = (date) => {
    const formattedDate = format(date, "yyyy/MM/dd", {
      awareOfUnicodeTokens: true,
    });
    setDate(formattedDate);
  };

  return (
    <div className="flex flex-col items-center mb-4">
      <label className="block text-gray-700 mb-2">{label}</label>
      <DatePicker
        selected={date}
        onChange={handleDateChange}
        inline
        disabledKeyboardNavigation
        minDate={minDate || subDays(new Date(), 0)}
      />
    </div>
  );
};

export default SingleDateField;
