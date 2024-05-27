import React, { useEffect, useState } from "react";
import defaultAvatar from "../assets/usertiles/default.png";
import statusFrames from "../imports/statusFrames";
import useUserStore from '../lib/user-store';

const AvatarSmall = () => {
  const { user, setUser } = useUserStore();
  const [userAvatar, setUserAvatar] = useState(defaultAvatar);
  const [userStatus, setUserStatus] = useState(statusFrames.OnlineSmall);

  useEffect(() => {
    if (user.image) {
      import(`${user.image}`)
        .then((image) => {
          setUserAvatar(image.default);
        })
        .catch(() => {
          setUserAvatar(defaultAvatar);
        });
    }

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

  return (
    <div className="h-[80px] w-[80px] relative">
      <img className="absolute m-[7px] rounded-sm w-[52px]" src={userAvatar} alt="Avatar"/>
      <img className="absolute w-full h-full bottom-2 right-2" src={userStatus} alt="" />
    </div>
  );
};

export default AvatarSmall;
