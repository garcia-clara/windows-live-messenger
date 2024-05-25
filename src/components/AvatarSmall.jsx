import React, { useState, useEffect } from "react";
import defaultAvatar from "../assets/usertiles/default.png";
import userData from "../data/user.json";
import statusFrames from "../imports/statusFrames";

const AvatarSmall = () => {
  const [userAvatar, setUserAvatar] = useState(defaultAvatar);
  const [userStatus, setUserStatus] = useState(statusFrames.OnlineSmall);

  useEffect(() => {
    import(`${userData[0].image}`)
      .then((image) => {
        setUserAvatar(image.default);
      })
      .catch((error) => {
        setUserAvatar(defaultAvatar);
      });

    switch (userData[0].status) {
      case "online":
        setUserStatus(statusFrames.OnlineSmall);
        break;
      case "offline":
        setUserStatus(statusFrames.OfflineSmall);
        break;
      case "away":
        setUserStatus(statusFrames.AwaySmall);
        break;
      case "busy":
        setUserStatus(statusFrames.BusySmall);
        break;
      default:
        setUserStatus(statusFrames.OnlineSmall);
        break;
    }
  }, []);

  return (
    <div className="h-[80px] w-[80px] relative">
      <img className="absolute m-[7px] rounded-sm w-[52px]" src={userAvatar} alt="Avatar"/>
      <img className="absolute w-full h-full bottom-2 right-2" src={userStatus} alt="" />
    </div>
  );
};

export default AvatarSmall;
