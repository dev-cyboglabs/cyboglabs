import React, { useEffect, useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { companyInfo } from '../data/mockData';

const HeroSection = () => {
  const [drawProgress, setDrawProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = 600;
      const progress = Math.min(scrollY / maxScroll, 1);
      setDrawProgress(progress);
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

  // Calculate stroke dash offset for drawing animation
  const getStrokeDashOffset = (pathLength, startPercent, endPercent) => {
    const progress = Math.max(0, Math.min(1, (drawProgress - startPercent) / (endPercent - startPercent)));
    return pathLength * (1 - progress);
  };

  const isComplete = drawProgress > 0.9;

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-neutral-50">
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

          {/* Right Side - Engineering Pencil Sketch Satellite */}
          <div className="lg:w-1/2 flex items-center justify-center">
            <div className="relative w-80 h-80 md:w-96 md:h-96 lg:w-[450px] lg:h-[450px]">
              
              {/* SVG Pencil Sketch Satellite */}
              <svg
                viewBox="0 0 400 400"
                className="w-full h-full"
                style={{ filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.05))' }}
              >
                {/* Definitions for sketch effects */}
                <defs>
                  {/* Pencil texture filter */}
                  <filter id="pencilTexture" x="-20%" y="-20%" width="140%" height="140%">
                    <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="5" result="noise"/>
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="1" xChannelSelector="R" yChannelSelector="G"/>
                  </filter>
                  
                  {/* Gradient for dimension lines */}
                  <linearGradient id="sketchGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#374151" stopOpacity="0.8"/>
                    <stop offset="100%" stopColor="#6b7280" stopOpacity="0.6"/>
                  </linearGradient>
                </defs>

                {/* Main Satellite Body - Rectangle with sketch lines */}
                <g className="satellite-body">
                  {/* Body outline */}
                  <rect
                    x="165" y="140" width="70" height="120"
                    fill="none"
                    stroke="#374151"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray="500"
                    strokeDashoffset={getStrokeDashOffset(500, 0, 0.15)}
                    style={{ transition: 'stroke-dashoffset 0.1s ease-out' }}
                  />
                  {/* Cross-hatch shading lines */}
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <line
                      key={`hatch-${i}`}
                      x1="170" y1={150 + i * 18}
                      x2="230" y2={150 + i * 18}
                      stroke="#9ca3af"
                      strokeWidth="0.5"
                      strokeDasharray="100"
                      strokeDashoffset={getStrokeDashOffset(100, 0.1 + i * 0.02, 0.2 + i * 0.02)}
                      style={{ transition: 'stroke-dashoffset 0.1s ease-out' }}
                    />
                  ))}
                  {/* Panel detail lines */}
                  <line x1="165" y1="175" x2="235" y2="175" stroke="#4b5563" strokeWidth="1.5"
                    strokeDasharray="70" strokeDashoffset={getStrokeDashOffset(70, 0.12, 0.22)}
                  />
                  <line x1="165" y1="210" x2="235" y2="210" stroke="#4b5563" strokeWidth="1.5"
                    strokeDasharray="70" strokeDashoffset={getStrokeDashOffset(70, 0.14, 0.24)}
                  />
                </g>

                {/* Left Solar Panel */}
                <g className="solar-panel-left">
                  {/* Panel frame */}
                  <rect
                    x="30" y="165" width="120" height="70"
                    fill="none"
                    stroke="#374151"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray="380"
                    strokeDashoffset={getStrokeDashOffset(380, 0.15, 0.35)}
                    style={{ transition: 'stroke-dashoffset 0.1s ease-out' }}
                  />
                  {/* Solar cell grid - vertical lines */}
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <line
                      key={`solar-v-l-${i}`}
                      x1={50 + i * 20} y1="170"
                      x2={50 + i * 20} y2="230"
                      stroke="#6b7280"
                      strokeWidth="0.8"
                      strokeDasharray="60"
                      strokeDashoffset={getStrokeDashOffset(60, 0.2 + i * 0.02, 0.35 + i * 0.02)}
                      style={{ transition: 'stroke-dashoffset 0.1s ease-out' }}
                    />
                  ))}
                  {/* Solar cell grid - horizontal lines */}
                  {[0, 1, 2].map((i) => (
                    <line
                      key={`solar-h-l-${i}`}
                      x1="35" y1={180 + i * 20}
                      x2="145" y2={180 + i * 20}
                      stroke="#6b7280"
                      strokeWidth="0.8"
                      strokeDasharray="110"
                      strokeDashoffset={getStrokeDashOffset(110, 0.25 + i * 0.02, 0.4 + i * 0.02)}
                      style={{ transition: 'stroke-dashoffset 0.1s ease-out' }}
                    />
                  ))}
                  {/* Connector arm */}
                  <line x1="150" y1="200" x2="165" y2="200" stroke="#374151" strokeWidth="3"
                    strokeDasharray="15" strokeDashoffset={getStrokeDashOffset(15, 0.18, 0.28)}
                  />
                </g>

                {/* Right Solar Panel */}
                <g className="solar-panel-right">
                  {/* Panel frame */}
                  <rect
                    x="250" y="165" width="120" height="70"
                    fill="none"
                    stroke="#374151"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray="380"
                    strokeDashoffset={getStrokeDashOffset(380, 0.35, 0.55)}
                    style={{ transition: 'stroke-dashoffset 0.1s ease-out' }}
                  />
                  {/* Solar cell grid - vertical lines */}
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <line
                      key={`solar-v-r-${i}`}
                      x1={270 + i * 20} y1="170"
                      x2={270 + i * 20} y2="230"
                      stroke="#6b7280"
                      strokeWidth="0.8"
                      strokeDasharray="60"
                      strokeDashoffset={getStrokeDashOffset(60, 0.4 + i * 0.02, 0.55 + i * 0.02)}
                      style={{ transition: 'stroke-dashoffset 0.1s ease-out' }}
                    />
                  ))}
                  {/* Solar cell grid - horizontal lines */}
                  {[0, 1, 2].map((i) => (
                    <line
                      key={`solar-h-r-${i}`}
                      x1="255" y1={180 + i * 20}
                      x2="365" y2={180 + i * 20}
                      stroke="#6b7280"
                      strokeWidth="0.8"
                      strokeDasharray="110"
                      strokeDashoffset={getStrokeDashOffset(110, 0.45 + i * 0.02, 0.6 + i * 0.02)}
                      style={{ transition: 'stroke-dashoffset 0.1s ease-out' }}
                    />
                  ))}
                  {/* Connector arm */}
                  <line x1="235" y1="200" x2="250" y2="200" stroke="#374151" strokeWidth="3"
                    strokeDasharray="15" strokeDashoffset={getStrokeDashOffset(15, 0.38, 0.48)}
                  />
                </g>

                {/* Top Antenna Assembly */}
                <g className="antenna-top">
                  {/* Main antenna mast */}
                  <line x1="200" y1="140" x2="200" y2="85" stroke="#374151" strokeWidth="2"
                    strokeDasharray="55" strokeDashoffset={getStrokeDashOffset(55, 0.55, 0.65)}
                  />
                  {/* Antenna dish */}
                  <ellipse cx="200" cy="70" rx="25" ry="15" fill="none" stroke="#374151" strokeWidth="2"
                    strokeDasharray="100" strokeDashoffset={getStrokeDashOffset(100, 0.6, 0.72)}
                  />
                  {/* Dish detail lines */}
                  <path d="M 180 70 Q 200 60 220 70" fill="none" stroke="#6b7280" strokeWidth="1"
                    strokeDasharray="45" strokeDashoffset={getStrokeDashOffset(45, 0.65, 0.75)}
                  />
                  {/* Antenna tip */}
                  <circle cx="200" cy="55" r="4" fill="none" stroke="#374151" strokeWidth="1.5"
                    strokeDasharray="25" strokeDashoffset={getStrokeDashOffset(25, 0.68, 0.78)}
                  />
                </g>

                {/* Bottom Thruster Module */}
                <g className="thruster-module">
                  {/* Main thruster body */}
                  <path
                    d="M 185 260 L 185 290 Q 185 300 195 300 L 205 300 Q 215 300 215 290 L 215 260"
                    fill="none"
                    stroke="#374151"
                    strokeWidth="2"
                    strokeDasharray="100"
                    strokeDashoffset={getStrokeDashOffset(100, 0.72, 0.85)}
                  />
                  {/* Thruster nozzles */}
                  <path d="M 188 300 L 185 320 L 195 315 L 205 315 L 215 320 L 212 300" fill="none" stroke="#4b5563" strokeWidth="1.5"
                    strokeDasharray="80" strokeDashoffset={getStrokeDashOffset(80, 0.78, 0.88)}
                  />
                  {/* Thruster detail lines */}
                  <line x1="190" y1="305" x2="190" y2="315" stroke="#6b7280" strokeWidth="1"
                    strokeDasharray="10" strokeDashoffset={getStrokeDashOffset(10, 0.82, 0.9)}
                  />
                  <line x1="200" y1="305" x2="200" y2="318" stroke="#6b7280" strokeWidth="1"
                    strokeDasharray="13" strokeDashoffset={getStrokeDashOffset(13, 0.83, 0.91)}
                  />
                  <line x1="210" y1="305" x2="210" y2="315" stroke="#6b7280" strokeWidth="1"
                    strokeDasharray="10" strokeDashoffset={getStrokeDashOffset(10, 0.84, 0.92)}
                  />
                </g>

                {/* Engineering Dimension Lines */}
                <g className="dimensions" opacity={drawProgress > 0.85 ? (drawProgress - 0.85) / 0.15 : 0}>
                  {/* Width dimension */}
                  <line x1="30" y1="250" x2="150" y2="250" stroke="#9ca3af" strokeWidth="0.5" strokeDasharray="3 2"/>
                  <line x1="30" y1="245" x2="30" y2="255" stroke="#9ca3af" strokeWidth="0.5"/>
                  <line x1="150" y1="245" x2="150" y2="255" stroke="#9ca3af" strokeWidth="0.5"/>
                  <text x="90" y="265" textAnchor="middle" fontSize="8" fill="#9ca3af" fontFamily="monospace">120mm</text>
                  
                  {/* Height dimension */}
                  <line x1="245" y1="140" x2="245" y2="260" stroke="#9ca3af" strokeWidth="0.5" strokeDasharray="3 2"/>
                  <line x1="240" y1="140" x2="250" y2="140" stroke="#9ca3af" strokeWidth="0.5"/>
                  <line x1="240" y1="260" x2="250" y2="260" stroke="#9ca3af" strokeWidth="0.5"/>
                  <text x="260" y="205" fontSize="8" fill="#9ca3af" fontFamily="monospace" transform="rotate(90, 260, 205)">120mm</text>
                </g>

                {/* Engineering Labels */}
                <g className="labels" opacity={drawProgress > 0.88 ? (drawProgress - 0.88) / 0.12 : 0}>
                  <text x="200" y="45" textAnchor="middle" fontSize="9" fill="#6b7280" fontFamily="monospace">COMM ARRAY</text>
                  <text x="90" y="155" textAnchor="middle" fontSize="9" fill="#6b7280" fontFamily="monospace">SOLAR PANEL A</text>
                  <text x="310" y="155" textAnchor="middle" fontSize="9" fill="#6b7280" fontFamily="monospace">SOLAR PANEL B</text>
                  <text x="200" y="340" textAnchor="middle" fontSize="9" fill="#6b7280" fontFamily="monospace">PROPULSION</text>
                </g>

                {/* Center crosshair when complete */}
                {isComplete && (
                  <g className="crosshair" opacity="0.3">
                    <line x1="200" y1="180" x2="200" y2="220" stroke="#ef4444" strokeWidth="0.5"/>
                    <line x1="180" y1="200" x2="220" y2="200" stroke="#ef4444" strokeWidth="0.5"/>
                    <circle cx="200" cy="200" r="10" fill="none" stroke="#ef4444" strokeWidth="0.5"/>
                  </g>
                )}
              </svg>

              {/* Drawing progress indicator */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center">
                <div className="w-36 h-1 bg-neutral-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-neutral-400 to-neutral-600 rounded-full transition-all duration-100"
                    style={{ width: `${Math.min(drawProgress * 110, 100)}%` }}
                  />
                </div>
                <span className="text-xs text-neutral-400 mt-2 font-mono tracking-wider">
                  {Math.min(Math.round(drawProgress * 110), 100)}% drafted
                </span>
              </div>

              {/* Blueprint stamp when complete */}
              {isComplete && (
                <div className="absolute top-4 right-4 opacity-40">
                  <div className="border-2 border-neutral-400 rounded px-3 py-1 rotate-[-15deg]">
                    <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider">Approved</span>
                  </div>
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
        <span className="text-xs uppercase tracking-widest font-mono">Scroll to draft</span>
        <ChevronDown size={20} className="animate-bounce" />
      </button>
    </section>
  );
};

export default HeroSection;
