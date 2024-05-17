import React from "react";
import Avatar from "../components/Avatar";
import Background from "../components/Background";

const LoginPage = () => {
  return (
    <Background>
        <div className="flex flex-col items-center w-full pt-4">
            <Avatar />
            <p className="mt-8">Sign in</p>
            <p>Enter a name and a password to start chatting</p>
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />

            {/* Status */}
            <div className="flex">
                <p>Sign in as : </p>
                <select className="ml-2">
                    <option value="Available">Available</option>
                    <option value="Busy">Busy</option>
                    <option value="Away">Away</option>
                    <option value="Offline">Appear offline</option>
                </select>
            </div>

            {/* Checkboxes */}
            <div className="">
                <input type="checkbox" value="rememberme" name="rememberme" /> Remember me
                <input type="checkbox" value="rememberpassword" name="rememberpassword" /> Remember my password
                <input type="checkbox" value="signinautomatically" name="signinautomatically" /> Sign me in automatically
            </div>

            {/* Sign in button */}
            <button className="aerobutton">Sign In</button>
        </div>
    </Background>
  );
};

export default LoginPage;
