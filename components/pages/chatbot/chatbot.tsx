import { ChatbotCard } from '@/components/chatbotCard/chatbotCard';
import React from 'react';

const Chatbot = () => {
  return (
    <div className="md:flex space-between w-full px-2 md:px-0 md:space-x-10">
      <div className="flex-1">
        <ChatbotCard />
      </div>
    </div>
  );
};

export default Chatbot;
