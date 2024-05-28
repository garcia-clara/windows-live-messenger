import React, { useState } from 'react';
import AvatarLarge from "../components/AvatarLarge";
import statusFrames from "../imports/statusFrames";
import Background from "../components/Background";
import Dropdown from "../components/Dropdown";
import { useNavigate } from "react-router-dom";
import "7.css/dist/7.scoped.css";
import useUserStore from '../lib/user-store';
import bg from '../assets/bg1.jpg';

const LoginPage = () => {
  const navigate = useNavigate();
  const clearUser = useUserStore(state => state.clearUser);

  clearUser();

  const handleSignIn = () => {
    navigate("/");
  };

  const options = [
    { value: 'Available', label: 'Available', image: statusFrames.onlineDot },
    { value: 'Busy', label: 'Busy', image: statusFrames.busyDot },
    { value: 'Away', label: 'Away', image: statusFrames.awayDot },
    { value: 'Offline', label: 'Appear offline', image: statusFrames.offlineDot },
  ];


  return (
    <Background>
      <div className="bg-no-repeat bg-[length:100%_100px] h-screen" style={{ backgroundImage: `url(${bg})`}}>
      <div className="flex flex-col items-center w-full pt-4 win7 font-sans text-base">
        <AvatarLarge />
        <p className="mt-4 text-xl text-[#1D2F7F]">Sign in</p>
        <p className="mb-4">Enter a name and a password to start chatting</p>

        <fieldset className="">
          {/* Connexion inputs */}
          <input
            className="w-full placeholder:italic"
            type="text"
            placeholder="Username"
          />
          <input
            className="w-full mt-2 placeholder:italic"
            type="password"
            placeholder="Password"
          />

          {/* Status */}
          <div className="flex my-4">
            <p>Sign in as: </p>
            <Dropdown 
              options={options} 
            />
          </div>

          {/* Checkboxes */}
          <div>
            <div className="mt-2">
              <input type="checkbox" id="rememberme" />
              <label htmlFor="rememberme">Remember me</label>
            </div>
            <div className="mt-2">
              <input type="checkbox" id="rememberpassword" />
              <label htmlFor="rememberpassword">Remember my password</label>
            </div>
            <div className="mt-2">
              <input type="checkbox" id="signinautomatically" />
              <label htmlFor="signinautomatically">Sign me in automatically</label>
            </div>
          </div>
        </fieldset>

        {/* Sign in button */}
        <button className="mt-4" onClick={handleSignIn}>
          Sign in
        </button>
      </div>
      </div>
    </Background>
  );
};

export default LoginPage;
