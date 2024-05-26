import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import arrow from '../assets/general/arrow.png';
import data from '../data/user.json';

const Dropdown = ({ options, name, status, setUser }) => {
  const [selectedOption, setSelectedOption] = useState(options.find(option => option.value === status) || options[0]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleOptionClick = (option, event) => {
    if (option.value !== "Sign out") {
      setSelectedOption(option);
      setUser(prevUser => ({
        ...prevUser,
        status: option.value
      }));
    } else {
      navigate('/login');
    }
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
      <div onClick={handleToggleDropdown} className="flex aerobutton cursor-pointer items-center px-1 white-light">
        {!name ? (
          <div className="flex items-center">
            <img src={selectedOption.image} alt={selectedOption.label} className="inline-block mb-0.5 mr-2 w-2" />
            {selectedOption.label}
          </div>
        ) : (
          <div className="flex items-center">
            <p className="text-lg">{name}</p>
            <p className="ml-1 capitalize">({selectedOption.label})</p>
          </div>
        )}
        <img src={arrow} className="inline-block mb-0.5 ml-2" />
      </div>

      {isOpen && (
        <ul className="absolute bg-white border border-gray-300 rounded shadow w-[150px] mt-1 z-10 py-1">
          {options.map((option) => (
            <li
              key={option.value}
              className="px-4 hover:bg-gray-100 cursor-pointer flex items-center"
              onClick={(event) => handleOptionClick(option, event)}
            >
              {option.image ? (
                <img src={option.image} alt={option.label} className="inline-block mt-0.5 mr-2 w-2" />
              ) : (
                <div className='w-4' />
              )}
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
