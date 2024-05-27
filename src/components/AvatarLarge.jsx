import React, { useEffect, useState } from "react";
import defaultAvatar from "../assets/usertiles/default.png";
import statusFrames from "../imports/statusFrames";
import useUserStore from "../lib/user-store";

const AvatarLarge = ({ image, status }) => {
  const { user } = useUserStore();
  const [userAvatar, setUserAvatar] = useState(defaultAvatar);
  const [userStatus, setUserStatus] = useState(statusFrames.OnlineSmall);
  const [contactAvatar, setContactAvatar] = useState(defaultAvatar);
  const [contactStatus, setContactStatus] = useState(statusFrames.OnlineSmall);

  useEffect(() => {
    console.log("useEffect triggered, image:", image); // Log the value of image

    // Check if user.image is available and load its avatar
    if (user.image) {
      import(`${user.image}`)
        .then((image) => {
          setUserAvatar(image.default);
        })
        .catch(() => {
          setUserAvatar(defaultAvatar);
        });
    }

    // Check if image is available and load its avatar
    if (image) {
      import(`${image}`)
        .then((img) => {
          setContactAvatar(img.default);
        })
        .catch(() => {
          setContactAvatar(defaultAvatar);
        });
    }

    // Update user status
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

    // Update contact status
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
  }, [user, image, status]); // Include image and status in the dependency array

  return (
    <div className="h-28 w-28">
      <img
        className="absolute ml-[9px] mt-[8px] w-24 rounded-sm"
        src={image ? contactAvatar : userAvatar}
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
