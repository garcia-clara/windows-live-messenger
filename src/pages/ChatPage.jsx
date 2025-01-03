import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Background from '../components/Background';
import AvatarLarge from '../components/AvatarLarge';
import contacts from '../data/contacts.json';
import sounds from '../imports/sounds';
import EmoticonSelector from '../components/EmoticonSelector';
import WinkSelector from '../components/WinkSelector';
import EmoticonContext from '../contexts/EmoticonContext';
import navbarBackground from '/assets/background/chat_navbar_background.png';
import contactChatIcon from '/assets/chat/contact_chat_icon.png';
import showmenu from '/assets/contacts/1489.png';
import arrowWhite from '/assets/general/arrow_white.png';
import arrow from '/assets/general/arrow.png';
import divider from '/assets/general/divider.png';
import bg from '/assets/background/background.jpg';
import sendNudge from '/assets/chat/send_nudge.png';
import changeFont from '/assets/chat/change_font.png';
import changeBackground from '/assets/chat/select_background.png';
import messageDot from '/assets/chat/message_dot.png';
import chatIconsBackground from '/assets/background/chat_icons_background.png';
import chatPointBackground from '/assets/background/chat_background_point.png';
import chatIconsSeparator from '/assets/background/chat_icons_separator.png';
import { replaceEmoticons } from '../helpers/replaceEmoticons';
import { getOpenAIResponse } from '../utils/openai';

const ChatPage = () => {
  const { id } = useParams();
  const [shaking, setShaking] = useState(false);
  const [input, setInput] = useState('');
  const [lastMessageTime, setLastMessageTime] = useState(null);
  const [contactTyping, setContactTyping] = useState(false);
  const user = localStorage.getItem('name');
  const userEmail = localStorage.getItem('email');
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  const { selectedEmoticon, setSelectedEmoticon } = useContext(EmoticonContext);
  const [isOpen, setIsOpen] = useState(false);

  const [messages, setMessages] = useState(() => {
    if (id) {
      const savedMessages = localStorage.getItem(`chatMessages_${id}`);
      return savedMessages ? JSON.parse(savedMessages) : [];
    }
    return [];
  });

  useEffect(() => {
    if (selectedEmoticon) {
      setInput((prevInput) => prevInput + selectedEmoticon);
      setSelectedEmoticon(null);
    }
  }, [selectedEmoticon, setSelectedEmoticon]);

  useEffect(() => {
    if (id) {
      localStorage.setItem(`chatMessages_${id}`, JSON.stringify(messages));
    }
  }, [messages, user]);

  const scrollToBottom = () => {
    const messageContainer = document.getElementById('message-container');
    messageContainer.scrollTop = messageContainer.scrollHeight;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim() === '') return;

    const newMessage = { role: 'user', content: input };

    const newMessages = [...messages, newMessage];
    setMessages(newMessages);
    setInput('');
    simulateContactTyping();

    setTimeout(() => {
      if (newMessage.content !== 'You have just sent a nudge.') {
        getAssistantResponse(newMessages);
      }
    }, 1000);

    scrollToBottom();
  };

  const getAssistantResponse = async (newMessages) => {
    const assistantMessage = await getOpenAIResponse(newMessages, apiKey);
    const botMessage = {
      role: 'assistant',
      content: assistantMessage,
    };
    setMessages([...newMessages, botMessage]);
  };

  const contact = contacts.find((c) => c.id === parseInt(id, 10));

  useEffect(() => {
    const getLastMessageTime = () => {
      if (messages.length > 0) {
        const lastMessage = messages[messages.length - 1];
        if (lastMessage.role === 'assistant') {
          const currentDate = new Date();
          const options = { year: '2-digit', month: '2-digit', day: '2-digit' };
          const formattedDate = currentDate.toLocaleDateString([], options);
          const formattedTime = currentDate.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          });
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
    }, 1500);
  };

  const nudgeMessage = 'You have just sent a nudge.';

  const handleNudgeClick = () => {
    const newMessages = [...messages, { role: 'user', content: nudgeMessage }];

    const audio = new Audio(sounds.nudge);
    audio.play();

    setShaking(true);

    setTimeout(() => {
      setShaking(false);
      setMessages(newMessages);
    }, 500);
  };

  return (
    <div
      className={`bg-no-repeat bg-[length:100%_100px] h-screen ${shaking ? 'nudge' : ''}`}
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="flex flex-col w-full font-sans text-base h-full">
        <div className="flex items-center w-full h-[31.4px] bg-white p-2 gap-2">
          <img src={contactChatIcon} alt="" />
          <p className="flex gap-1" dangerouslySetInnerHTML={{ __html: replaceEmoticons(contact.name) }}></p>
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
              <AvatarLarge image={contact.image} status={contact.status} />
              <div>
                <AvatarLarge image={localStorage.getItem('picture')} />
                <div className="h-10" />
              </div>
            </div>
            <div className="win7 h-[calc(100vh-70px)]">
              <div className="flex items-center white-light mb-10">
                <p
                  className="flex gap-1 text-lg"
                  dangerouslySetInnerHTML={{
                    __html: replaceEmoticons(contact.name),
                  }}
                ></p>
                <p className="ml-1 capitalize">({contact.status})</p>
              </div>
              <img src={divider} alt="" className="mb-[-5px] pointer-events-none" />

              <div className="flex flex-col justify-between h-full w-full my-4 text-sm pr-2">
                <div className="overflow-y-auto break-all has-scrollbar">
                  {messages.map((message, index) => {
                    const previousMessage = messages[index - 1];

                    return (
                      <div key={index} className={`message ${message.role}`}>
                        {message.content === nudgeMessage && (
                          <div>
                            {previousMessage && previousMessage.content === nudgeMessage ? (
                              <>
                                <p className="ml-1">{nudgeMessage}</p>
                                <p>━━━━</p>
                              </>
                            ) : (
                              <>
                                <p>━━━━</p>
                                <p className="ml-1">{nudgeMessage}</p>
                                <p>━━━━</p>
                              </>
                            )}
                          </div>
                        )}

                        {message.role === 'user' && message.content !== nudgeMessage && (
                          <div>
                            <div className="flex text-black text-opacity-70">
                              <p
                                className="flex gap-1"
                                dangerouslySetInnerHTML={{
                                  __html: replaceEmoticons(user == '' ? userEmail : user),
                                }}
                              />
                              <p className="ml-1">says:</p>
                            </div>
                            <div className="flex gap-2 items-start ml-1">
                              <div className="flex-shrink-0 mt-2.5">
                                <img src={messageDot} alt="Message Dot" />
                              </div>
                              <div>
                                <p
                                  className="flex gap-1"
                                  dangerouslySetInnerHTML={{
                                    __html: replaceEmoticons(message.content),
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        {message.role === 'assistant' && message.content !== nudgeMessage && (
                          <div>
                            <div className="flex text-black text-opacity-70">
                              <p
                                className="flex gap-1"
                                dangerouslySetInnerHTML={{
                                  __html: replaceEmoticons(contact.name),
                                }}
                              />
                              <p className="ml-1">says:</p>
                            </div>
                            <div className="flex gap-2 items-start ml-1">
                              <div className="flex-shrink-0 mt-2.5">
                                <img src={messageDot} alt="Message Dot" />
                              </div>
                              <div>
                                <p
                                  className="flex gap-1"
                                  dangerouslySetInnerHTML={{
                                    __html: replaceEmoticons(message.content),
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className="w-full">
                  {contactTyping && (
                    <div className="flex gap-1">
                      <p
                        className="flex"
                        dangerouslySetInnerHTML={{
                          __html: replaceEmoticons(contact.name),
                        }}
                      />
                      <p>is typing...</p>
                    </div>
                  )}
                  {lastMessageTime && <p className="opacity-50 my-1">Last message received at {lastMessageTime}</p>}
                  <img src={divider} alt="" className="pointer-events-none" />
                  {/*--------------------- INPUT ---------------------*/}
                  <form onSubmit={handleSubmit}>
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      className="w-full border rounded-t-[4px] outline-none p-1 border-[#bdd5df]"
                    />
                  </form>
                  <div>
                    <img className="absolute bottom-[68px] left-[173.6px]" src={chatPointBackground} alt="" />
                  </div>
                  <div
                    className="flex border-x border-b rounded-b-[4px] border-[#bdd5df]"
                    style={{ backgroundImage: `url(${chatIconsBackground})` }}
                  >
                    {EmoticonSelector()}

                    {WinkSelector()}

                    <div className="flex items-center aerobutton p-1 h-6" onClick={handleNudgeClick}>
                      <div>
                        <img src={sendNudge} alt="" />
                      </div>
                    </div>
                    <div className="px-2">
                      <img src={chatIconsSeparator} alt="" />
                    </div>
                    <div className="flex items-center aerobutton p-1 h-6">
                      <div>
                        <img src={changeFont} alt="" />
                      </div>
                    </div>
                    <div className="flex items-center aerobutton p-1 h-6">
                      <div className="w-5">
                        <img src={changeBackground} alt="" />
                      </div>
                      <div>
                        <img src={arrow} alt="" />
                      </div>
                    </div>
                  </div>
                  <div className="h-[121px]" />
                </div>
              </div>
            </div>
          </div>
        </Background>
      </div>
    </div>
  );
};

export default ChatPage;
