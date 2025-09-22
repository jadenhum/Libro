
import React from "react";

const TypeField = ({ type, setType }) => {
  return (
    <div>
      <label className="block text-gray-700 mb-2">Type</label>
      <div className="flex space-x-2">
        <button
          type="button"
          className={`px-4 py-2 ${
            type === "one-time" ? "bg-red-600 text-white" : "bg-gray-200"
          } rounded`}
          onClick={() => setType("one-time")}
        >
          One-time
        </button>
        <button
          type="button"
          className={`px-4 py-2 ${
            type === "recurring" ? "bg-red-600 text-white" : "bg-gray-200"
          } rounded`}
          onClick={() => setType("recurring")}
        >
          Recurring
        </button>
        <button
          type="button"
          className={`px-4 py-2 ${
            type === "equipment" ? "bg-red-600 text-white" : "bg-gray-200"
          } rounded`}
          onClick={() => setType("equipment")}
        >
          Equipment
        </button>
      </div>
    </div>
  );
};

export default TypeField;
