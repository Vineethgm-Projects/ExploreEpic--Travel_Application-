import React, { useState, useEffect, useRef } from 'react';
import '../components/CharacterModel.css';
//This is a character model that help to interact with the user
const CharacterPopup = ({ onClose }) => {
  const [userMessage, setUserMessage] = useState('');
  const [chatLog, setChatLog] = useState([
    { type: 'character', text: "Hi there! I'm Travel Tom your friendly travel guide. How can I assist you today?" }
  ]);
  const [isPopupOpen, setIsPopupOpen] = useState(true);
  const chatBoxRef = useRef(null); // Create a ref for the chat box

  const handleUserMessageChange = (e) => {
    setUserMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (userMessage.trim() !== '') {
      const userMsg = userMessage.trim().toLowerCase();
      const newChatLog = [...chatLog, { type: 'user', text: userMessage }];
      
      // Add typing indicator
      newChatLog.push({ type: 'typing' });
      setChatLog(newChatLog);
      setUserMessage('');

      // Simulate typing delay and answer few question
      setTimeout(() => {
        const response = (() => {
          if (userMsg === 'hi') {
            return "Hi! How can I help you?";
          } else if (userMsg.toLowerCase().includes('best place for adventure')) {
            return "For adventure seekers, places like New Zealand, Costa Rica, and the Swiss Alps offer thrilling activities such as bungee jumping, zip-lining, and skiing!";
          } else if (userMsg.toLowerCase().includes('best beach destination')) {
            return "If you’re looking for beautiful beaches, consider visiting the Maldives, Bali, or the Caribbean. Each offers stunning sands and clear waters!";
          } else if (userMsg.toLowerCase().includes('best city for sightseeing')) {
            return "Cities like Paris, Rome, and New York are fantastic for sightseeing with iconic landmarks and rich cultural experiences.";
          } else if (userMsg.toLowerCase().includes('family-friendly destinations')) {
            return "For family-friendly destinations, you might enjoy Orlando with its theme parks, or destinations like Tokyo and Sydney, which offer attractions for all ages!";
          } else if (userMsg.toLowerCase().includes('best destination for relaxation')) {
            return "For relaxation, you might love destinations like Bali, the Seychelles, or Santorini, where you can unwind with beautiful views and serene environments.";
          } else if (userMsg.toLowerCase().includes('top adventure activities')) {
            return "Top adventure activities include hiking in Patagonia, surfing in Hawaii, and safaris in Kenya. What kind of adventure are you interested in?";
          } else if (userMsg.toLowerCase().includes('most popular tours')) {
            return "Some of the most popular tours include guided hikes in the Himalayas, city tours in historical European capitals, and river cruises through scenic landscapes.";
          } else if (userMsg.toLowerCase().includes('best places for wildlife')) {
            return "Great places for wildlife watching include the Serengeti in Tanzania, the Amazon Rainforest in Brazil, and Galápagos Islands in Ecuador.";
          } else if (userMsg.toLowerCase().includes('most scenic places')) {
            return "Scenic places you might enjoy are the Norwegian fjords, the Canadian Rockies, and the Great Ocean Road in Australia.";
          } else {
            return "I'm not sure how to help with that. Can you provide more details?";
          }
        })();

        // Update chat log with the response
        setChatLog(prevChatLog => [
          ...prevChatLog.slice(0, -1), // Remove typing indicator
          { type: 'character', text: response }
        ]);
      }, 1000); // Adjust the delay as needed
    }
  };

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chatLog]);

  useEffect(() => {
    if (isPopupOpen) {
      document.querySelector('.character-popup').classList.add('open');
      document.querySelector('.character-popup').classList.remove('close');
    } else {
      document.querySelector('.character-popup').classList.add('close');
      document.querySelector('.character-popup').classList.remove('open');
    }
  }, [isPopupOpen]);

  return (
    <div className={`character-popup ${isPopupOpen ? 'open' : 'close'}`}>
      <div className="character-header">
        <div className="character-image">
          <img src="../images/char.png" alt="Character" />
        </div>
      </div>
      <div className="character-message-box" ref={chatBoxRef}>
        {chatLog.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.type}`}>
            {msg.type === 'typing' ? (
              <div className="typing-indicator"></div>
            ) : (
              <p>{msg.text}</p>
            )}
          </div>
        ))}
      </div>
      <div className="message-input">
        <input
          type="text"
          value={userMessage}
          onChange={handleUserMessageChange}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
      <button onClick={() => { onClose(); setIsPopupOpen(false); }} className="close-button">X</button>
    </div>
  );
};

export default CharacterPopup;
