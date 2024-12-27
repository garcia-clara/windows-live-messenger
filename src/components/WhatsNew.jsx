import React, { useState, useEffect } from 'react';
import divider from '/assets/general/divider.png';

const WhatsNew = () => {
  const [content, setContent] = useState(0);
  const [fadeClass, setFadeClass] = useState('fade-in');
  const messages = [
    "Find the github repository of this MSN clone <a target='_blank' href='https://github.com/garcia-clara/windows-live-messenger-clone' class='link'>here</a>!",
    "The site is under construction, so don't be surprised to find bugs or missing features",
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setFadeClass('fade-out');
      setTimeout(() => {
        setContent((prevContent) => (prevContent + 1) % messages.length);
        setFadeClass('fade-in');
      }, 500);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const handlePrevious = () => {
    setFadeClass('fade-out');
    setTimeout(() => {
      setContent(
        (prevContent) => (prevContent - 1 + messages.length) % messages.length
      );
      setFadeClass('fade-in');
    }, 500);
  };

  const handleNext = () => {
    setFadeClass('fade-out');
    setTimeout(() => {
      setContent((prevContent) => (prevContent + 1) % messages.length);
      setFadeClass('fade-in');
    }, 500);
  };

  return (
    <div className="px-4 pb-11">
      <div className="w-full">
        <img src={divider} alt="" className="mix-blend-multiply" />
      </div>
      <div className="flex gap-1 pt-2 items-center">
        <p className="text-[16px] text-[#1D2F7F]">What's new</p>
        <div
          className="ml-3 whats-new-arrow-previous"
          onClick={handlePrevious}
        ></div>
        <div className="whats-new-arrow-next" onClick={handleNext}></div>
        <div className="ml-2 whats-new-settings"></div>
      </div>
      <p
        className={fadeClass}
        dangerouslySetInnerHTML={{ __html: messages[content] }}
      />
    </div>
  );
};

export default WhatsNew;
