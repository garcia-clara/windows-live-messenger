import React, { useEffect, useState } from 'react';
import defaultAvatar from '/assets/usertiles/default.png';
import statusFrames from '../imports/statusFrames';

const AvatarSmall = () => {
  const discordId = localStorage.getItem('discord_id');

  const [user, setUser] = useState({
    status: localStorage.getItem('status') || 'Available',
    picture: localStorage.getItem('picture') || (discordId ? `https://api.t3d.uk/discord/avatar/${discordId}` : defaultAvatar),
  });

  const [userStatus, setUserStatus] = useState(statusFrames.OnlineSmall);

  useEffect(() => {
    const interval = setInterval(() => {
      const newStatus = localStorage.getItem('status') || 'Available';
      const newPicture =
        localStorage.getItem('picture') || (discordId ? `https://api.t3d.uk/discord/avatar/${discordId}` : defaultAvatar);

      setUser((prevUser) => {
        if (prevUser.status !== newStatus || prevUser.picture !== newPicture) {
          return { status: newStatus, picture: newPicture };
        }
        return prevUser;
      });
    }, 500);

    return () => clearInterval(interval);
  }, [discordId]);

  useEffect(() => {
    switch (user.status) {
      case 'Available':
        setUserStatus(statusFrames.OnlineSmall);
        break;
      case 'Offline':
        setUserStatus(statusFrames.OfflineSmall);
        break;
      case 'Away':
        setUserStatus(statusFrames.AwaySmall);
        break;
      case 'Busy':
        setUserStatus(statusFrames.BusySmall);
        break;
      default:
        setUserStatus(statusFrames.OnlineSmall);
        break;
    }
  }, [user.status]);

  return (
    <div className="h-[80px] w-[80px] relative">
      <img className="absolute m-[7px] rounded-sm w-[52px]" src={user.picture} alt="Avatar" />
      <img className="absolute w-full h-full bottom-2 right-2" src={userStatus} alt="Status Frame" />
    </div>
  );
};

export default AvatarSmall;
