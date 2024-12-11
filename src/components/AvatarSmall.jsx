import React, { useEffect, useState } from "react";
import defaultAvatar from "/assets/usertiles/default.png";
import statusFrames from "../imports/statusFrames";

const AvatarSmall = ({ contactAvatar, contactStatus }) => {
  const discordId = localStorage.getItem('discord_id');

  const [userAvatar, setUserAvatar] = useState(localStorage.getItem('picture') || defaultAvatar);
  const [userStatus, setUserStatus] = useState(statusFrames.OnlineSmall);

  const [user, setUser] = useState({
    status: localStorage.getItem('status') || 'Available',
    picture: localStorage.getItem('picture') || (discordId ? `https://api.t3d.uk/discord/avatar/${discordId}` : defaultAvatar)
  });

  useEffect(() => {
    switch (user.status) {
      case "Available":
        setUserStatus(statusFrames.OnlineSmall);
        break;
      case "Offline":
        setUserStatus(statusFrames.OfflineSmall);
        break;
      case "Away":
        setUserStatus(statusFrames.AwaySmall);
        break;
      case "Busy":
        setUserStatus(statusFrames.BusySmall);
        break;
      default:
        setUserStatus(statusFrames.OnlineSmall);
        break;
    }
  }, [user]);

  useEffect(() => {
    setUserAvatar(user.picture);
  }, [user.picture]);

  return (
    <div className="h-[80px] w-[80px] relative">
      {/* Here we check if the discordId exists and then construct the avatar URL */}
      <img 
        className="absolute m-[7px] rounded-sm w-[52px]" 
        src={userAvatar || (discordId ? `https://api.t3d.uk/discord/avatar/${discordId}` : defaultAvatar)} 
        alt="Avatar" 
      />
      <img className="absolute w-full h-full bottom-2 right-2" src={contactStatus ? userStatus : statusFrames.OnlineSmall} alt="Status Frame" />
    </div>
  );
};

export default AvatarSmall;
