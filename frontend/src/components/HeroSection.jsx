import React, { useEffect, useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { companyInfo } from '../data/mockData';

const HeroSection = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = 500;
      const progress = Math.min(scrollY / maxScroll, 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Smooth easing function
  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

  // Calculate part animation with staggered timing
  const getPartStyle = (partIndex, totalParts, direction = 'down') => {
    const staggerDelay = 0.12;
    const partStart = partIndex * staggerDelay;
    const partEnd = partStart + 0.5;
    
    let partProgress = 0;
    if (scrollProgress > partStart) {
      partProgress = Math.min((scrollProgress - partStart) / (partEnd - partStart), 1);
    }
    
    const easedProgress = easeOutCubic(partProgress);
    
    let translateX = 0;
    let translateY = 0;
    const distance = 150;
    
    switch (direction) {
      case 'down':
        translateY = (1 - easedProgress) * -distance;
        break;
      case 'up':
        translateY = (1 - easedProgress) * distance;
        break;
      case 'left':
        translateX = (1 - easedProgress) * distance;
        break;
      case 'right':
        translateX = (1 - easedProgress) * -distance;
        break;
      default:
        translateY = (1 - easedProgress) * -distance;
    }
    
    return {
      transform: `translate(${translateX}px, ${translateY}px)`,
      opacity: easedProgress,
      transition: 'none',
    };
  };

  const isFullyAssembled = scrollProgress > 0.85;

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-neutral-50">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.02]"
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
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-neutral-900 mb-4 tracking-tight">
              {companyInfo.name}
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl text-neutral-500 mb-10">
              Engineering Tomorrow's Breakthroughs
            </p>
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
            <div className="relative w-80 h-80 md:w-96 md:h-96 lg:w-[420px] lg:h-[420px]">
              
              {/* Main Satellite Body - comes from top */}
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
                style={getPartStyle(0, 7, 'down')}
              >
                <div className="relative">
                  {/* Main chassis */}
                  <div className="w-16 h-24 md:w-20 md:h-28 lg:w-24 lg:h-32 bg-gradient-to-b from-slate-200 via-slate-300 to-slate-400 rounded-md shadow-xl border border-slate-300">
                    {/* Top sensor dome */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 md:w-10 md:h-10 bg-gradient-to-b from-slate-600 to-slate-800 rounded-full border-2 border-slate-500 shadow-lg">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50 animate-pulse" />
                    </div>
                    {/* Panel lines */}
                    <div className="absolute top-8 left-2 right-2 h-px bg-slate-400" />
                    <div className="absolute top-14 left-2 right-2 h-px bg-slate-400" />
                    <div className="absolute top-20 left-2 right-2 h-px bg-slate-400" />
                    {/* Status lights */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Left Solar Panel - comes from left */}
              <div
                className="absolute left-4 md:left-6 lg:left-8 top-1/2 -translate-y-1/2 z-0"
                style={getPartStyle(1, 7, 'left')}
              >
                <div className="flex items-center">
                  {/* Solar panel */}
                  <div className="w-20 h-12 md:w-28 md:h-16 lg:w-32 lg:h-20 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 rounded shadow-lg border border-blue-600/50 relative overflow-hidden">
                    {/* Solar cells grid */}
                    <div className="absolute inset-1 grid grid-cols-6 grid-rows-4 gap-px">
                      {[...Array(24)].map((_, i) => (
                        <div key={i} className="bg-blue-600 border border-blue-500/30" />
                      ))}
                    </div>
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent" />
                  </div>
                  {/* Connector arm */}
                  <div className="w-4 md:w-6 lg:w-8 h-2 bg-gradient-to-r from-slate-400 to-slate-500 rounded-r" />
                </div>
              </div>

              {/* Right Solar Panel - comes from right */}
              <div
                className="absolute right-4 md:right-6 lg:right-8 top-1/2 -translate-y-1/2 z-0"
                style={getPartStyle(2, 7, 'right')}
              >
                <div className="flex items-center flex-row-reverse">
                  {/* Solar panel */}
                  <div className="w-20 h-12 md:w-28 md:h-16 lg:w-32 lg:h-20 bg-gradient-to-l from-blue-900 via-blue-800 to-blue-700 rounded shadow-lg border border-blue-600/50 relative overflow-hidden">
                    {/* Solar cells grid */}
                    <div className="absolute inset-1 grid grid-cols-6 grid-rows-4 gap-px">
                      {[...Array(24)].map((_, i) => (
                        <div key={i} className="bg-blue-600 border border-blue-500/30" />
                      ))}
                    </div>
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-bl from-white/20 via-transparent to-transparent" />
                  </div>
                  {/* Connector arm */}
                  <div className="w-4 md:w-6 lg:w-8 h-2 bg-gradient-to-l from-slate-400 to-slate-500 rounded-l" />
                </div>
              </div>

              {/* Top Antenna - comes from top */}
              <div
                className="absolute left-1/2 top-12 md:top-14 lg:top-16 -translate-x-1/2 z-20"
                style={getPartStyle(3, 7, 'down')}
              >
                <div className="flex flex-col items-center">
                  {/* Antenna tip */}
                  <div className="w-4 h-4 md:w-5 md:h-5 bg-gradient-to-b from-red-500 to-red-600 rounded-full shadow-md border border-red-400 animate-pulse" />
                  {/* Antenna mast */}
                  <div className="w-1 h-8 md:h-10 lg:h-12 bg-gradient-to-b from-slate-300 to-slate-500" />
                </div>
              </div>

              {/* Satellite Dish - comes from right */}
              <div
                className="absolute right-16 md:right-20 lg:right-24 top-24 md:top-28 lg:top-32 z-20"
                style={getPartStyle(4, 7, 'right')}
              >
                <div className="relative">
                  {/* Dish mount */}
                  <div className="w-1 h-5 bg-slate-500 absolute -bottom-1 left-1/2 -translate-x-1/2" />
                  {/* Dish */}
                  <div className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400 border-2 border-slate-400 shadow-lg relative">
                    <div className="absolute inset-2 rounded-full border border-slate-300" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-slate-600 rounded-full" />
                  </div>
                </div>
              </div>

              {/* Secondary Antenna - comes from left */}
              <div
                className="absolute left-16 md:left-20 lg:left-24 top-24 md:top-28 lg:top-32 z-20"
                style={getPartStyle(5, 7, 'left')}
              >
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 bg-slate-500 rounded-full" />
                  <div className="w-0.5 h-6 md:h-8 bg-slate-400" />
                </div>
              </div>

              {/* Thruster Module - comes from bottom */}
              <div
                className="absolute left-1/2 bottom-16 md:bottom-20 lg:bottom-24 -translate-x-1/2 z-20"
                style={getPartStyle(6, 7, 'up')}
              >
                <div className="flex items-end gap-1">
                  {/* Left thruster */}
                  <div className="w-3 h-6 md:w-4 md:h-8 bg-gradient-to-b from-slate-500 to-slate-600 rounded-b-full relative">
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-1 bg-slate-700 rounded-b" />
                  </div>
                  {/* Center thruster (main) */}
                  <div className="w-4 h-8 md:w-5 md:h-10 bg-gradient-to-b from-slate-500 to-slate-600 rounded-b-full relative">
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-1 bg-slate-700 rounded-b" />
                  </div>
                  {/* Right thruster */}
                  <div className="w-3 h-6 md:w-4 md:h-8 bg-gradient-to-b from-slate-500 to-slate-600 rounded-b-full relative">
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-1 bg-slate-700 rounded-b" />
                  </div>
                </div>
                
                {/* Thruster flames when assembled */}
                {isFullyAssembled && (
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-1">
                    <div className="w-2 h-5 bg-gradient-to-b from-orange-500 via-yellow-400 to-transparent rounded-b-full blur-[2px] animate-pulse opacity-80" />
                    <div className="w-3 h-7 bg-gradient-to-b from-orange-500 via-yellow-400 to-transparent rounded-b-full blur-[2px] animate-pulse opacity-90" />
                    <div className="w-2 h-5 bg-gradient-to-b from-orange-500 via-yellow-400 to-transparent rounded-b-full blur-[2px] animate-pulse opacity-80" />
                  </div>
                )}
              </div>

              {/* Assembly complete glow effect */}
              {isFullyAssembled && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 bg-blue-400/10 rounded-full blur-3xl animate-pulse" />
                </div>
              )}

              {/* Assembly progress indicator */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center">
                <div className="w-32 h-1 bg-neutral-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-rose-400 to-amber-400 rounded-full transition-all duration-100"
                    style={{ width: `${Math.min(scrollProgress * 120, 100)}%` }}
                  />
                </div>
                <span className="text-xs text-neutral-400 mt-2 font-mono">
                  {Math.min(Math.round(scrollProgress * 120), 100)}% assembled
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 text-neutral-400 hover:text-neutral-900 transition-colors duration-300 cursor-pointer"
      >
        <span className="text-xs uppercase tracking-widest">Scroll to assemble</span>
        <ChevronDown size={20} className="animate-bounce" />
      </button>
    </section>
  );
};

export default HeroSection;
