import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Loader2 } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';
const API = `${BACKEND_URL}/api`;

const CybotChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hello! I'm CYBOT, your AI assistant for CYBOGLABS. How can I help you today? You can ask me about our products, services, careers, or anything else!"
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await axios.post(`${API}/chat`, {
        message: userMessage,
        session_id: sessionId
      });

      setSessionId(response.data.session_id);
      setMessages(prev => [...prev, { role: 'assistant', content: response.data.response }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "I apologize, but I'm having trouble connecting right now. Please try again or contact support@cyboglabs.com for assistance."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };



  const quickQuestions = [
    "What does CYBOGLABS do?",
    "What career opportunities are available?",
    "Tell me about your products",
    "Do you offer internships?"
  ];

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 ${
          isOpen ? 'bg-neutral-800' : ''
        }`}
        style={{
          background: isOpen ? '#1f1f1f' : 'linear-gradient(135deg, #f472b6 0%, #fbbf24 100%)',
        }}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[380px] h-[550px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-neutral-200">
          {/* Header */}
          <div 
            className="p-4 text-white"
            style={{
              background: 'linear-gradient(135deg, #000000 0%, #282828ff 100%)',
            }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">CYBOT</h3>
                <p className="text-sm text-white/80">Your AI Assistant</p>
              </div>
            </div>
          </div>

          {/* Chat Content */}
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'assistant' && (
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-rose-400 to-amber-400 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] px-3 py-2 rounded-2xl text-sm ${
                      msg.role === 'user'
                        ? 'bg-neutral-900 text-white rounded-br-sm'
                        : 'bg-neutral-100 text-neutral-700 rounded-bl-sm'
                    }`}
                  >
                    {msg.content}
                  </div>
                  {msg.role === 'user' && (
                    <div className="w-7 h-7 rounded-full bg-neutral-200 flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-neutral-600" />
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-2 justify-start">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-rose-400 to-amber-400 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-neutral-100 px-4 py-2 rounded-2xl rounded-bl-sm">
                    <Loader2 className="w-5 h-5 text-neutral-400 animate-spin" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            {messages.length <= 2 && (
              <div className="px-4 pb-2">
                <p className="text-xs text-neutral-400 mb-2">Quick questions:</p>
                <div className="flex flex-wrap gap-1">
                  {quickQuestions.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setInputMessage(q);
                      }}
                      className="text-xs px-2 py-1 bg-neutral-100 text-neutral-600 rounded-full hover:bg-neutral-200 transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-neutral-200">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2.5 bg-neutral-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-rose-400"
                  disabled={isLoading}
                />
                <button
                  onClick={sendMessage}
                  disabled={isLoading || !inputMessage.trim()}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white disabled:opacity-50 transition-all duration-300 hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, #f472b6 0%, #fbbf24 100%)',
                  }}
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </>
        </div>
      )}
    </>
  );
};

export default CybotChatbot;
