import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import Navbar from '../components/Navbar';
import ReactMarkdown from 'react-markdown';


const Spiriter = () => {
  const [userMessage, setUserMessage] = useState('');
  const [chatbotResponse, setChatbotResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!userMessage) return;

    setLoading(true);

    try {
      console.log("Sending message:", userMessage);
      const response = await axios.post(`http://localhost:8000/api/chatbot`, {
        query: userMessage,
        withCredentials: true,
      });
      setChatbotResponse(response.data.response);
    } catch (error) {
      console.error("Error sending message:", error);
      setChatbotResponse("Error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const containerStyle = {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    background: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  };

  const titleStyle = {
    textAlign: 'center',
    fontSize: '28px',
    color: '#333',
    marginBottom: '20px',
    fontWeight: 'bold',
  };

  const chatboxStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  };

  const inputStyle = {
    width: '100%',
    padding: '15px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    fontSize: '16px',
    resize: 'vertical',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };

  const buttonStyle = {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '15px',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };

  const buttonLoadingStyle = {
    ...buttonStyle,
    backgroundColor: '#6c757d',
  };

  const responseContainerStyle = {
    marginTop: '20px',
    padding: '20px',
    backgroundColor: '#e9ecef',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
  };

  const chatbotResponseStyle = {
    fontSize: '16px',
    color: '#333',
    whiteSpace: 'pre-wrap',
  };

  return (
    <div className='mt-30'>
    <Navbar/>
    <SpiritButton/>
    <div style={containerStyle}>
      <h2 style={titleStyle}>Spiriter</h2>
      <div style={chatboxStyle}>
      <textarea
        style={inputStyle}
        value={userMessage}
        onChange={(e) => setUserMessage(e.target.value)}
        placeholder="Ask something..."
        rows="4"
      />
      <button
        style={loading ? buttonLoadingStyle : buttonStyle}
        onClick={sendMessage}
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Send'}
      </button>
      </div>
      {chatbotResponse && (
      <div style={responseContainerStyle}>
        <h3>Chatbot Response:</h3>
        <ReactMarkdown style={chatbotResponseStyle}>{chatbotResponse}</ReactMarkdown>
      </div>
      )}
    </div>
    </div>
  );
};

export default Spiriter;
