import React from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { companyInfo } from '../data/mockData';

const HeroSection = () => {
  const scrollToAbout = () => {
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-neutral-50">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #000 1px, transparent 1px),
              linear-gradient(to bottom, #000 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
        {/* Main Heading */}
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-neutral-900 mb-6 tracking-tight">
          {companyInfo.name}
        </h1>

        {/* Tagline */}
        <p className="text-2xl md:text-3xl lg:text-4xl text-neutral-500 mb-12">
          Technology & Life
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <Link
            to="/#contact"
            className="group px-10 py-4 bg-neutral-900 text-white text-lg font-medium rounded-none hover:bg-neutral-800 transition-all duration-300 flex items-center space-x-2 uppercase tracking-wider"
          >
            <span>Get in Touch</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
          <Link
            to="/#projects"
            className="px-10 py-4 border-2 border-neutral-900 text-neutral-900 text-lg font-medium rounded-none hover:bg-neutral-900 hover:text-white transition-all duration-300 uppercase tracking-wider"
          >
            Our Works
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 text-neutral-400 hover:text-neutral-900 transition-colors duration-300 cursor-pointer"
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <ChevronDown size={20} className="animate-bounce" />
      </button>
    </section>
  );
};

export default HeroSection;
