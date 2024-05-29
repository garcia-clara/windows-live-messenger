import React, { useState, useEffect, useRef } from 'react';
import AvatarSmall from "../components/AvatarSmall";
import arrow from "../assets/general/arrow.png";
import Dropdown from './Dropdown';
import statusFrames from "../imports/statusFrames";
import useUserStore from '../lib/user-store';

const UserInformation = () => {
    const user = useUserStore(state => state.user);
    const setUser = useUserStore(state => state.setUser);
    const [isEditing, setIsEditing] = useState(false);
    const [message, setMessage] = useState(user.message);
    const inputRef = useRef(null);

    const options = [
        { value: 'Available', label: 'Available', image: statusFrames.onlineDot },
        { value: 'Busy', label: 'Busy', image: statusFrames.busyDot },
        { value: 'Away', label: 'Away', image: statusFrames.awayDot },
        { value: 'Offline', label: 'Appear offline', image: statusFrames.offlineDot },
        { value: 'Sign out', label: 'Sign out' },
        { value: 'ChangeDisplayPicture', label: 'Change display picture...' }
    ];

    const handleMessageClick = () => {
        setIsEditing(true);
    };

    const handleInputChange = (e) => {
        setMessage(e.target.value);
        adjustInputWidth();
    };

    const handleInputBlur = () => {
        setUser({ ...user, message });
        setIsEditing(false);
    };

    const handleInputKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleInputBlur();
        }
    };

    const adjustInputWidth = () => {
        if (inputRef.current) {
            inputRef.current.style.width = `${inputRef.current.value.length}ch`;
        }
    };

    useEffect(() => {
        if (isEditing) {
            adjustInputWidth();
        }
    }, [isEditing]);

    return (
        <div className="flex">
            <AvatarSmall />
            <div className='ml-[-6px]'>
                <div className="flex items-center">
                    <Dropdown options={options} />
                </div>
                <div className="flex aerobutton pl-1 items-center white-light">
                    {isEditing ? (
                        <input
                            ref={inputRef}
                            type="text"
                            value={message}
                            onChange={handleInputChange}
                            onBlur={handleInputBlur}
                            onKeyPress={handleInputKeyPress}
                            autoFocus
                            className="border border-gray-300 rounded outline-none"
                            style={{ width: `${message.length}ch` }}
                        />
                    ) : (
                        <p onClick={handleMessageClick} className="cursor-pointer">{user.message}</p>
                    )}
                    <div className="ml-1">
                        <img src={arrow} alt="arrow icon" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserInformation;
