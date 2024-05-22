import React, { useState, useEffect } from 'react';
import avatar from "../assets/chat/1531.png";
import frame from "../assets/background/frame_48.png";
import userData from '../data/user.json';

const AvatarSmall = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
      if (userData.length > 0) {
          setUser(userData[0]); // Assuming you want to display the first user in the array
      }
  }, []);

  return(
  <div className="h-[70px] w-[70px]">
    <img className="absolute m-[4px] rounded-sm w-[49px]" src={user.image ? user.image : avatar} alt="Avatar" />
    <img className="absolute" src={frame} alt="Frame" />
  </div>
  );

};

export default AvatarSmall;

