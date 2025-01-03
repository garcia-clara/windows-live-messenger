import React, { useState, useRef, useEffect } from 'react';
import '7.css/dist/7.scoped.css';
import scenes from '../imports/scenes';
import colorSchemes from '../imports/colorSchemes';
import WLMIcon from '/assets/general/wlm-icon.png';
import select_a_scene from '/assets/general/select_a_scene.png';
import select_a_color_scheme from '/assets/general/select_a_color_scheme.png';
import Color from 'color-thief-react';
import match_color_scheme_icon from '/assets/color_schemes/smoke.png';

const ChangeSceneModal = ({ setShowChangeSceneModal }) => {
  const [userScene, setUserScene] = useState(localStorage.getItem('scene'));
  const [userColorScheme, setUserColorScheme] = useState(localStorage.getItem('colorScheme'));
  const [selected, setSelected] = useState(null);

  const updateUserScene = (imageSrc) => {
    localStorage.setItem('scene', imageSrc);
    setUserScene(imageSrc);
  };

  const updateUserColorScheme = (color) => {
    localStorage.setItem('colorScheme', color);
    setUserColorScheme(color);
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
        updateUserScene(imageSrc); // Update the user's scene with the new image
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = (name) => {
    setSelected(name);
  };

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none bg-gradient-to-t from-[#c3d4ec83] via-white to-[#c3d4ec83]">
            {/*header*/}
            <div className="flex items-start justify-between rounded-t-lg bg-[#f3f3f3]">
              <div className="flex items-center ml-1">
                <div>
                  <img src={WLMIcon} alt="WLM Icon" />
                </div>
                <p className="ml-1 pt-1">Scene</p>
              </div>
              <button
                className="pb-2 pt-1 px-3 rounded-tr-lg hover:bg-red-700 hover:text-white"
                onClick={() => setShowChangeSceneModal(false)}
              >
                <p className="text-[10px]">╳</p>
              </button>
            </div>

            <p className="opacity-60 m-3">The people you chat with will see the scene and color scheme you choose.</p>

            {/*body*/}
            <div className="flex ml-4">
              <div>
                <img src={select_a_scene} alt="Select a scene" />
              </div>
              <div className="win7 mr-4">
                <p className="ml-2 text-[16px] text-[#1D2F7F]">Select a scene</p>
                <div className="flex flex-wrap w-[460px] h-[275px] overflow-y-auto p-2.5 has-scrollbar mb-2">
                  {Object.entries(scenes).map(([name, src]) => (
                    <div
                      key={name}
                      className={`hoverscene p-0.5 pb-1.5 pr-1.5 rounded-sm ${selected === name ? 'selectedscene' : ''}`}
                      onClick={() => handleClick(name)}
                    >
                      <div
                        onClick={() => updateUserScene(src)}
                        className="cursor-pointer w-24 shadow-lg usertiles-shadow border border-hidden"
                      >
                        <img src={src} alt={name} className="object-cover h-12" />
                      </div>
                    </div>
                  ))}
                </div>
                <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} />
                <button className="ml-2 mt-[-20px] mb-2" onClick={handleButtonClick}>
                  Browse...
                </button>
              </div>
            </div>

            <div className="flex ml-4 mt-8">
              <div>
                <img src={select_a_color_scheme} alt="Select a color scheme" />
              </div>
              <div className="win7 mr-4 mb-4">
                <p className="ml-2 text-[16px] text-[#1D2F7F]">Select a color scheme</p>
                <div className="flex gap-1.5 ml-2.5 m-2 mb-2">
                  {userScene && (
                    <Color src={userScene} crossOrigin="anonymous" format="hex">
                      {({ data }) => {
                        useEffect(() => {
                          if (data) {
                            updateUserColorScheme(data);
                          }
                        }, [data]);

                        return (
                          <div className="cursor-pointer flex">
                            <div style={{ backgroundColor: data }} className="w-[18px] h-[18px] absolute rounded-[3px]"></div>
                            <img src={match_color_scheme_icon} alt="" className="mix-blend-luminosity" />
                          </div>
                        );
                      }}
                    </Color>
                  )}
                  {Object.entries(colorSchemes).map(([name, src]) => (
                    <div key={name} onClick={() => updateUserColorScheme(src)} className="cursor-pointer">
                      <img src={src} alt={name} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/*footer*/}
            <div className="w-full bg-white h-[1px] shadow-sm shadow-[#6b8fa3]" />
            <div className="flex items-center justify-end rounded-b win7 p-3 gap-1.5">
              <button
                type="button"
                onClick={() => {
                  setShowChangeSceneModal(false);
                  window.location.reload();
                }}
              >
                OK
              </button>
              <button type="button" onClick={() => setShowChangeSceneModal(false)}>
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

export default ChangeSceneModal;
