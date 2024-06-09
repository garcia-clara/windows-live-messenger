import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import arrow from '/assets/general/arrow.png';
import ChangeDisplayPictureModal from './ChangeDisplayPictureModal';

const Dropdown = ({ options }) => {
  const [user, setUser] = useState({
    email: localStorage.getItem('email') || '',
    message: localStorage.getItem('message') || '',
    status: localStorage.getItem('status') || 'Available',
    name: localStorage.getItem('name') || ''
  });

  const [showModal, setShowModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options.find(option => option.value === user.status) || options[0]);
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleOptionClick = (option) => {
    switch(option.value) {
      case 'Available':
      case 'Busy':
      case 'Away':
      case 'Offline':
        setSelectedOption(option);
        localStorage.setItem('status', option.value);
        break;
      case 'Sign out':
        localStorage.clear();
        navigate('/login');
        break;
      case 'ChangeDisplayPicture':
        setShowModal(true);
        break;
      default:
        break;
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
      <div onClick={handleToggleDropdown} className="flex aerobutton cursor-pointer items-center px-1 ml-1 white-light">
        {!user.email ? (
          <div className="flex items-center">
            <img className="inline-block mt-0.5 mr-2 w-2" src={selectedOption.image} alt="" />
            <p className="capitalize">{selectedOption.label}</p>
          </div>
        ) : (
          <div className="flex items-center">
            <p className="text-lg">{user.name !== '' ? user.name : user.email}</p>
            <p className="ml-1 capitalize">({selectedOption.label})</p>
          </div>
        )}
        <img src={arrow} className="inline-block mb-0.5 ml-2" alt="Toggle Dropdown" />
      </div>

      {isOpen && (
        <ul className="absolute bg-white border border-gray-300 rounded shadow w-[300px] mt-1 z-10 py-1">
          {options.map((option, index) => (
            option.separator ? (
              <li key={`separator-${index}`} className="border-t my-1"></li>
            ) : (
              <li
                key={option.value}
                className="px-4 hover:bg-gray-100 cursor-pointer flex items-center"
                onClick={() => handleOptionClick(option)}
              >
                {option.image ? (
                  <img src={option.image} alt={option.label} className="inline-block mt-0.5 mr-2 w-2" />
                ) : (
                  <div className="w-4" />
                )}
                {option.label}
              </li>
            )
          ))}
        </ul>
      )}

      {showModal && <ChangeDisplayPictureModal setShowModal={setShowModal} />}
    </div>
  );
};

export default Dropdown;
