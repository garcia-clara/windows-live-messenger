import React, { useEffect, useState } from "react";
import defaultAvatar from "../assets/usertiles/default.png";
import statusFrames from "../imports/statusFrames";
import useUserStore from '../lib/user-store';

const AvatarLarge = ({image, status}) =>  {
  const { user } = useUserStore();
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
      case "available":
        setUserStatus(statusFrames.OnlineLarge);
        break;
      case "offline":
        setUserStatus(statusFrames.OfflineLarge);
        break;
      case "away":
        setUserStatus(statusFrames.AwayLarge);
        break;
      case "busy":
        setUserStatus(statusFrames.BusyLarge);
        break;
      default:
        setUserStatus(statusFrames.OnlineLarge);
        break;
    }
  }, [user]);


  return (
    <div className="h-28 w-28">
      <img className="absolute ml-[9px] mt-[8px] w-24 rounded-sm" src={image ? image : userAvatar} alt="Avatar" />
      <img className="absolute ml-[-10px] mt-[-7px]" src={status ? status : userStatus} alt="Frame" />
      <p>{console.log(image)}</p>
    </div>
  );
};

export default AvatarLarge;

