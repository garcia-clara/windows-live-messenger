import React from 'react';
import bg from '/assets/background/background.jpg';

const Background = ({ children }) => {
  return (
    <div className='relative bg-no-repeat bg-bottom bg-[length:100%_400px] bg-gradient-to-t from-[#d1f1ff] via-white h-screen'>
      <div className="bg-no-repeat bg-[length:100%_100px] h-full" style={{ backgroundImage: `url(${bg})`}}>
        {children}
      </div>
    </div>
  );
};

export default Background;
