import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { faqData } from '../data/mockData';

const FAQSection = () => {
  const [expandedId, setExpandedId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...new Set(faqData.map(faq => faq.category))];
  const filteredFaqs = selectedCategory === 'All'
    ? faqData.slice(0, 8) // Show first 8 FAQs on homepage
    : faqData.filter(faq => faq.category === selectedCategory).slice(0, 8);

  return (
    <section className="py-24 lg:py-32 bg-neutral-50">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-1 bg-gradient-to-r from-rose-400 to-amber-400 rounded-full" />
            <span className="text-neutral-500 text-sm uppercase tracking-widest font-medium">
              FAQ
            </span>
            <div className="w-8 h-1 bg-gradient-to-r from-amber-400 to-rose-400 rounded-full" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4">
            Frequently Asked
            <span className="block text-neutral-400">Questions</span>
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Find answers to common questions about CYBOGLABS, our products, services, and career opportunities.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-neutral-900 text-white'
                  : 'bg-white text-neutral-600 border border-neutral-200 hover:border-neutral-400'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredFaqs.map((faq) => (
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
                expandedId === faq.id ? 'max-h-96' : 'max-h-0'
              }`}>
                <div className="px-6 pb-6 pt-0 ml-14">
                  <p className="text-neutral-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-neutral-600 mb-4">
            Still have questions? Chat with CYBOT or contact us directly.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:support@cyboglabs.com"
              className="inline-flex items-center px-6 py-3 bg-neutral-900 text-white font-medium rounded-lg hover:bg-neutral-800 transition-colors duration-300"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
