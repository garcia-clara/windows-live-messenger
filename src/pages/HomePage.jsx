import React from "react";
import Background from "../components/Background";
import AvatarSmall from "../components/AvatarSmall";
import arrow from "../assets/general/arrow.png";
import ad from "../assets/ad.png"

const HomePage = () => {
  return (
    <Background>

        {/* Personnal informations row */}
        <div className="flex flex-col w-full pt-4 win7 font-sans text-base p-4 h-screen">
          <div className="flex">
            <AvatarSmall/>
            <div>
              <div className="flex items-center">
                <div className="flex aerobutton cursor-pointer items-center pl-1 white-light">
                  <p className="text-lg">Username</p>
                  <p className="ml-1">(Status)</p>
                  <div className="mx-1">
                    <img src={arrow} alt="" />
                  </div>
                </div>
              </div>

              <div className="flex aerobutton pl-1 items-center white-light">
                <p>Share a quick message</p>
                <div className="ml-1">
                  <img src={arrow} alt="" />
                </div>
              </div>
            </div>
          </div>
        

        {/* Contacts row */}
        <div className="h-full">
        <div className="w-full h-[0.5px] bg-slate-white divider"></div>
        </div>


        {/* Footer row */}
        <footer className="w-full flex justify-center">
          <div className="mt-4"><img src={ad} alt="" /></div>
        </footer>
        </div>
    </Background>
  );
};

export default HomePage;
