import React, { useState, useRef, useEffect } from "react";

const SearchBar = ({ initialValue }) => {
  const [value, setValue] = useState(initialValue);
  const [isReset, setIsReset] = useState(false);
  const inputRef = useRef(null);

  const handleInputClick = () => {
    setIsReset(true);
    setValue("");
  };

  const handleClickOutside = (event) => {
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      setIsReset(false);
      setValue(initialValue);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <input
      className="p-1.5 border rounded-sm w-full searchbar bg-transparent"
      ref={inputRef}
      type="text"
      value={isReset ? "" : value}
      onClick={handleInputClick}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default SearchBar;
