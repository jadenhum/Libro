
import React from "react";

const DescriptionField = ({ description, setDescription }) => {
  return (
    <div>
      <label className="block text-gray-700">Description</label>
      <textarea
        className="w-full px-4 py-2 border rounded"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
    </div>
  );
};

export default DescriptionField;
