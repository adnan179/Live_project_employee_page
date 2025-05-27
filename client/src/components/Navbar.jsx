import React, { useState } from 'react';
import SearchIcon from "../utils/SearchIcon";
import ClearIcon from "../utils/ClearIcon";
import { useLocation } from 'react-router';

const Navbar = ({searchTerm, setSearchTerm }) => {
  const [inputValue, setInputValue] = useState(searchTerm);
  const location = useLocation();

  const handleChange = (e) => {
    setInputValue(e.target.value);
    setSearchTerm(e.target.value);
  };

  const handleClear = () => {
    setInputValue('');
    setSearchTerm('');
  };

  return (
    <div className="w-full md:h-[80px] md:px-10 px-5 py-3 bg-gray-100 flex sticky inset-0 justify-between items-center">
      <div className="flex gap-3 items-center">
        <h1 className="md:text-[48px] text-[28px] font-mea text-blue-500">Song River</h1>
        <h2 className="text-[24px] md:flex hidden font-semibold ml-10">Employee Directory</h2>
      </div>

      {location.pathname.includes("employees") && (
        <div className="relative md:w-[300px] w-[150px]">
          {/* Search Icon inside input */}
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <SearchIcon />
          </div>

          <input
            type="text"
            value={inputValue}
            onChange={handleChange}
            placeholder="Enter employee name..."
            className="w-full pl-10 pr-8 py-2 md:text-lg text-[10px] rounded-md shadow-md border focus:outline-none focus:ring-1 focus:ring-blue-500"
          />

          {/* Clear Icon on the right */}
          {inputValue && (
            <div onClick={handleClear} className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <ClearIcon />
            </div>
          )}
        </div>
      )}
      
    </div>
  );
};

export default Navbar;