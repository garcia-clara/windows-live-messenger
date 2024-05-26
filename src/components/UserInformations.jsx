import React, { useState, useEffect } from 'react';
import AvatarSmall from "../components/AvatarSmall";
import arrow from "../assets/general/arrow.png";
import userData from '../data/user.json';
import Dropdown from './Dropdown';
import statusFrames from "../imports/statusFrames";


const UserInformation = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (userData.length > 0) {
            setUser(userData[0]); // Assuming you want to display the first user in the array
        }
    }, []);

    if (!user) {
        return null; // Or a loading spinner, or some placeholder
    }

    const options = [
        { value: 'Available', label: 'Available', image: statusFrames.onlineDot },
        { value: 'Busy', label: 'Busy', image: statusFrames.busyDot },
        { value: 'Away', label: 'Away', image: statusFrames.awayDot },
        { value: 'Offline', label: 'Appear offline', image: statusFrames.offlineDot },
        { value: 'Sign out', label: 'Sign out'}
      ];

    return (
        <div className="flex">
            <AvatarSmall/>
            <div className='ml-[-6px]'>
                <div className="flex items-center">
                        <Dropdown options={options} name={user.name} status={user.status}/>
                </div>
                <div className="flex aerobutton pl-1 items-center white-light">
                    <p>{user.message}</p>
                    <div className="ml-1">
                        <img src={arrow} alt="arrow icon" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserInformation;
