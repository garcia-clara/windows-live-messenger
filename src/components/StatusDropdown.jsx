import React, { useState, useEffect, useRef } from 'react';
import online from '../assets/status/online-dot.png'; // Import your image
import busy from '../assets/status/busy-dot.png'; // Import additional images if needed
import away from '../assets/status/away-dot.png';
import offline from '../assets/status/offline-dot.png';
import arrow from '../assets/general/arrow.png';

const options = [
  { value: 'Available', label: 'Available', image: online },
  { value: 'Busy', label: 'Busy', image: busy },
  { value: 'Away', label: 'Away', image: away },
  { value: 'Offline', label: 'Appear offline', image: offline },
];

const StatusDropdown = () => {
    const [selectedOption, setSelectedOption] = useState(options[0]);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
  
    const handleOptionClick = (option) => {
      setSelectedOption(option);
      setIsOpen(false);
    };
  
    const handleToggleDropdown = () => {
      setIsOpen(!isOpen);
    };
  
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
  
    useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);
  
    return (
      <div className="relative inline-block" ref={dropdownRef}>
        <button
          onClick={handleToggleDropdown}
          className="ml-2">

          <img src={selectedOption.image} alt={selectedOption.label} className="inline-block mb-0.5 mr-2" />
          {selectedOption.label}
          <img src={arrow} className="inline-block mb-0.5 ml-2" />

        </button>

        {isOpen && (
          <ul className="absolute bg-white border border-gray-300 rounded shadow w-[150px] mt-1 z-10">
            {options.map((option) => (
              <li
                key={option.value}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                onClick={() => handleOptionClick(option)}
              >
                <img src={option.image} alt={option.label} className="inline-block mt-0.5 mr-2" />
                {option.label}
              </li>
            ))}
          </ul>
        )}

      </div>
    );
  };

export default StatusDropdown;
