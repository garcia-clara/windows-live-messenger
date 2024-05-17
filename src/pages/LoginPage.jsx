import React from "react";
import Avatar from "../components/Avatar";
import Background from "../components/Background";
import StatusDropdown from "../components/StatusDropdown";
import { useNavigate } from 'react-router-dom';
import "7.css/dist/7.scoped.css"

const LoginPage = () => {

    const navigate = useNavigate();

    const handleSignIn = () => {
      navigate('/');
    };

  return (
    <Background>
        <div className="flex flex-col items-center w-full pt-4 win7 font-sans text-base">
            <Avatar />
            <p className="mt-4 text-xl text-[#1D2F7F]">Sign in</p>
            <p className="mb-4">Enter a name and a password to start chatting</p>

            <fieldset className="">
                {/* Connexion inputs */}
                <input className="w-full placeholder:italic" type="text" placeholder="Username" />
                <input className="w-full mt-2 placeholder:italic" type="password" placeholder="Password" />

                {/* Status */}
                <div className="flex my-4">
                    <p>Sign in as : </p>
                    <StatusDropdown/>
                </div>

                {/* Checkboxes */}
                <div>
                    <div className="mt-2">
                        <input type="checkbox" id="rememberme"/>
                        <label for="rememberme">Remember me</label>
                    </div>
                    <div className="mt-2">
                        <input type="checkbox" id="rememberpassword"/>
                        <label for="rememberpassword">Remember my password</label>
                    </div>
                    <div className="mt-2">
                        <input type="checkbox" id="signinautomatically"/>
                        <label for="signinautomatically">Sign me in automatically</label>
                    </div>
                </div>
            </fieldset>

            {/* Sign in button */}
            <button className="mt-4" onClick={handleSignIn}>Sign in</button>
        </div>
    </Background>
  );
};

export default LoginPage;
