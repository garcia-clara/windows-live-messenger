import React, { useState, useRef } from 'react';
import '7.css/dist/7.scoped.css';
import AvatarLarge from './AvatarLarge';
import usertiles from '../imports/usertiles';
import defaultAvatar from '/assets/usertiles/default.png';
import WLMIcon from '/assets/general/wlm-icon.png';

const ChangeDisplayPictureModal = ({ setShowChangePictureModal }) => {
  const [userPicture, setUserPicture] = useState(localStorage.getItem('picture'));
  const fileInputRef = useRef(null);

  const updateUserPicture = (imageSrc) => {
    localStorage.setItem('picture', imageSrc);
    localStorage.setItem('discord_picture', imageSrc);
    setUserPicture(imageSrc);
    setUserDiscordPicture(imageSrc);
  };

  const removeUserPicture = () => {
    localStorage.setItem('picture', defaultAvatar);
    localStorage.setItem('discord_picture', defaultAvatar);
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const croppedImage = cropToSquare(img);
          updateUserPicture(croppedImage);
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const cropToSquare = (image) => {
    const canvas = document.createElement('canvas');
    const size = Math.min(image.width, image.height);
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    const x = (image.width - size) / 2;
    const y = (image.height - size) / 2;

    ctx.drawImage(image, x, y, size, size, 0, 0, size, size);
    return canvas.toDataURL('image/png');
  };

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/* Content */}
          <div className="rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none bg-gradient-to-t from-[#c3d4ec83] via-white to-[#c3d4ec83]">
            {/* Header */}
            <div className="flex items-start justify-between rounded-t-lg bg-[#f3f3f3]">
              <div className="flex items-center ml-1">
                <div>
                  <img src={WLMIcon} />
                </div>
                <p className="ml-1 pt-1">Display Picture</p>
              </div>
              <button
                className="pb-2 pt-1 px-3 rounded-tr-lg hover:bg-red-700 hover:text-white"
                onClick={() => setShowChangePictureModal(false)}
              >
                <p className="text-[10px]">╳</p>
              </button>
            </div>

            {/* Body */}
            <div className="mx-4 mb-6">
              <p className="mt-2 text-xl text-[#1D2F7F]">Select a display picture</p>
              <p className="opacity-60">Choose how you want to appear in Messenger:</p>
            </div>

            <div className="flex ml-2">
              <div className="win7">
                <div className="flex flex-wrap gap-2.5 h-[351px] w-72 overflow-y-auto p-2.5 has-scrollbar mb-2">
                  <div className="font-bold w-full mb-[-5px]">Regular pictures</div>
                  {Object.entries(usertiles).map(([name, src]) => (
                    <div key={name} onClick={() => updateUserPicture(src)} className="cursor-pointer">
                      <img key={name} src={src} alt={name} className="w-12 shadow-lg usertiles-shadow border border-hidden" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col items-center mx-4">
                <div className="mb-12">
                  <AvatarLarge image={userPicture} />
                </div>
                <div className="win7 flex flex-col w-32 gap-0.5">
                  <button disabled>Webcam picture...</button>
                  <button disabled>Dynamic picture...</button>
                  <button onClick={handleButtonClick}>Browse...</button>
                  <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} />
                  <button onClick={removeUserPicture}>Remove</button>
                  <button disabled>Modify...</button>
                </div>
              </div>
            </div>

            {/* Footer */}
            <p className="link ml-4">Get a webcam</p>
            <p className="mb-4 link ml-4">Download more pictures...</p>
            <div className="w-full bg-white h-[1px] shadow-sm shadow-[#6b8fa3]" />
            <div className="flex items-center justify-end rounded-b win7 p-3 gap-1.5">
              <button
                type="button"
                onClick={() => {
                  setShowChangePictureModal(false);
                  window.location.reload();
                }}
              >
                OK
              </button>
              <button type="button" onClick={() => setShowChangePictureModal(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default ChangeDisplayPictureModal;
