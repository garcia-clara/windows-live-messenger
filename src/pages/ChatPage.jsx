import React from "react";
import Background from "../components/Background";
import navbarBackground from "../assets/background/chat_navbar_background.png";
import contactChatIcon from "../assets/chat/contact_chat_icon.png";
import { useParams } from "react-router-dom";
import "7.css/dist/7.scoped.css";
import showmenu from "../assets/contacts/1489.png";
import arrow from "../assets/general/arrow_white.png";
import AvatarLarge from "../components/AvatarLarge";
import divider from "../assets/general/divider.png";
import contacts from "../data/contacts.json";
import emoticons from "../imports/emoticons";

const ChatPage = () => {
  const { id } = useParams();

  const contact = contacts.find((c) => c.id === parseInt(id, 10));

  const replaceEmoticons = (message) => {
    return message.split(/(\[.*?\])/).map((part, index) => {
        const match = part.match(/\[(.*?)\]/);
        if (match && emoticons[match[1]]) {
            return <div className='flex items-center'><img key={index} src={emoticons[match[1]]} alt={match[1]} className='w-[14px] h-[14px]' /></div>;
        } else {
            return part;
        }
    });
};

  return (
    <div className="flex flex-col w-full font-sans text-base h-screen">
      <div className="flex items-center w-full h-[31.4px] bg-white p-2 gap-2">
        <img src={contactChatIcon} alt="" />
        <p className="flex gap-1">{replaceEmoticons(contact.name)}</p>
        <p>{contact.email}</p>
      </div>
      <div
        className="flex items-center justify-between h-[31.4px] bg-no-repeat shadow-lg"
        style={{ backgroundImage: `url(${navbarBackground})` }}
      >
        <div className="flex items-center text-white gap-3">
          <div className="aerobutton cursor-pointer p-1 opacity-50">Photos</div>
          <div className="aerobutton cursor-pointer p-1">Files</div>
          <div className="aerobutton cursor-pointer p-1 opacity-50">Video</div>
          <div className="aerobutton cursor-pointer p-1 opacity-50">Call</div>
          <div className="aerobutton cursor-pointer p-1 opacity-50">Games</div>
          <div className="aerobutton cursor-pointer p-1 opacity-50">Activities</div>
          <div className="aerobutton cursor-pointer p-1">Invite</div>
          <div className="aerobutton cursor-pointer p-1">Block</div>
        </div>
        <div className="flex gap-1 items-center aerobutton p-2 h-6">
          <div className="w-5">
            <img src={showmenu} alt="" />
          </div>
          <div>
            <img src={arrow} alt="" />
          </div>
        </div>
      </div>

      <Background>
        <div className="px-4 pt-4 grid grid-cols-[170px__1fr]">
          <div className="h-full flex flex-col items-center justify-between">
            <AvatarLarge />
            <AvatarLarge />
          </div>
          <div>
            <div className="flex items-center white-light mb-10">
              <p className="text-lg flex gap-1">{replaceEmoticons(contact.name)}</p>
              <p className="ml-1 capitalize">({contact.status})</p>
            </div>
            <img src={divider} alt="" className='mb-[-5px] pointer-events-none' />

          </div>
        </div>
      </Background>
    </div>
  );
};

export default ChatPage;
