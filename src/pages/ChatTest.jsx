// src/Chat.js
import React, { useState } from 'react';
import axios from 'axios';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [error, setError] = useState(null);

  const handleSend = async () => {
    if (input.trim()) {
      const userMessage = { role: 'user', content: input };
      setMessages([...messages, userMessage]);

      try {
        const response = await axios.post('http://localhost:3001/', {
          messages: [...messages, userMessage],
        });

        const botMessage = response.data.choices[0].message;
        setMessages([...messages, userMessage, botMessage]);
        setInput('');
        setError(null);
      } catch (error) {
        console.error("Error while fetching the chatbot response:", error);
        setError("Failed to fetch response from chatbot. Please try again.");
      }
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-lg mx-auto border border-gray-300 rounded-lg overflow-hidden">
      <div className="flex-1 p-4 overflow-y-auto bg-gray-100">
        {messages.map((message, index) => (
          <div key={index} className={`p-2 my-2 rounded-lg ${message.role === 'user' ? 'bg-blue-500 text-white self-end' : 'bg-gray-300 self-start'}`}>
            {message.content}
          </div>
        ))}
      </div>
      {error && <div className="p-2 bg-red-500 text-white">{error}</div>}
      <div className="flex p-2 border-t border-gray-300 bg-white">
        <input
          type="text"
          className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <button
          className="ml-2 p-2 bg-blue-500 text-white rounded-lg"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
