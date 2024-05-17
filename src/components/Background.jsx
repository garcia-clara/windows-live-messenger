import React from 'react';
import bg from '../assets/bg1.jpg';

const Background = ({ children }) => {
  return (
<div className="bg-no-repeat bg-[length:100%_100px] h-screen" style={{ backgroundImage: `url(${bg})`}}>
  {children}
</div>

  );
};

export default Background;
