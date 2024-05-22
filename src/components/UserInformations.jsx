import React, { useState, useEffect } from 'react';
import AvatarSmall from "../components/AvatarSmall";
import arrow from "../assets/general/arrow.png";
import userData from '../data/user.json'; // Ensure this is the correct path to your JSON file

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

    return (
        <div className="flex">
            <AvatarSmall/>
            <div>
                <div className="flex items-center">
                    <div className="flex aerobutton cursor-pointer items-center pl-1 white-light">
                        <p className="text-lg">{user.name}</p>
                        <p className="ml-1">({user.status})</p>
                        <div className="mx-1">
                            <img src={arrow} alt="arrow icon" />
                        </div>
                    </div>
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
