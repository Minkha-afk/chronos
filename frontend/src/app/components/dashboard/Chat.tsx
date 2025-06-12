import React, { useState } from 'react';
import { MessageSquare, Send, User } from 'lucide-react';

const Chat = () => {
  const [chatMessages, setChatMessages] = useState([
    { user: 'John', message: 'Hey, how\'s the file upload feature coming along?', time: '10:30 AM' },
    { user: 'Sarah', message: 'Working on it now, should be ready soon!', time: '10:32 AM' },
    { user: 'Mike', message: 'Need any help with the validation logic?', time: '10:35 AM' },
    { user: 'Sarah', message: 'That would be great! Can you review the code?', time: '10:36 AM' }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setChatMessages([...chatMessages, { 
        user: 'You', 
        message: newMessage, 
        time: currentTime 
      }]);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="w-80 bg-white border border-gray-200 rounded-lg shadow-sm">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
        <div className="flex items-center space-x-2">
          <MessageSquare className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-gray-800">Team Chat</h3>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          <span className="text-xs text-gray-500">Online</span>
        </div>
      </div>
      
      {/* Chat Messages */}
      <div className="h-96 overflow-y-auto p-4 space-y-3">
        {chatMessages.map((msg, index) => (
          <div key={index} className={`flex ${msg.user === 'You' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs lg:max-w-md px-3 py-2 rounded-lg ${
              msg.user === 'You' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-800'
            }`}>
              {msg.user !== 'You' && (
                <div className="flex items-center space-x-1 mb-1">
                  <User className="w-3 h-3" />
                  <span className="font-medium text-xs">{msg.user}</span>
                </div>
              )}
              <div className="text-sm">{msg.message}</div>
              <div className={`text-xs mt-1 ${
                msg.user === 'You' ? 'text-blue-100' : 'text-gray-500'
              }`}>
                {msg.time}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Chat Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex space-x-2">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1 p-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            rows="2"
          />
          <button 
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <div className="text-xs text-gray-500 mt-2">
          Press Enter to send, Shift+Enter for new line
        </div>
      </div>
    </div>
  );
};

export default Chat;