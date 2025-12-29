import React, { useEffect, useRef } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { companyInfo } from '../data/mockData';

const HeroSection = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!heroRef.current) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 20;
      const y = (clientY / innerHeight - 0.5) * 20;
      
      heroRef.current.style.setProperty('--mouse-x', `${x}px`);
      heroRef.current.style.setProperty('--mouse-y', `${y}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-neutral-950"
      style={{ '--mouse-x': '0px', '--mouse-y': '0px' }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-neutral-800/30 rounded-full blur-3xl"
          style={{
            transform: 'translate(calc(var(--mouse-x) * -1), calc(var(--mouse-y) * -1))',
            transition: 'transform 0.3s ease-out',
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-neutral-700/20 rounded-full blur-3xl"
          style={{
            transform: 'translate(var(--mouse-x), var(--mouse-y))',
            transition: 'transform 0.3s ease-out',
          }}
        />
        
        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(to right, #333 1px, transparent 1px),
              linear-gradient(to bottom, #333 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 mb-8 animate-fade-in">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-neutral-400 text-sm">Technology & Life</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight">
          <span className="block">Hello,</span>
          <span className="block mt-2 bg-gradient-to-r from-white via-neutral-300 to-neutral-500 bg-clip-text text-transparent">
            {companyInfo.name}
          </span>
        </h1>

        {/* Tagline */}
        <p className="text-xl md:text-2xl text-neutral-400 max-w-3xl mx-auto mb-12 leading-relaxed">
          We are a future-driven R&D powerhouse committed to pushing boundaries
          and turning visionary ideas into cutting-edge innovations.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link
            to="/#contact"
            className="group px-8 py-4 bg-white text-neutral-900 font-medium rounded-full hover:bg-neutral-100 transition-all duration-300 hover:shadow-xl hover:shadow-white/20 flex items-center space-x-2"
          >
            <span>Get in Touch</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
          <Link
            to="/#projects"
            className="px-8 py-4 border border-neutral-700 text-white font-medium rounded-full hover:bg-white/5 hover:border-neutral-500 transition-all duration-300"
          >
            Our Works
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {[
            { value: '4+', label: 'R&D Specialties' },
            { value: '3+', label: 'Active Projects' },
            { value: '∞', label: 'Innovation Ideas' },
            { value: '24/7', label: 'Support' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-neutral-500 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 text-neutral-500 hover:text-white transition-colors duration-300 cursor-pointer"
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <ChevronDown size={20} className="animate-bounce" />
      </button>
    </section>
  );
};

export default HeroSection;
