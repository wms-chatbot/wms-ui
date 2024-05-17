"use client"
import axios from 'axios';
import { useState } from 'react';

const ChatbotPage = () => {
  const [input, setInput] = useState('');
  const [responses, setResponses] = useState([]);

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleSend = async () => {
    try {
      const response = await axios.post('https://api.dify.ai/v1', { message: input });
      setResponses([...responses, response.data]);
      setInput('');
    } catch (error) {
      console.error('API error:', error);
    }
  };

  return (
    <div>
      <h1>Chatbot</h1>
      <input className="border" type="text" value={input} onChange={handleInputChange} />
      <button onClick={handleSend}>Send</button>
      <ul>
        {responses.map((res, index) => (
          <li key={index}>{res.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default ChatbotPage;
