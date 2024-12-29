import React, { useState, useRef } from 'react';
import '7.css/dist/7.scoped.css';
import WLMIcon from '/assets/general/wlm-icon.png';
import info from '/assets/general/info.png';

const UnableToConnectModal = ({ setShowUnableToConnectModal, errorMessage }) => {
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none bg-gradient-to-t from-[#c3d4ec46] via-white to-[#c3d4ec3a]">
            {/*header*/}
            <div className="flex items-start justify-between rounded-t-lg bg-[#f3f3f3]">
              <div className="flex items-center ml-1">
                <div>
                  <img src={WLMIcon} />
                </div>
                <p className="ml-1 pt-1 text-[12px]">Windows Live Messenger</p>
              </div>
              <button
                className="pb-2 pt-1 px-3 rounded-tr-lg hover:bg-red-700 hover:text-white"
                onClick={() => setShowUnableToConnectModal(false)}
              >
                <p className="text-[10px]">╳</p>
              </button>
            </div>

            {/*body*/}
            <div className="mx-4 mb-6 flex w-[490px] mt-2">
              <div className="flex items-center">
                <div>
                  <img src={info} alt="" />
                </div>
              </div>
              <div className="ml-3">
                <p className="mt-2 text-[19px] text-[#1D2F7F]">We can't sign you in to Windows Live Messenger</p>
                <p className="text-[12px]">{errorMessage}</p>
              </div>
            </div>

            {/*footer*/}
            <div className="flex items-center justify-end rounded-b win7 p-3 gap-1.5">
              <button type="button" onClick={() => setShowUnableToConnectModal(false)}>
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default UnableToConnectModal;
