import React, { useEffect, useRef, useState, useMemo } from 'react';

const SatelliteAnimation = () => {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Pre-generate star positions to avoid Math.random during render
  const stars = useMemo(() => {
    return [...Array(100)].map((_, i) => ({
      id: i,
      left: `${(i * 17 + 23) % 100}%`,
      top: `${(i * 31 + 7) % 100}%`,
      delay: `${(i * 0.03) % 3}s`,
      opacity: 0.2 + ((i * 13) % 80) / 100,
    }));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate progress based on element position
      const start = rect.top - windowHeight;
      const end = rect.bottom;
      const total = end - start;
      const current = -start;
      
      const progress = Math.min(Math.max(current / total, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate individual part positions based on scroll
  const getPartStyle = (partIndex, totalParts) => {
    const threshold = partIndex / totalParts;
    const partProgress = Math.min(Math.max((scrollProgress - threshold) / (1 / totalParts), 0), 1);
    
    const translateY = (1 - partProgress) * (150 + partIndex * 50);
    const opacity = partProgress;
    const scale = 0.8 + partProgress * 0.2;
    
    return {
      transform: `translateY(${translateY}px) scale(${scale})`,
      opacity: opacity,
      transition: 'transform 0.1s ease-out, opacity 0.1s ease-out',
    };
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-[150vh] bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 overflow-hidden"
    >
      {/* Stars Background */}
      <div className="absolute inset-0">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: star.left,
              top: star.top,
              animationDelay: star.delay,
              opacity: star.opacity,
            }}
          />
        ))}
      </div>

      {/* Content Section */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center min-h-screen px-6 lg:px-16 py-20">
        {/* Text Content */}
        <div className="lg:w-1/2 text-center lg:text-left mb-16 lg:mb-0">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Building the
            <span className="block bg-gradient-to-r from-neutral-300 to-neutral-500 bg-clip-text text-transparent">
              Future of Space
            </span>
          </h2>
          <p className="text-neutral-400 text-lg md:text-xl max-w-lg mx-auto lg:mx-0 leading-relaxed">
            Watch as innovation comes together, piece by piece. Our satellite technology
            represents the pinnacle of engineering excellence and R&D innovation.
          </p>
          
          {/* Progress Indicator */}
          <div className="mt-12 flex items-center justify-center lg:justify-start space-x-4">
            <div className="w-48 h-1 bg-neutral-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-white to-neutral-400 rounded-full transition-all duration-100"
                style={{ width: `${scrollProgress * 100}%` }}
              />
            </div>
            <span className="text-neutral-500 text-sm font-mono">
              {Math.round(scrollProgress * 100)}%
            </span>
          </div>
        </div>

        {/* Satellite Assembly */}
        <div className="lg:w-1/2 flex items-center justify-center">
          <div className="relative w-80 h-96">
            {/* Satellite Main Body */}
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={getPartStyle(0, 6)}
            >
              <div className="w-24 h-36 bg-gradient-to-b from-neutral-700 to-neutral-800 rounded-lg shadow-2xl relative">
                {/* Body Details */}
                <div className="absolute inset-2 border border-neutral-600 rounded-md" />
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-neutral-900 rounded-full border-2 border-neutral-500" />
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-12 h-2 bg-neutral-600 rounded" />
              </div>
            </div>

            {/* Left Solar Panel */}
            <div
              className="absolute left-0 top-1/2 -translate-y-1/2"
              style={getPartStyle(1, 6)}
            >
              <div className="w-28 h-20 bg-gradient-to-r from-blue-900 to-blue-800 rounded-sm shadow-xl relative">
                <div className="absolute inset-1 grid grid-cols-4 gap-0.5">
                  {[...Array(16)].map((_, i) => (
                    <div key={i} className="bg-blue-700 rounded-sm" />
                  ))}
                </div>
                {/* Panel Arm */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full w-4 h-3 bg-neutral-600" />
              </div>
            </div>

            {/* Right Solar Panel */}
            <div
              className="absolute right-0 top-1/2 -translate-y-1/2"
              style={getPartStyle(2, 6)}
            >
              <div className="w-28 h-20 bg-gradient-to-l from-blue-900 to-blue-800 rounded-sm shadow-xl relative">
                <div className="absolute inset-1 grid grid-cols-4 gap-0.5">
                  {[...Array(16)].map((_, i) => (
                    <div key={i} className="bg-blue-700 rounded-sm" />
                  ))}
                </div>
                {/* Panel Arm */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full w-4 h-3 bg-neutral-600" />
              </div>
            </div>

            {/* Communication Antenna */}
            <div
              className="absolute left-1/2 top-8 -translate-x-1/2"
              style={getPartStyle(3, 6)}
            >
              <div className="relative">
                <div className="w-2 h-12 bg-neutral-500 mx-auto" />
                <div className="w-6 h-6 bg-neutral-600 rounded-full absolute -top-3 left-1/2 -translate-x-1/2" />
              </div>
            </div>

            {/* Satellite Dish */}
            <div
              className="absolute right-4 top-16"
              style={getPartStyle(4, 6)}
            >
              <div className="relative">
                <div className="w-12 h-12 border-4 border-neutral-500 rounded-full bg-gradient-to-br from-neutral-600 to-neutral-700" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-2 h-2 bg-neutral-400 rounded-full" />
                </div>
              </div>
            </div>

            {/* Thrusters */}
            <div
              className="absolute left-1/2 bottom-12 -translate-x-1/2"
              style={getPartStyle(5, 6)}
            >
              <div className="flex space-x-2">
                <div className="w-4 h-8 bg-gradient-to-b from-neutral-600 to-orange-600 rounded-b-full" />
                <div className="w-4 h-8 bg-gradient-to-b from-neutral-600 to-orange-600 rounded-b-full" />
              </div>
              {/* Thruster Glow */}
              {scrollProgress > 0.8 && (
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-orange-500/30 rounded-full blur-md animate-pulse" />
              )}
            </div>

            {/* Glow Effect when assembled */}
            {scrollProgress > 0.9 && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-48 h-48 bg-white/5 rounded-full blur-3xl animate-pulse" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Assembly Labels */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-center">
        <p className="text-neutral-500 text-sm uppercase tracking-widest mb-2">
          Scroll to assemble
        </p>
        <div className="w-6 h-10 border-2 border-neutral-600 rounded-full mx-auto flex justify-center">
          <div className="w-1.5 h-3 bg-neutral-500 rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </div>
  );
};

export default SatelliteAnimation;
