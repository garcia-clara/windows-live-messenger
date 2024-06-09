import React, { useState, useRef  } from "react";
import "7.css/dist/7.scoped.css";
import AvatarLarge from "./AvatarLarge";
import usertiles from "../imports/usertiles";
import defaultAvatar from "/assets/usertiles/default.png";

const ChangeDisplayPictureModal = ({ setShowModal }) => {

  const [userPicture, setUserPicture] = useState(localStorage.getItem('picture'));

  const updateUserPicture = (imageSrc) => {
      localStorage.setItem('picture', imageSrc)
      setUserPicture(imageSrc);
  };

  const removeUserPicture = () => {
      localStorage.setItem('picture', '')
      setUserPicture(defaultAvatar);
  };

    const fileInputRef = useRef(null);
  
    const handleButtonClick = () => {
      fileInputRef.current.click();
    };
  
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const imageSrc = event.target.result;
          updateUserPicture(imageSrc); // Call updateUserPicture to update the user's picture
        };
        reader.readAsDataURL(file);
      }
    };

  return (
    <>
    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
      <div className="relative w-auto my-6 mx-auto max-w-3xl">
        {/*content*/}
        <div className="rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none bg-gradient-to-t from-[#c3d4ec83] via-white">

          {/*header*/}
          <div className="flex items-start justify-between rounded-t bg">
            <p className="p-1">Display Picture</p>
            <button
              className="py-1 px-3 rounded-tr-lg hover:bg-red-700 hover:text-white"
              onClick={() => setShowModal(false)}
            ><p className="text-[10px]">╳</p></button>
          </div>

          {/*body*/}
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
                      <img
                          key={name}
                          src={src}
                          alt={name}
                          className="w-12 shadow-lg usertiles-shadow border border-hidden"
                      />
                    </div>
                  ))}

            </div>
            </div>

            <div className="flex flex-col items-center mx-4">
              <div className="mb-12"><AvatarLarge image={userPicture}/></div>
              <div className="win7 flex flex-col w-32 gap-0.5">
                <button disabled>Webcam picture...</button>
                <button disabled>Dynamic picture...</button>
                <button onClick={handleButtonClick}>Browse...</button>
                <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange}/>
                <button onClick={removeUserPicture}>Remove</button>
                <button disabled>Modify...</button>
              </div>
            </div>
    
          </div>


          {/*footer*/}

          <p className="link ml-4">Get a webcam</p>
          <p className="mb-4 link ml-4">Download more pictures...</p>
          <div className='w-full bg-white h-[1px] shadow-sm shadow-[#6b8fa3]' />
          <div className="flex items-center justify-end rounded-b win7 p-3 gap-1.5">
            <button type="button" onClick={() => { setShowModal(false); window.location.reload(); }}>OK</button>
            <button type="button" onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      </div>
    </div>
    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
  </>
  )
};

export default ChangeDisplayPictureModal;
