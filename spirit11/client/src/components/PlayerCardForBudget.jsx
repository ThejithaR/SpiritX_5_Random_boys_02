import React from "react";

const PlayerCardForBudget = ({ name, university, category, value }) => {
  return (
    <div className="flex justify-between items-center bg-gray-100 shadow-md rounded-lg p-4 my-2 w-full border border-gray-300">
      <span className="text-gray-800 font-medium">{name}</span>
      <span className="text-gray-600">{university}</span>
      <span className="text-gray-600">{category}</span>
      <span className="text-green-600 font-semibold">Rs {value.toLocaleString()}</span>
    </div>
  );
};

export default PlayerCardForBudget;
