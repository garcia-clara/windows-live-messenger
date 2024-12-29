import React, { useEffect, useState } from 'react';
import online from '/assets/sounds/online.mp3';
import contacts from '../data/contacts.json';
import AvatarSmall from './AvatarSmall';

const getRandomContact = () => {
  const randomIndex = Math.floor(Math.random() * contacts.length);
  return contacts[randomIndex];
};

const Notification = ({ message, onClose }) => {
  const [randomContact, setRandomContact] = useState(null);

  useEffect(() => {
    setRandomContact(getRandomContact());
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  useEffect(() => {
    const audio = new Audio(online);
    audio.play().catch((error) => {
      console.error('Failed to play sound:', error);
    });
  }, []);

  if (!randomContact) {
    return null; // Or a loading spinner if you prefer
  }

  return (
    <div className="fixed bottom-4 right-4 bg-[#CFE4FA] px-4 py-2 rounded shadow cursor-pointer" onClick={onClose}>
      <div className="flex items-center">
        <AvatarSmall contactAvatar={randomContact.image} contactStatus={randomContact.status} />
        <div className="ml-3">
          <p className="font-bold">{randomContact.name}</p>
          <p className="text-sm text-gray-600">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default Notification;
