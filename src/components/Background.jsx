import React from 'react';
import bg from '../assets/bg.jpg';

const Background = ({ children }) => {
  return (
    // <div className="bg-no-repeat" style={{ backgroundImage: `url(${bg})`}}>
<div className="bg-gradient-to-b from-[#3bb2ea] via-white to-white>">
  {children}
</div>

  );
};

export default Background;
