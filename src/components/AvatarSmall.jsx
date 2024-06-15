import React, { useEffect, useState } from "react";
import defaultAvatar from "/assets/usertiles/default.png";
import statusFrames from "../imports/statusFrames";

const AvatarSmall = (contactAvatar, contactStatus) => {
  const [userAvatar, setUserAvatar] = useState(localStorage.getItem('picture') || defaultAvatar);
  const [userStatus, setUserStatus] = useState(statusFrames.OnlineSmall);

  const [user, setUser] = useState({
    status: localStorage.getItem('status') || 'Available',
    picture: localStorage.getItem('picture') || defaultAvatar
  });

  useEffect(() => {
    console.log(user.status);
    switch (user.status) {
      case "Available":
        console.log("online");
        setUserStatus(statusFrames.OnlineSmall);
        break;
      case "Offline":
        console.log("offline");
        setUserStatus(statusFrames.OfflineSmall);
        break;
      case "Away":
        console.log("away");
        setUserStatus(statusFrames.AwaySmall);
        break;
      case "Busy":
        console.log("busy");
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
      <img className="absolute m-[7px] rounded-sm w-[52px]" src={contactAvatar && userAvatar} alt="Avatar" />
      <img className="absolute w-full h-full bottom-2 right-2" src={contactStatus && userStatus} alt="Status Frame" />
    </div>
  );
};

export default AvatarSmall;
