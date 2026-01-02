import React, { useEffect, useState, useRef } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { companyInfo } from '../data/mockData';

const HeroSection = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const container = containerRef.current;
      const containerTop = container.offsetTop;
      const containerHeight = container.offsetHeight;
      const viewportHeight = window.innerHeight;
      const scrollY = window.scrollY;
      
      // Calculate progress based on scroll within the tall container
      const scrollableDistance = containerHeight - viewportHeight;
      const scrolledInContainer = scrollY - containerTop;
      const progress = Math.max(0, Math.min(1, scrolledInContainer / scrollableDistance));
      
      setScrollProgress(progress);
      
      // Check if animation is complete
      if (progress >= 0.95) {
        setIsAnimationComplete(true);
      } else {
        setIsAnimationComplete(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToNext = () => {
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Calculate the path length for the flowing line animation
  const flowOffset = 1000 - (scrollProgress * 1000);
  const displayProgress = Math.min(Math.round(scrollProgress * 100), 100);

  return (
    <div ref={containerRef} className="relative" style={{ height: '200vh' }}>
      {/* Sticky Hero Content */}
      <section className="sticky top-0 min-h-screen flex items-center overflow-hidden bg-neutral-50">
        {/* Engineering Blueprint Grid Background */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `
                linear-gradient(to right, #1a365d 1px, transparent 1px),
                linear-gradient(to bottom, #1a365d 1px, transparent 1px)
              `,
              backgroundSize: '30px 30px',
            }}
          />
          {/* Corner marks */}
          <div className="absolute top-8 left-8 w-12 h-12 border-l-2 border-t-2 border-neutral-300 opacity-40" />
          <div className="absolute top-8 right-8 w-12 h-12 border-r-2 border-t-2 border-neutral-300 opacity-40" />
          <div className="absolute bottom-8 left-8 w-12 h-12 border-l-2 border-b-2 border-neutral-300 opacity-40" />
          <div className="absolute bottom-8 right-8 w-12 h-12 border-r-2 border-b-2 border-neutral-300 opacity-40" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            {/* Left Side - Text Content */}
            <div className="lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-neutral-900 mb-4 tracking-tight">
                {companyInfo.name}
              </h1>
              <p className="text-xl md:text-2xl lg:text-3xl text-neutral-500 mb-10 uppercase tracking-wider">
                Technology & Life
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  to="/#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.querySelector('#contact');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="group px-8 py-3.5 bg-neutral-900 text-white text-base font-medium rounded-none hover:bg-neutral-800 transition-all duration-300 flex items-center space-x-2 uppercase tracking-wider"
                >
                  <span>Get in Touch</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
                <Link
                  to="/#projects"
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.querySelector('#projects');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="px-8 py-3.5 border-2 border-neutral-900 text-neutral-900 text-base font-medium rounded-none hover:bg-neutral-900 hover:text-white transition-all duration-300 uppercase tracking-wider"
                >
                  Our Works
                </Link>
              </div>
            </div>

            {/* Right Side - Static Engineering Pencil Sketch Satellite with Flowing Color Line */}
            <div className="lg:w-1/2 flex items-center justify-center">
              <div className="relative w-80 h-80 md:w-96 md:h-96 lg:w-[450px] lg:h-[450px]">
                
                {/* SVG Pencil Sketch Satellite - Static with Flowing Line */}
                <svg
                  viewBox="0 0 400 400"
                  className="w-full h-full"
                  style={{ filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.05))' }}
                >
                  {/* Definitions */}
                  <defs>
                    {/* Gradient for the flowing color line */}
                    <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f472b6"/>
                      <stop offset="50%" stopColor="#fb923c"/>
                      <stop offset="100%" stopColor="#fbbf24"/>
                    </linearGradient>
                    
                    {/* Glow filter for the flowing line */}
                    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Static Satellite Structure - Gray Lines */}
                  <g className="satellite-structure" stroke="#d1d5db" strokeWidth="1.5" fill="none">
                    {/* Main Satellite Body */}
                    <rect x="165" y="140" width="70" height="120" />
                    {/* Body detail lines */}
                    <line x1="165" y1="175" x2="235" y2="175" />
                    <line x1="165" y1="210" x2="235" y2="210" />
                    {/* Cross-hatch lines */}
                    {[0, 1, 2, 3, 4, 5].map((i) => (
                      <line key={`hatch-${i}`} x1="170" y1={150 + i * 18} x2="230" y2={150 + i * 18} strokeWidth="0.5" stroke="#e5e7eb" />
                    ))}
                    
                    {/* Left Solar Panel */}
                    <rect x="30" y="165" width="120" height="70" />
                    {/* Solar cell grid - vertical */}
                    {[0, 1, 2, 3, 4, 5].map((i) => (
                      <line key={`solar-v-l-${i}`} x1={50 + i * 20} y1="170" x2={50 + i * 20} y2="230" strokeWidth="0.8" stroke="#e5e7eb" />
                    ))}
                    {/* Solar cell grid - horizontal */}
                    {[0, 1, 2].map((i) => (
                      <line key={`solar-h-l-${i}`} x1="35" y1={180 + i * 20} x2="145" y2={180 + i * 20} strokeWidth="0.8" stroke="#e5e7eb" />
                    ))}
                    {/* Connector arm */}
                    <line x1="150" y1="200" x2="165" y2="200" strokeWidth="2" />
                    
                    {/* Right Solar Panel */}
                    <rect x="250" y="165" width="120" height="70" />
                    {/* Solar cell grid - vertical */}
                    {[0, 1, 2, 3, 4, 5].map((i) => (
                      <line key={`solar-v-r-${i}`} x1={270 + i * 20} y1="170" x2={270 + i * 20} y2="230" strokeWidth="0.8" stroke="#e5e7eb" />
                    ))}
                    {/* Solar cell grid - horizontal */}
                    {[0, 1, 2].map((i) => (
                      <line key={`solar-h-r-${i}`} x1="255" y1={180 + i * 20} x2="365" y2={180 + i * 20} strokeWidth="0.8" stroke="#e5e7eb" />
                    ))}
                    {/* Connector arm */}
                    <line x1="235" y1="200" x2="250" y2="200" strokeWidth="2" />
                    
                    {/* Antenna */}
                    <line x1="200" y1="140" x2="200" y2="85" />
                    <ellipse cx="200" cy="70" rx="25" ry="15" />
                    <path d="M 180 70 Q 200 60 220 70" strokeWidth="1" />
                    <circle cx="200" cy="55" r="4" />
                    
                    {/* Thruster Module */}
                    <path d="M 185 260 L 185 290 Q 185 300 195 300 L 205 300 Q 215 300 215 290 L 215 260" />
                    <path d="M 188 300 L 185 320 L 195 315 L 205 315 L 215 320 L 212 300" />
                    <line x1="190" y1="305" x2="190" y2="315" strokeWidth="0.8" />
                    <line x1="200" y1="305" x2="200" y2="318" strokeWidth="0.8" />
                    <line x1="210" y1="305" x2="210" y2="315" strokeWidth="0.8" />
                  </g>

                  {/* Flowing Color Line - Traces the satellite outline on scroll */}
                  <g className="flowing-line" filter="url(#glow)">
                    <path
                      d="M 200 55 
                         L 200 70 
                         C 175 70, 175 70, 180 70 
                         Q 200 60 220 70 
                         C 225 70, 225 70, 200 70
                         L 200 85 
                         L 200 140 
                         L 165 140 
                         L 165 200 
                         L 150 200 
                         L 30 200 
                         L 30 165 
                         L 150 165 
                         L 150 235 
                         L 30 235 
                         L 30 200 
                         L 150 200 
                         L 165 200 
                         L 165 260 
                         L 185 260 
                         L 185 300 
                         L 195 300 
                         L 195 315 
                         L 205 315 
                         L 205 300 
                         L 215 300 
                         L 215 260 
                         L 235 260 
                         L 235 200 
                         L 250 200 
                         L 370 200 
                         L 370 165 
                         L 250 165 
                         L 250 235 
                         L 370 235 
                         L 370 200 
                         L 250 200 
                         L 235 200 
                         L 235 140 
                         L 165 140"
                      fill="none"
                      stroke="url(#flowGradient)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeDasharray="1000"
                      strokeDashoffset={flowOffset}
                      style={{ transition: 'stroke-dashoffset 0.15s ease-out' }}
                    />
                  </g>

                  {/* Engineering Labels - Static */}
                  <g className="labels" fill="#9ca3af" fontSize="9" fontFamily="monospace">
                    <text x="200" y="45" textAnchor="middle">COMM ARRAY</text>
                    <text x="90" y="155" textAnchor="middle">SOLAR PANEL A</text>
                    <text x="310" y="155" textAnchor="middle">SOLAR PANEL B</text>
                    <text x="200" y="340" textAnchor="middle">PROPULSION</text>
                  </g>

                  {/* Dimension Lines - Static */}
                  <g className="dimensions" stroke="#d1d5db" strokeWidth="0.5" fill="#d1d5db" fontSize="8" fontFamily="monospace">
                    <line x1="30" y1="250" x2="150" y2="250" strokeDasharray="3 2"/>
                    <line x1="30" y1="245" x2="30" y2="255" />
                    <line x1="150" y1="245" x2="150" y2="255" />
                    <text x="90" y="265" textAnchor="middle">120mm</text>
                    
                    <line x1="245" y1="140" x2="245" y2="260" strokeDasharray="3 2"/>
                    <line x1="240" y1="140" x2="250" y2="140" />
                    <line x1="240" y1="260" x2="250" y2="260" />
                    <text x="260" y="205" transform="rotate(90, 260, 205)">120mm</text>
                  </g>

                  {/* Center crosshair */}
                  <g className="crosshair" opacity="0.2">
                    <line x1="200" y1="180" x2="200" y2="220" stroke="#ef4444" strokeWidth="0.5"/>
                    <line x1="180" y1="200" x2="220" y2="200" stroke="#ef4444" strokeWidth="0.5"/>
                    <circle cx="200" cy="200" r="10" fill="none" stroke="#ef4444" strokeWidth="0.5"/>
                  </g>
                </svg>

                {/* Progress indicator below satellite */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center">
                  <div className="w-36 h-1 bg-neutral-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-150"
                      style={{ 
                        width: `${displayProgress}%`,
                        background: 'linear-gradient(90deg, #f472b6 0%, #fb923c 50%, #fbbf24 100%)'
                      }}
                    />
                  </div>
                  <span className="text-xs text-neutral-400 mt-2 font-mono tracking-wider">
                    {displayProgress}%
                  </span>
                </div>

                {/* Complete stamp when animation finishes */}
                {isAnimationComplete && (
                  <div className="absolute top-4 right-4 opacity-60 animate-pulse">
                    <div className="border-2 border-green-500 rounded px-3 py-1 rotate-[-15deg]">
                      <span className="text-xs font-mono text-green-600 uppercase tracking-wider">Complete</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <button
          onClick={isAnimationComplete ? scrollToNext : undefined}
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 transition-all duration-500 cursor-pointer ${
            isAnimationComplete 
              ? 'text-neutral-900 hover:text-neutral-600' 
              : 'text-neutral-400'
          }`}
        >
          <span className="text-xs uppercase tracking-widest font-mono">
            {isAnimationComplete ? 'Continue scrolling' : 'Scroll to animate'}
          </span>
          <ChevronDown 
            size={20} 
            className={`transition-all duration-300 ${
              isAnimationComplete 
                ? 'animate-bounce text-green-500' 
                : 'animate-pulse'
            }`} 
          />
        </button>

        {/* Side Progress Indicators */}
        {!isAnimationComplete && (
          <>
            <div className="absolute left-4 top-1/2 -translate-y-1/2 hidden lg:block">
              <div className="h-32 w-1 bg-neutral-200 rounded-full overflow-hidden">
                <div 
                  className="w-full rounded-full transition-all duration-150"
                  style={{ 
                    height: `${displayProgress}%`,
                    background: 'linear-gradient(180deg, #f472b6 0%, #fb923c 50%, #fbbf24 100%)'
                  }}
                />
              </div>
            </div>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden lg:block">
              <div className="h-32 w-1 bg-neutral-200 rounded-full overflow-hidden">
                <div 
                  className="w-full rounded-full transition-all duration-150"
                  style={{ 
                    height: `${displayProgress}%`,
                    background: 'linear-gradient(180deg, #f472b6 0%, #fb923c 50%, #fbbf24 100%)'
                  }}
                />
              </div>
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default HeroSection;
