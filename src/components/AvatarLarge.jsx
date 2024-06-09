import React, { useEffect, useState } from "react";
import defaultAvatar from "/assets/usertiles/default.png";
import statusFrames from "../imports/statusFrames";

const AvatarLarge = ({ image, status }) => {
  const [userStatus, setUserStatus] = useState(statusFrames.OnlineSmall);
  const [contactStatus, setContactStatus] = useState(statusFrames.OnlineSmall);

  useEffect(() => {
   
    switch (localStorage.getItem('status')) {
      case "Available":
        setUserStatus(statusFrames.OnlineLarge);
        break;
      case "Offline":
        setUserStatus(statusFrames.OfflineLarge);
        break;
      case "Away":
        setUserStatus(statusFrames.AwayLarge);
        break;
      case "Busy":
        setUserStatus(statusFrames.BusyLarge);
        break;
      default:
        setUserStatus(statusFrames.OfflineLarge);
        break;
    }

    switch (status) {
      case "available":
        setContactStatus(statusFrames.OnlineLarge);
        break;
      case "offline":
        setContactStatus(statusFrames.OfflineLarge);
        break;
      case "away":
        setContactStatus(statusFrames.AwayLarge);
        break;
      case "busy":
        setContactStatus(statusFrames.BusyLarge);
        break;
      default:
        setContactStatus(statusFrames.OnlineLarge);
        break;
    }
  }, [status]);

  return (
    <div className="h-28 w-28">
      <img
        className="absolute ml-[9px] mt-[8px] w-24 rounded-sm"
        src={image || defaultAvatar}
        alt="Avatar"
      />
      <img
        className="absolute ml-[-10px] mt-[-7px]"
        src={status ? contactStatus : userStatus}
        alt="Frame"
      />
    </div>
  );
};

export default AvatarLarge;
