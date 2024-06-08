import React, { useEffect, useState } from "react";
import defaultAvatar from "../assets/usertiles/default.png";
import statusFrames from "../imports/statusFrames";
import useUserStore from "../lib/user-store";

const AvatarLarge = ({ image, status }) => {
  const { user } = useUserStore();
  const [userAvatar, setUserAvatar] = useState(defaultAvatar);
  const [userStatus, setUserStatus] = useState(statusFrames.OnlineSmall);
  const [contactStatus, setContactStatus] = useState(statusFrames.OnlineSmall);
  const imagesrc = "../assets/usertiles/0c5319e7147890e45265faad3b17701c1de71b12.png";

  useEffect(() => {
   
    switch (user.status) {
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
        setUserStatus(statusFrames.OnlineLarge);
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
  }, [user, status]); // Include only user and status in the dependency array

  return (
    <div className="h-28 w-28">
      {console.log(image)}
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
