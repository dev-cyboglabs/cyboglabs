import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Loader2, Mail, ChevronDown, ChevronUp } from 'lucide-react';
import axios from 'axios';
import { faqData, companyInfo } from '../data/mockData';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const CybotChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('chat'); // 'chat', 'faq', 'contact'
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hello! I'm CYBOT, your AI assistant for CYBOGLABS. How can I help you today? You can ask me about our products, services, careers, or anything else!"
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    type: 'general'
  });
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactLoading, setContactLoading] = useState(false);
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

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setContactLoading(true);

    try {
      await axios.post(`${API}/contact`, contactForm);
      setContactSubmitted(true);
      setContactForm({ name: '', email: '', subject: '', message: '', type: 'general' });
    } catch (error) {
      console.error('Contact error:', error);
      alert('Failed to submit. Please try again or email support@cyboglabs.com directly.');
    } finally {
      setContactLoading(false);
    }
  };

  const faqCategories = ['All', ...new Set(faqData.map(faq => faq.category))];
  const filteredFaqs = selectedCategory === 'All' 
    ? faqData 
    : faqData.filter(faq => faq.category === selectedCategory);

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
              background: 'linear-gradient(135deg, #f472b6 0%, #fbbf24 100%)',
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

          {/* Tabs */}
          <div className="flex border-b border-neutral-200">
            {[
              { key: 'chat', label: 'Chat' },
              { key: 'faq', label: 'FAQ' },
              { key: 'contact', label: 'Contact' }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 py-2.5 text-sm font-medium transition-colors duration-300 ${
                  activeTab === tab.key
                    ? 'text-rose-500 border-b-2 border-rose-500'
                    : 'text-neutral-500 hover:text-neutral-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Chat Tab */}
          {activeTab === 'chat' && (
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
          )}

          {/* FAQ Tab */}
          {activeTab === 'faq' && (
            <div className="flex-1 overflow-y-auto">
              {/* Category Filter */}
              <div className="p-3 border-b border-neutral-200 sticky top-0 bg-white">
                <div className="flex gap-1 overflow-x-auto">
                  {faqCategories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1 text-xs font-medium rounded-full whitespace-nowrap transition-colors ${
                        selectedCategory === cat
                          ? 'bg-neutral-900 text-white'
                          : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* FAQ List */}
              <div className="p-3 space-y-2">
                {filteredFaqs.map(faq => (
                  <div
                    key={faq.id}
                    className="border border-neutral-200 rounded-xl overflow-hidden"
                  >
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                      className="w-full flex items-center justify-between p-3 text-left hover:bg-neutral-50 transition-colors"
                    >
                      <span className="text-sm font-medium text-neutral-800 pr-2">
                        {faq.question}
                      </span>
                      {expandedFaq === faq.id ? (
                        <ChevronUp size={16} className="text-neutral-400 flex-shrink-0" />
                      ) : (
                        <ChevronDown size={16} className="text-neutral-400 flex-shrink-0" />
                      )}
                    </button>
                    {expandedFaq === faq.id && (
                      <div className="px-3 pb-3 text-sm text-neutral-600 border-t border-neutral-100 pt-2">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contact Tab */}
          {activeTab === 'contact' && (
            <div className="flex-1 overflow-y-auto p-4">
              {contactSubmitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <Mail className="w-8 h-8 text-green-500" />
                  </div>
                  <h4 className="text-lg font-semibold text-neutral-900 mb-2">Message Sent!</h4>
                  <p className="text-sm text-neutral-600 mb-4">
                    We&apos;ll get back to you soon.
                  </p>
                  <button
                    onClick={() => setContactSubmitted(false)}
                    className="text-sm text-rose-500 hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-neutral-600 mb-1">
                      Inquiry Type
                    </label>
                    <select
                      value={contactForm.type}
                      onChange={(e) => setContactForm({ ...contactForm, type: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="careers">Career Inquiry</option>
                      <option value="support">Technical Support</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-neutral-600 mb-1">
                      Name *
                    </label>
                    <input
                      type="text"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      required
                      className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-neutral-600 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      required
                      className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-neutral-600 mb-1">
                      Subject *
                    </label>
                    <input
                      type="text"
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                      required
                      className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
                      placeholder="Subject"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-neutral-600 mb-1">
                      Message *
                    </label>
                    <textarea
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      required
                      rows={3}
                      className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400 resize-none"
                      placeholder="Your message..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={contactLoading}
                    className="w-full py-2.5 text-white text-sm font-medium rounded-lg transition-all duration-300 hover:shadow-lg disabled:opacity-50"
                    style={{
                      background: 'linear-gradient(135deg, #f472b6 0%, #fbbf24 100%)',
                    }}
                  >
                    {contactLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin mx-auto" />
                    ) : (
                      'Send Message'
                    )}
                  </button>
                  <p className="text-xs text-neutral-400 text-center">
                    Or email directly: {companyInfo.email}
                  </p>
                </form>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default CybotChatbot;
