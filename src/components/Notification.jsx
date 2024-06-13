// Notification.js
import React, { useEffect } from 'react';

const Notification = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000); // Hide notification after 5 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  useEffect(() => {
    const audio = new Audio('/notification-sound.mp3'); // Path to your notification sound
    audio.play();
  }, []);

  return (
    <div className="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded shadow">
      {message}
    </div>
  );
};

export default Notification;
