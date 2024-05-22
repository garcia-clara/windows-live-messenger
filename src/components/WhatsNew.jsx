import React, { useState, useEffect } from 'react';
import divider from "../assets/general/divider.png";

const WhatsNew = () => {
    const [content, setContent] = useState(0);
    const [fadeClass, setFadeClass] = useState('fade-in');
    const messages = [
        "Find the github repository of this MSN clone here !",
        "Message 2",
        "Message 3",
        "Message 4",
    ];

    useEffect(() => {
        const intervalId = setInterval(() => {
            setFadeClass('fade-out');
            setTimeout(() => {
                setContent((prevContent) => (prevContent + 1) % messages.length);
                setFadeClass('fade-in');
            }, 500);
        }, 5000);

        return () => clearInterval(intervalId); // Cleanup the interval on component unmount
    }, []);

    return (
        <div className='px-4 pb-11'>
            <div className="w-full"><img src={divider} alt="" /></div>
            <p className="text-[16px] pt-2 text-[#1D2F7F]">What's new</p>
            <p className={fadeClass}>{messages[content]}</p> {/* Apply the dynamic class here */}
        </div>
    );
}

export default WhatsNew;
