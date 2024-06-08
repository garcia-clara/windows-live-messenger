import React from "react";
import { useState, useEffect } from "react";
import Background from "../components/Background";
import navbarBackground from "../assets/background/chat_navbar_background.png";
import contactChatIcon from "../assets/chat/contact_chat_icon.png";
import { useParams } from "react-router-dom";
import "7.css/dist/7.scoped.css";
import showmenu from "../assets/contacts/1489.png";
import arrowWhite from "../assets/general/arrow_white.png";
import arrow from "../assets/general/arrow.png";
import AvatarLarge from "../components/AvatarLarge";
import divider from "../assets/general/divider.png";
import contacts from "../data/contacts.json";
import emoticons from "../imports/emoticons";
import bg from '../assets/bg1.jpg';
import selectEmoticon from "../assets/chat/select_emoticon.png";
import selectWink from "../assets/chat/select_wink.png";
import sendNudge from "../assets/chat/send_nudge.png";
import changeFont from "../assets/chat/change_font.png";
import changeBackground from "../assets/chat/select_background.png";
import messageDot from "../assets/chat/message_dot.png";
import useUserStore from '../lib/user-store';
import chatIconsBackground from '../assets/background/chat_icons_background.png';
import chatPointBackground from '../assets/background/chat_background_point.png';
import chatIconsSeparator from '../assets/background/chat_icons_separator.png';
import sounds from "../imports/sounds";
import axios from 'axios';

const ChatPage = () => {
  const { id } = useParams();
  const [shaking, setShaking] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [lastMessageTime, setLastMessageTime] = useState(null);
  const [contactTyping, setContactTyping] = useState(false);
  const user = useUserStore(state => state.user);
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;


  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim() === '') return;

    const newMessage = { role: 'user', content: input };
    const newMessages = [...messages, newMessage];

    setMessages(newMessages);
    setInput('');
    simulateContactTyping(); // Simulate contact typing
    setTimeout(() => {
    getAssistantResponse(); // Get assistant's response after a delay
    }, 100000); // Simulated delay for response

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: newMessages,
          max_tokens: 300,
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`, // Replace YOUR_API_KEY with your actual API key
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.choices && response.data.choices.length > 0) {
        const botMessage = {
          role: 'assistant',
          content: response.data.choices[0].message.content.trim(),
        };
        setMessages([...newMessages, botMessage]);
        const audio = new Audio(sounds.newmessage);
        audio.play();
      } else {
        throw new Error('No response choices received');
      }
    } catch (error) {
      console.error('Error fetching response from OpenAI:', error);

      let errorMessageContent = "Oops! It seems you haven't created your .env file or haven't correctly added your OpenAI API key. To start chatting, make sure you've created a .env file with the correct configuration. Additionally, ensure your OpenAI API key is properly inserted. Remember, you must have sufficient credit to make requests and engage in chat conversations.";

      if (error.response) {
        console.error('Status:', error.response.status);
        console.error('Data:', error.response.data);
        if (error.response.status === 429) {
          errorMessageContent = 'Too many requests. Please try again later.';
        } else if (error.response.status === 404) {
          errorMessageContent = 'API endpoint not found. Please check the URL and model.';
        }
      }

      const errorMessage = { role: 'assistant', content: errorMessageContent };
      setMessages([...newMessages, errorMessage]);

    }
  };

  const contact = contacts.find((c) => c.id === parseInt(id, 10));


// Simulating someone typing
  useEffect(() => {
    const getLastMessageTime = () => {
      if (messages.length > 0) {
        const lastMessage = messages[messages.length - 1];
        if (lastMessage.role === 'assistant') {
          const currentDate = new Date();
          const options = { year: '2-digit', month: '2-digit', day: '2-digit' };
          const formattedDate = currentDate.toLocaleDateString([], options);
          const formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          setLastMessageTime(`${formattedTime} on ${formattedDate}`);
        }
      }
    };
    getLastMessageTime();
  }, [messages]);

  const simulateContactTyping = () => {
    setContactTyping(true);
    setTimeout(() => {
      setContactTyping(false);
    }, 1500); // Simulated typing duration
  };

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

const handleNudgeClick = () => {
  const audio = new Audio(sounds.nudge);
  audio.play();

  setShaking(true);
  setTimeout(() => {
    setShaking(false);
  }, 500);
};

  return (
    <div className={`bg-no-repeat bg-[length:100%_100px] h-screen ${shaking ? 'nudge' : ''}`} style={{ backgroundImage: `url(${bg})` }}>
    <div className="flex flex-col w-full font-sans text-base h-full">
      <div className="flex items-center w-full h-[31.4px] bg-white p-2 gap-2">
        <img src={contactChatIcon} alt="" />
        <p className="flex gap-1">{replaceEmoticons(contact.name)}</p>
        <p>&lt;{contact.email}&gt;</p>
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
            <img src={arrowWhite} alt="" />
          </div>
        </div>
      </div>

      <Background>
        <div className="px-4 pt-4 grid grid-cols-[170px__1fr] h-full">
          <div className="h-full flex flex-col items-center justify-between">
            <AvatarLarge image={contact.image} status={contact.status}/>
            <div>
              <AvatarLarge />
              <div className="h-10"/>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between">
            <div>
              <div className="flex items-center white-light mb-10">
                <p className="text-lg flex gap-1">{replaceEmoticons(contact.name)}</p>
                <p className="ml-1 capitalize">({contact.status})</p>
              </div>
              <img src={divider} alt="" className='mb-[-5px] pointer-events-none' />
            </div>

            <div className="h-full w-full my-4 text-sm">

                {messages.map((message, index) => (
                  <div key={index} className={`message ${message.role}`}>
                    {/* Affichage du nom de l'expéditeur */}
                      {message.role === 'user' ? 
                      <p className="flex">{replaceEmoticons(user.name)} says:</p>
                      : 
                      <p className="flex">{replaceEmoticons(contact.name)} says:</p>
                      }
                    {/* Affichage du contenu du message */}
                    <div className="flex gap-2">
                      <div className="flex items-center">
                        <div><img src={messageDot} alt="" /></div>
                        </div>{message.content}</div>
                  </div>
                ))}
            </div>

            <div className="w-full">
            {contactTyping && <p className="flex">{replaceEmoticons(contact.name)} is typing...</p>}
            {lastMessageTime && (
                  <p className="opacity-50 my-1">
                    Last message received at {lastMessageTime}
                  </p>
                )}
              <img src={divider} alt="" className='pointer-events-none' />
              {/*--------------------- INPUT ---------------------*/}
              <form onSubmit={handleSubmit}>
                <input  type="text" value={input} onChange={(e) => setInput(e.target.value)} className="w-full border rounded-t-[4px] outline-none p-1 bg-[#f6fcff] border-[#bdd5df]"/>
              </form>
              <div><img className="absolute bottom-[68px] left-[173.6px]" src={chatPointBackground} alt="" /></div>
              <div className="flex border-x border-b rounded-b-[4px] border-[#bdd5df]" style={{ backgroundImage: `url(${chatIconsBackground})`}}>
                  <div className="flex items-center aerobutton p-1 h-6">
                    <div className='w-5'><img src={selectEmoticon} alt="" /></div>
                    <div><img src={arrow} alt="" /></div>
                  </div>
                  <div className="flex items-center aerobutton p-1 h-6">
                    <div className='w-5'><img src={selectWink} alt="" /></div>
                    <div><img src={arrow} alt="" /></div>
                  </div>
                  <div className="flex items-center aerobutton p-1 h-6" onClick={handleNudgeClick}>
                    <div><img src={sendNudge} alt="" /></div>
                  </div>
                  <div className="px-2"><img src={chatIconsSeparator} alt="" /></div>
                  <div className="flex items-center aerobutton p-1 h-6">
                    <div><img src={changeFont} alt="" /></div>
                  </div>
                  <div className="flex items-center aerobutton p-1 h-6">
                    <div className='w-5'><img src={changeBackground} alt="" /></div>
                    <div><img src={arrow} alt="" /></div>
                  </div>
              </div>
              <div className="h-10"/>
            </div>
          </div>
        </div>
      </Background>
    </div>
    </div>
  );
};

export default ChatPage;
