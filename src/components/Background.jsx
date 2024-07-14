import React from 'react';
import bg from '/assets/background/background.jpg';
import colorSchemes from '../imports/colorSchemes';

const Background = ({ children }) => {
  const colorScheme = localStorage.getItem('colorScheme');

  const hexToRgba = (hex, alpha) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const colorSchemeRgba = colorScheme ? hexToRgba(colorScheme, 0.25) : 'rgba(255, 255, 255, 0.5)'; // Default to white with 50% opacity

  return (
    <div 
      className="relative h-screen bg-no-repeat bg-bottom bg-[length:100%_400px] bg-gradient-to-t via-white" 
      style={{ backgroundImage: `linear-gradient(to top, ${colorSchemeRgba}, white), url(${bg})`, backgroundSize: '100% 400px' }}
    >
      <div className="h-full bg-no-repeat bg-[length:100%_100px]" style={{ backgroundImage: `url(${bg})` }}>
        {children}
      </div>
    </div>
  );
};

export default Background;
