import React from "react";

const TitleField = ({ title, setTitle }) => {
  return (
    <div>
      <label className="block text-gray-700">Title</label>
      <input
        type="text"
        className="w-full px-4 py-2 border rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
    </div>
  );
};

export default TitleField;
