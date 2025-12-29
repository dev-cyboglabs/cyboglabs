import React, { useEffect, useState, useMemo } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { companyInfo } from '../data/mockData';

const HeroSection = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = 400;
      const progress = Math.min(scrollY / maxScroll, 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Calculate individual part positions based on scroll
  const getPartStyle = (partIndex, totalParts) => {
    const threshold = partIndex / totalParts;
    const partProgress = Math.min(Math.max((scrollProgress - threshold * 0.5) / (1 / totalParts), 0), 1);
    
    const translateY = (1 - partProgress) * (80 + partIndex * 30);
    const opacity = 0.3 + partProgress * 0.7;
    const scale = 0.85 + partProgress * 0.15;
    
    return {
      transform: `translateY(${translateY}px) scale(${scale})`,
      opacity: opacity,
      transition: 'transform 0.2s ease-out, opacity 0.2s ease-out',
    };
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-neutral-50">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #000 1px, transparent 1px),
              linear-gradient(to bottom, #000 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          {/* Left Side - Text Content */}
          <div className="lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0">
            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-neutral-900 mb-4 tracking-tight">
              {companyInfo.name}
            </h1>

            {/* Tagline */}
            <p className="text-xl md:text-2xl lg:text-3xl text-neutral-500 mb-10">
              Technology & Life
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                to="/#contact"
                className="group px-8 py-3.5 bg-neutral-900 text-white text-base font-medium rounded-none hover:bg-neutral-800 transition-all duration-300 flex items-center space-x-2 uppercase tracking-wider"
              >
                <span>Get in Touch</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <Link
                to="/#projects"
                className="px-8 py-3.5 border-2 border-neutral-900 text-neutral-900 text-base font-medium rounded-none hover:bg-neutral-900 hover:text-white transition-all duration-300 uppercase tracking-wider"
              >
                Our Works
              </Link>
            </div>
          </div>

          {/* Right Side - Satellite Assembly */}
          <div className="lg:w-1/2 flex items-center justify-center">
            <div className="relative w-72 h-80 md:w-80 md:h-96 lg:w-96 lg:h-[420px]">
              {/* Satellite Main Body - Core Module */}
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                style={getPartStyle(0, 8)}
              >
                <div className="w-20 h-28 md:w-24 md:h-32 lg:w-28 lg:h-36 bg-gradient-to-b from-neutral-200 via-neutral-300 to-neutral-400 rounded-sm shadow-lg relative">
                  {/* Main Body Frame */}
                  <div className="absolute inset-1.5 border-2 border-neutral-500/40 rounded-sm" />
                  {/* Top Sensor Array */}
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 w-8 h-8 md:w-10 md:h-10 bg-neutral-800 rounded-full border-2 border-neutral-500 shadow-inner">
                    <div className="absolute inset-2 bg-gradient-to-br from-neutral-600 to-neutral-900 rounded-full" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50" />
                  </div>
                  {/* Middle Control Panel */}
                  <div className="absolute top-14 md:top-16 left-1/2 -translate-x-1/2 w-12 md:w-14 h-6 bg-neutral-600 rounded-sm border border-neutral-500">
                    <div className="flex justify-center items-center gap-1 pt-1">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                      <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }} />
                      <div className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }} />
                    </div>
                  </div>
                  {/* Bottom Vent */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-10 md:w-12 h-3 bg-neutral-600 rounded-sm">
                    <div className="flex justify-around pt-0.5">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="w-0.5 h-2 bg-neutral-800" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Left Solar Panel */}
              <div
                className="absolute left-2 lg:left-4 top-1/2 -translate-y-1/2"
                style={getPartStyle(1, 8)}
              >
                <div className="flex items-center">
                  {/* Panel Arm */}
                  <div className="w-4 md:w-6 h-2 bg-gradient-to-r from-neutral-500 to-neutral-400 rounded-sm" />
                  {/* Solar Panel */}
                  <div className="w-20 h-14 md:w-24 md:h-16 lg:w-28 lg:h-20 bg-gradient-to-r from-indigo-800 via-blue-700 to-indigo-800 rounded-sm shadow-lg border border-blue-500/30 relative overflow-hidden">
                    <div className="absolute inset-0.5 grid grid-cols-4 grid-rows-4 gap-px">
                      {[...Array(16)].map((_, i) => (
                        <div key={i} className="bg-blue-600 rounded-sm border border-blue-400/20" />
                      ))}
                    </div>
                    {/* Reflective shine */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
                  </div>
                </div>
              </div>

              {/* Right Solar Panel */}
              <div
                className="absolute right-2 lg:right-4 top-1/2 -translate-y-1/2"
                style={getPartStyle(2, 8)}
              >
                <div className="flex items-center flex-row-reverse">
                  {/* Panel Arm */}
                  <div className="w-4 md:w-6 h-2 bg-gradient-to-l from-neutral-500 to-neutral-400 rounded-sm" />
                  {/* Solar Panel */}
                  <div className="w-20 h-14 md:w-24 md:h-16 lg:w-28 lg:h-20 bg-gradient-to-l from-indigo-800 via-blue-700 to-indigo-800 rounded-sm shadow-lg border border-blue-500/30 relative overflow-hidden">
                    <div className="absolute inset-0.5 grid grid-cols-4 grid-rows-4 gap-px">
                      {[...Array(16)].map((_, i) => (
                        <div key={i} className="bg-blue-600 rounded-sm border border-blue-400/20" />
                      ))}
                    </div>
                    {/* Reflective shine */}
                    <div className="absolute inset-0 bg-gradient-to-bl from-white/10 via-transparent to-transparent" />
                  </div>
                </div>
              </div>

              {/* Top Communication Antenna */}
              <div
                className="absolute left-1/2 top-4 md:top-6 -translate-x-1/2"
                style={getPartStyle(3, 8)}
              >
                <div className="relative flex flex-col items-center">
                  {/* Antenna Mast */}
                  <div className="w-1.5 h-10 md:h-12 bg-gradient-to-b from-neutral-400 to-neutral-500 rounded-sm" />
                  {/* Antenna Head */}
                  <div className="absolute -top-2 w-4 h-4 md:w-5 md:h-5 bg-gradient-to-br from-neutral-300 to-neutral-500 rounded-full border border-neutral-400 shadow-md">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Satellite Dish */}
              <div
                className="absolute right-6 md:right-8 lg:right-12 top-20 md:top-24"
                style={getPartStyle(4, 8)}
              >
                <div className="relative">
                  {/* Dish Arm */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 w-1 h-4 bg-neutral-500" />
                  {/* Dish */}
                  <div className="w-10 h-10 md:w-12 md:h-12 border-4 border-neutral-400 rounded-full bg-gradient-to-br from-neutral-200 via-neutral-300 to-neutral-400 shadow-lg relative">
                    <div className="absolute inset-0 rounded-full border-2 border-neutral-300/50" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-neutral-600 rounded-full" />
                  </div>
                </div>
              </div>

              {/* Secondary Antenna - Left Side */}
              <div
                className="absolute left-8 md:left-10 lg:left-14 top-20 md:top-24"
                style={getPartStyle(5, 8)}
              >
                <div className="relative">
                  <div className="w-1 h-6 md:h-8 bg-neutral-500 rounded-sm" />
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-neutral-400 rounded-full border border-neutral-500" />
                </div>
              </div>

              {/* Thruster Module - Bottom */}
              <div
                className="absolute left-1/2 bottom-8 md:bottom-10 -translate-x-1/2"
                style={getPartStyle(6, 8)}
              >
                <div className="flex items-end space-x-1.5 md:space-x-2">
                  {/* Left Thruster */}
                  <div className="w-4 h-7 md:w-5 md:h-8 bg-gradient-to-b from-neutral-500 via-neutral-600 to-amber-600 rounded-b-full relative">
                    <div className="absolute inset-x-1 top-1 h-2 bg-neutral-700 rounded-sm" />
                  </div>
                  {/* Center Thruster (main) */}
                  <div className="w-5 h-9 md:w-6 md:h-10 bg-gradient-to-b from-neutral-500 via-neutral-600 to-orange-500 rounded-b-full relative">
                    <div className="absolute inset-x-1 top-1 h-2 bg-neutral-700 rounded-sm" />
                  </div>
                  {/* Right Thruster */}
                  <div className="w-4 h-7 md:w-5 md:h-8 bg-gradient-to-b from-neutral-500 via-neutral-600 to-amber-600 rounded-b-full relative">
                    <div className="absolute inset-x-1 top-1 h-2 bg-neutral-700 rounded-sm" />
                  </div>
                </div>
                {/* Thruster Glow Effect */}
                {scrollProgress > 0.5 && (
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex space-x-2">
                    <div className="w-3 h-4 bg-gradient-to-b from-orange-400 to-transparent rounded-b-full blur-sm opacity-60 animate-pulse" />
                    <div className="w-4 h-6 bg-gradient-to-b from-orange-500 to-transparent rounded-b-full blur-sm opacity-70 animate-pulse" />
                    <div className="w-3 h-4 bg-gradient-to-b from-orange-400 to-transparent rounded-b-full blur-sm opacity-60 animate-pulse" />
                  </div>
                )}
              </div>

              {/* Star Tracker Module */}
              <div
                className="absolute left-6 md:left-8 bottom-20 md:bottom-24"
                style={getPartStyle(7, 8)}
              >
                <div className="w-6 h-8 md:w-7 md:h-9 bg-gradient-to-b from-neutral-400 to-neutral-500 rounded-sm shadow-md relative">
                  <div className="absolute top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-neutral-700 rounded-full">
                    <div className="absolute inset-0.5 bg-gradient-to-br from-neutral-600 to-neutral-800 rounded-full" />
                  </div>
                </div>
              </div>

              {/* Assembly Progress Glow */}
              {scrollProgress > 0.8 && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-40 h-40 md:w-48 md:h-48 bg-blue-400/5 rounded-full blur-3xl animate-pulse" />
                </div>
              )}
            </div>
          </div>
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
