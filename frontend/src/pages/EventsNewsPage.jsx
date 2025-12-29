import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Calendar, MapPin, Tag, X, Award, Newspaper } from 'lucide-react';
import { eventsAndNews } from '../data/mockData';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CybotChatbot from '../components/CybotChatbot';

const EventsNewsPage = () => {
  const [filter, setFilter] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredItems = eventsAndNews.filter((item) => {
    if (filter === 'all') return true;
    return item.type === filter;
  });

  const featuredItem = eventsAndNews.find((item) => item.featured);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section 
        className="pt-32 pb-20 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)',
        }}
      >
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(to right, #fff 1px, transparent 1px),
                linear-gradient(to bottom, #fff 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
            }}
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <Link
            to="/"
            className="inline-flex items-center text-neutral-400 hover:text-white mb-8 transition-colors duration-300"
          >
            <ArrowLeft size={18} className="mr-2" />
            Back to Home
          </Link>

          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-1 bg-gradient-to-r from-rose-400 to-amber-400 rounded-full" />
              <span className="text-neutral-400 text-sm uppercase tracking-widest font-medium">
                Events & News
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Stay Updated
              <span className="block bg-gradient-to-r from-rose-400 to-amber-400 bg-clip-text text-transparent">
                With Us
              </span>
            </h1>
            <p className="text-xl text-neutral-300 leading-relaxed">
              Discover the latest news, events, and achievements from CYBOGLABS. 
              Stay informed about our innovations and industry insights.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Item */}
      {featuredItem && (
        <section className="py-16 bg-neutral-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center gap-2 mb-8">
              <Award className="w-5 h-5 text-amber-500" />
              <span className="text-neutral-600 font-medium">Featured</span>
            </div>
            
            <div 
              className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
              onClick={() => setSelectedItem(featuredItem)}
            >
              <div className="grid lg:grid-cols-2">
                <div className="relative h-64 lg:h-auto overflow-hidden">
                  <img
                    src={featuredItem.image}
                    alt={featuredItem.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent lg:hidden" />
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span 
                      className="px-3 py-1 text-xs font-medium text-white rounded-full"
                      style={{
                        background: 'linear-gradient(135deg, #f472b6 0%, #fbbf24 100%)',
                      }}
                    >
                      {featuredItem.category}
                    </span>
                    <span className="px-3 py-1 text-xs font-medium text-neutral-600 bg-neutral-100 rounded-full capitalize">
                      {featuredItem.type}
                    </span>
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-neutral-900 mb-3 group-hover:text-neutral-700 transition-colors duration-300">
                    {featuredItem.title}
                  </h2>
                  <p className="text-neutral-500 mb-2">{featuredItem.subtitle}</p>
                  <p className="text-neutral-600 mb-6 line-clamp-3">
                    {featuredItem.shortDescription}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-500 mb-6">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={16} />
                      {featuredItem.date}
                    </span>
                    {featuredItem.location && (
                      <span className="flex items-center gap-1.5">
                        <MapPin size={16} />
                        {featuredItem.location}
                      </span>
                    )}
                  </div>
                  <button className="inline-flex items-center text-neutral-900 font-medium group/btn">
                    <span>Learn More</span>
                    <ArrowRight size={16} className="ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Filter Tabs */}
      <section className="py-8 bg-white border-b border-neutral-200 sticky top-16 lg:top-20 z-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-3">
            {[
              { key: 'all', label: 'All', icon: null },
              { key: 'event', label: 'Events', icon: Calendar },
              { key: 'news', label: 'News', icon: Newspaper },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                  filter === tab.key
                    ? 'bg-neutral-900 text-white'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {tab.icon && <tab.icon size={16} className="mr-1.5" />}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* All Items Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.filter(item => !item.featured).map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-2xl overflow-hidden border border-neutral-200 hover:border-neutral-400 hover:shadow-xl transition-all duration-500 cursor-pointer"
                onClick={() => setSelectedItem(item)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 to-transparent" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span 
                      className="px-3 py-1 text-xs font-medium text-white rounded-full"
                      style={{
                        background: 'linear-gradient(135deg, #f472b6 0%, #fbbf24 100%)',
                      }}
                    >
                      {item.category}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-white/70 text-sm capitalize">{item.type}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2 group-hover:text-neutral-700 transition-colors duration-300 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-neutral-600 text-sm mb-4 line-clamp-2">
                    {item.shortDescription}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-neutral-500">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {item.date}
                      </span>
                    </div>
                    <button className="inline-flex items-center text-neutral-900 text-sm font-medium group/btn">
                      <span>Learn More</span>
                      <ArrowRight size={14} className="ml-1 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Internships CTA */}
      <section 
        className="py-20"
        style={{
          background: 'linear-gradient(135deg, #f9a8d4 0%, #fcd34d 50%, #fdba74 100%)',
        }}
      >
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Looking for Internship Opportunities?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Kickstart your career with hands-on experience at CYBOGLABS. 
            Learn from industry experts and work on cutting-edge projects.
          </p>
          <Link
            to="/internships"
            className="inline-flex items-center px-8 py-4 bg-white text-neutral-900 font-medium rounded-lg hover:bg-neutral-100 transition-all duration-300 shadow-lg"
          >
            View Internships
            <ArrowRight size={18} className="ml-2" />
          </Link>
        </div>
      </section>

      {/* Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl my-8">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full text-neutral-600 hover:text-neutral-900 transition-colors duration-300 shadow-lg"
            >
              <X size={24} />
            </button>

            {/* Modal Image */}
            <div className="relative h-64 md:h-80 overflow-hidden rounded-t-2xl">
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span 
                    className="px-3 py-1 text-xs font-medium text-white rounded-full"
                    style={{
                      background: 'linear-gradient(135deg, #f472b6 0%, #fbbf24 100%)',
                    }}
                  >
                    {selectedItem.category}
                  </span>
                  <span className="px-3 py-1 text-xs font-medium text-white bg-white/20 backdrop-blur-sm rounded-full capitalize">
                    {selectedItem.type}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  {selectedItem.title}
                </h2>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 md:p-8">
              {selectedItem.subtitle && (
                <p className="text-lg text-neutral-500 mb-4">{selectedItem.subtitle}</p>
              )}
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-500 mb-6 pb-6 border-b border-neutral-200">
                <span className="flex items-center gap-1.5">
                  <Calendar size={16} />
                  {selectedItem.date}
                </span>
                {selectedItem.location && (
                  <span className="flex items-center gap-1.5">
                    <MapPin size={16} />
                    {selectedItem.location}
                  </span>
                )}
                <span className="flex items-center gap-1.5">
                  <Tag size={16} />
                  {selectedItem.category}
                </span>
              </div>

              <div className="prose prose-neutral max-w-none">
                {selectedItem.fullContent.split('\n\n').map((paragraph, index) => {
                  if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                    return (
                      <h3 key={index} className="text-xl font-bold text-neutral-900 mt-6 mb-3">
                        {paragraph.replace(/\*\*/g, '')}
                      </h3>
                    );
                  }
                  if (paragraph.includes('•')) {
                    const items = paragraph.split('•').filter(Boolean);
                    return (
                      <ul key={index} className="space-y-2 my-4">
                        {items.map((item, i) => (
                          <li key={i} className="flex items-start">
                            <span className="w-1.5 h-1.5 bg-rose-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                            <span className="text-neutral-600">{item.trim()}</span>
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  return (
                    <p key={index} className="text-neutral-600 leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default EventsNewsPage;
