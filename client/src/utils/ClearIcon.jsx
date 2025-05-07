import React from "react";

const ClearIcon = () => {
  return (
    <svg
      className="w-5 h-5 text-gray-500 hover:text-red-500 cursor-pointer transition"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
};

export default ClearIcon;
