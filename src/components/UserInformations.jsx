// UserInformation.jsx
import React, { useState, useEffect, useRef } from 'react';
import AvatarSmall from "../components/AvatarSmall";
import arrow from "/assets/general/arrow.png";
import Dropdown from './Dropdown';
import statusFrames from "../imports/statusFrames";
import { replaceEmoticons } from '../helpers/replaceEmoticons';

const UserInformation = () => {
    const [user, setUser] = useState({
        message: localStorage.getItem('message'),
        status: localStorage.getItem('status') || 'Available',
        name: localStorage.getItem('name')
    });

    const [isEditing, setIsEditing] = useState(false);
    const [message, setMessage] = useState(user.message);
    const inputRef = useRef(null);

    const options = [
        { value: 'Available', label: 'Available', image: statusFrames.onlineDot },
        { value: 'Busy', label: 'Busy', image: statusFrames.busyDot },
        { value: 'Away', label: 'Away', image: statusFrames.awayDot },
        { value: 'Offline', label: 'Appear offline', image: statusFrames.offlineDot },
        { separator: true },
        { value: 'Sign out', label: 'Sign out' },
        { separator: true },
        { value: 'ChangeDisplayPicture', label: 'Change display picture...' },
        { value: 'ChangeScene', label: 'Change scene...' },
        { value: 'ChangeDisplayName', label: 'Change display name...' }
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
        localStorage.setItem('message', message);
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

    const handleStatusChange = (status) => {
        setUser({ ...user, status });
        localStorage.setItem('status', status);
    };
    return (
        <div className="flex">
            <AvatarSmall />
            <div className='ml-[-12px]'>
                <div className="flex items-center">
                    <Dropdown 
                        options={options} 
                        value={user.status}
                        onChange={handleStatusChange} 
                    />
                </div>
                <div className="flex aerobutton pl-1 ml-1 items-center white-light" onClick={handleMessageClick}>
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
                        <p className="cursor-pointer flex gap-1">
                            {replaceEmoticons(message) ? 'Share a quick message...' : replaceEmoticons(message)}
                        </p>
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
