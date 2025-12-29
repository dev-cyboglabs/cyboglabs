import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Search } from 'lucide-react';
import { faqData } from '../data/mockData';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CybotChatbot from '../components/CybotChatbot';

const FAQPage = () => {
  const [expandedId, setExpandedId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', ...new Set(faqData.map(faq => faq.category))];
  
  const filteredFaqs = faqData.filter(faq => {
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-1 bg-gradient-to-r from-rose-400 to-amber-400 rounded-full" />
            <span className="text-neutral-500 text-sm uppercase tracking-widest font-medium">
              Support
            </span>
            <div className="w-8 h-1 bg-gradient-to-r from-amber-400 to-rose-400 rounded-full" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6">
            Frequently Asked
            <span className="block text-neutral-400">Questions</span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto mb-10">
            Find answers to common questions about CYBOGLABS, our products, services, and career opportunities.
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={20} />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-full border border-neutral-200 focus:border-neutral-400 focus:outline-none focus:ring-0 text-neutral-900 placeholder-neutral-400 shadow-sm"
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          {/* Category Filter */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-neutral-900 text-white'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Results Count */}
          <p className="text-neutral-500 text-sm mb-8 text-center">
            Showing {filteredFaqs.length} {filteredFaqs.length === 1 ? 'result' : 'results'}
            {searchQuery && ` for "${searchQuery}"`}
          </p>

          {/* FAQ Items */}
          <div className="space-y-4">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq) => (
                <div
                  key={faq.id}
                  className="bg-white rounded-2xl border border-neutral-200 overflow-hidden hover:shadow-lg transition-all duration-300"
                >
                  <button
                    onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
                    className="w-full flex items-center justify-between p-6 text-left"
                  >
                    <div className="flex items-start gap-4 pr-4">
                      <div 
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{
                          background: 'linear-gradient(135deg, #f472b6 0%, #fbbf24 100%)',
                        }}
                      >
                        <HelpCircle className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <span className="text-xs font-medium text-neutral-400 uppercase tracking-wider">
                          {faq.category}
                        </span>
                        <h3 className="text-lg font-semibold text-neutral-900 mt-1">
                          {faq.question}
                        </h3>
                      </div>
                    </div>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 flex-shrink-0 ${
                      expandedId === faq.id ? 'bg-neutral-900' : 'bg-neutral-100'
                    }`}>
                      {expandedId === faq.id ? (
                        <ChevronUp size={18} className="text-white" />
                      ) : (
                        <ChevronDown size={18} className="text-neutral-600" />
                      )}
                    </div>
                  </button>
                  
                  <div className={`overflow-hidden transition-all duration-300 ${
                    expandedId === faq.id ? 'max-h-[500px]' : 'max-h-0'
                  }`}>
                    <div className="px-6 pb-6 pt-0 ml-14">
                      <p className="text-neutral-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-16">
                <HelpCircle className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">No results found</h3>
                <p className="text-neutral-600">
                  Try adjusting your search or filter to find what you're looking for.
                </p>
              </div>
            )}
          </div>

          {/* CTA */}
          <div className="text-center mt-16 p-8 bg-neutral-50 rounded-2xl">
            <h3 className="text-2xl font-bold text-neutral-900 mb-4">
              Still have questions?
            </h3>
            <p className="text-neutral-600 mb-6 max-w-lg mx-auto">
              Can't find the answer you're looking for? Chat with CYBOT or contact our support team directly.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="mailto:support@cyboglabs.com"
                className="inline-flex items-center px-6 py-3 bg-neutral-900 text-white font-medium rounded-lg hover:bg-neutral-800 transition-colors duration-300"
              >
                Contact Support
              </a>
              <a
                href="mailto:careers@cyboglabs.com"
                className="inline-flex items-center px-6 py-3 border border-neutral-300 text-neutral-700 font-medium rounded-lg hover:bg-neutral-100 transition-colors duration-300"
              >
                Career Inquiries
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <CybotChatbot />
    </div>
  );
};

export default FAQPage;
