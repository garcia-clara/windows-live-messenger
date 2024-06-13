import React, { useState } from 'react';
import selectEmoticon from "/assets/chat/select_emoticon.png";
import arrow from "/assets/general/arrow.png";
import pinnedEmoticons from '../imports/pinnedEmoticons';

const EmoticonSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
    // Add more options as needed
  ];

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    // Perform any action you need with the selected option
  };

  const lastUsedEmoticons = Array.from({ length: 11 });

  return (
    <>
      {/* Dropdown button */}
      <div className="relative">
        <div className="flex items-center aerobutton p-1 h-6" onClick={() => setIsOpen(!isOpen)}>
          <div className='w-5'><img src={selectEmoticon} alt="Select Emoticon" /></div>
          <div><img src={arrow} alt="Dropdown Arrow"/></div>
        </div>
        
        {/* Dropdown options */}
        {isOpen && (
          <div className='absolute w-[384px] h-auto bottom-[19px] left-[-9px] m-2 bg-white border border-gray-300 p-1'>
            <div className="w-full border-b pb-1 flex justify-between">
              <p className="font-bold">Your emoticons</p>
              <p className="link">Show all...</p>
            </div>
            <div>
                <p className='my-1 opacity-75'>Recently used emoticons</p>
                <div className='w-full border-b flex justify-center gap-1.5 pb-0.5'>
                  {lastUsedEmoticons.map((_, index) => (
                    <div key={index} className="cursor-pointer border w-7 h-7 flex justify-center items-center"></div>
                  ))}
                </div>
                <p className='my-1 opacity-75'>Pinned emoticons</p>
            </div>
            <div className="flex flex-wrap gap-1 mb-2">
             {Object.entries(pinnedEmoticons).map(([name, src]) => (
                    <div key={name} className="cursor-pointer border w-7 h-7 flex justify-center items-center">
                      <div>
                        <img
                            key={name}
                            src={src}
                            alt={name}
                        />
                      </div>
                    </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default EmoticonSelector;
