import React from "react";
import avatar from "../assets/chat/1531.png";
import frame from "../assets/background/frame_48.png";

const AvatarSmall = () => (
  <div className="h-[70px] w-[70px]">
    <img className="absolute m-[4px] rounded-sm w-[49px]" src={avatar} alt="Avatar" />
    <img className="absolute" src={frame} alt="Frame" />
  </div>
);

export default AvatarSmall;

