import React from "react";
import avatar from "../assets/chat/1531.png";
import frame from "../assets/background/frame_96.png";

const Avatar = () => (
  <div className="h-28 w-28">
    <img className="absolute m-[9px] rounded-sm" src={avatar} alt="Avatar" />
    <img className="absolute" src={frame} alt="Frame" />
  </div>
);

export default Avatar;
