import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import Background from "../components/Background";
import AvatarLarge from "../components/AvatarLarge";
import useUserStore from '../lib/user-store';
import contacts from "../data/contacts.json";
import emoticons from "../imports/emoticons";
import sounds from "../imports/sounds";
import EmoticonSelector from '../components/EmoticonSelector';
import EmoticonContext from '../contexts/EmoticonContext'; // Ensure this import is correct
import navbarBackground from "/assets/background/chat_navbar_background.png";
import contactChatIcon from "/assets/chat/contact_chat_icon.png";
import showmenu from "/assets/contacts/1489.png";
import arrowWhite from "/assets/general/arrow_white.png";
import arrow from "/assets/general/arrow.png";
import divider from "/assets/general/divider.png";
import bg from '/assets/background/background.jpg';
import selectWink from "/assets/chat/select_wink.png";
import sendNudge from "/assets/chat/send_nudge.png";
import changeFont from "/assets/chat/change_font.png";
import changeBackground from "/assets/chat/select_background.png";
import messageDot from "/assets/chat/message_dot.png";
import chatIconsBackground from '/assets/background/chat_icons_background.png';
import chatPointBackground from '/assets/background/chat_background_point.png';
import chatIconsSeparator from '/assets/background/chat_icons_separator.png';
import { replaceEmoticons } from "../helpers/replaceEmoticons";

const ChatPage = () => {
  const { id } = useParams();
  const [shaking, setShaking] = useState(false);
  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem('chatMessages');
    return savedMessages ? JSON.parse(savedMessages) : [];
  });
  const [input, setInput] = useState('');
  const [lastMessageTime, setLastMessageTime] = useState(null);
  const [contactTyping, setContactTyping] = useState(false);
  const user = useUserStore(state => state.user);
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  const { selectedEmoticon, setSelectedEmoticon } = useContext(EmoticonContext);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (selectedEmoticon) {
      setInput((prevInput) => prevInput + selectedEmoticon);
      setSelectedEmoticon(null);
    }
  }, [selectedEmoticon, setSelectedEmoticon]);

  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  const handleInputChange = (e) => {
    const updatedInput = e.target.value;
    if (updatedInput.endsWith(')')) {
      const replacedInput = replaceEmoticons(updatedInput);
      setInput(replacedInput);
    } else {
      setInput(updatedInput);
    }
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
      getAssistantResponse(newMessages); // Use updated messages for the response
    }, 1000); // Simulated delay for response
  };

  const getAssistantResponse = async (newMessages) => {
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
            Authorization: `Bearer ${apiKey}`,
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

  const handleNudgeClick = () => {
    const nudgeMessage = "You have just sent a nudge.";
    const newMessages = [...messages, { role: 'nudging', content: nudgeMessage }];
  
    // Play nudge sound
    const audio = new Audio(sounds.nudge);
    audio.play();
  
    // Set shaking state and update messages after animation
    setShaking(true);
    setTimeout(() => {
      setShaking(false);
      setMessages(newMessages);
    }, 500);
  };

  return (
    <div className={`bg-no-repeat bg-[length:100%_100px] h-screen ${shaking ? 'nudge' : ''}`} style={{ backgroundImage: `url(${bg})` }}>
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
                <AvatarLarge image={localStorage.getItem("picture")} />
                <div className="h-10" />
              </div>
            </div>
            <div className="flex flex-col items-center justify-between win7">
              <div>
                <div className="flex items-center white-light mb-10">
                  <p className="flex gap-1 text-lg" dangerouslySetInnerHTML={{ __html: replaceEmoticons(contact.name) }}></p>
                  <p className="ml-1 capitalize">({contact.status})</p>
                </div>
                <img src={divider} alt="" className='mb-[-5px] pointer-events-none' />
              </div>

              <div className="h-[610px] w-full my-4 text-sm overflow-y-auto has-scrollbar pr-2">
              {messages.map((message, index) => {
                  const previousMessage = messages[index - 1];

                return (
                  <div key={index} className={`message ${message.role}`}>
                    {/* Display "user says" or "contact says" for regular messages */}
                    {message.role === 'user' && (
                      <div>
                        <div className="flex text-black text-opacity-70">
                          <p className="flex gap-1" dangerouslySetInnerHTML={{ __html: replaceEmoticons(user.name) }} />
                          <p className="ml-1">says:</p>
                        </div>
                        {/* Display the content of the message */}
                        <div className="flex gap-2 items-start ml-1">
                          <div className="flex-shrink-0 mt-2.5">
                            <img src={messageDot} alt="Message Dot" />
                          </div>
                          <div className="flex gap-1">
                            <p dangerouslySetInnerHTML={{ __html: replaceEmoticons(message.content) }} />
                          </div>
                        </div>
                      </div>
                    )}
                    {message.role === 'assistant' && (
                      <div>
                        <div className="flex text-black text-opacity-70">
                          <p className="flex gap-1" dangerouslySetInnerHTML={{ __html: replaceEmoticons(contact.name) }} />
                          <p className="ml-1">says:</p>
                        </div>
                        <div className="flex text-black text-opacity-70">
                          <p className="flex gap-1" dangerouslySetInnerHTML={{ __html: replaceEmoticons(user.name) }} />
                          <p className="ml-1">says:</p>
                        </div>
                        {/* Display the content of the message */}
                        <div className="flex gap-2 items-start ml-1">
                          <div className="flex-shrink-0 mt-2.5">
                            <img src={messageDot} alt="Message Dot" />
                          </div>
                          <div className="flex gap-1">
                            <p dangerouslySetInnerHTML={{ __html: replaceEmoticons(message.content) }} />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Display nudge message */}
                    {message.role === 'nudging' && (
                      previousMessage && previousMessage.role === 'nudging' ? (
                        <div>
                          <p className="ml-1">{message.content}</p>
                          <p>————</p>
                        </div>
                      ) : (
                        <div>
                          <p>————</p>
                          <p className="ml-1">{message.content}</p>
                          <p>————</p>
                        </div>
                      )
                    )}
                  </div>
                );
              })}

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
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="w-full border rounded-t-[4px] outline-none p-1 bg-[#F6FCFF] border-[#bdd5df]"
                  />
                </form>
                <div><img className="absolute bottom-[68px] left-[173.6px]" src={chatPointBackground} alt="" /></div>
                <div className="flex border-x border-b rounded-b-[4px] border-[#bdd5df]" style={{ backgroundImage: `url(${chatIconsBackground})` }}>
                  {EmoticonSelector()}
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
                <div className="h-10" />
              </div>
            </div>
          </div>
        </Background>
      </div>
    </div>
  );
};

export default ChatPage;
