import React, { useEffect, useRef, useState, useMemo } from 'react';
import { FlaskConical, Cog, Undo2, Lightbulb, Eye, Target } from 'lucide-react';
import { specialties, companyInfo } from '../data/mockData';

const iconMap = {
  FlaskConical,
  Cog,
  Undo2,
  Lightbulb,
};

const AboutSection = () => {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Pre-generate star positions
  const stars = useMemo(() => {
    return [...Array(80)].map((_, i) => ({
      id: i,
      left: `${(i * 17 + 23) % 100}%`,
      top: `${(i * 31 + 7) % 100}%`,
      delay: `${(i * 0.03) % 3}s`,
      opacity: 0.3 + ((i * 13) % 60) / 100,
    }));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const start = rect.top - windowHeight;
      const end = rect.bottom - windowHeight * 0.5;
      const total = end - start;
      const current = -start;
      
      const progress = Math.min(Math.max(current / total, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate individual part positions based on scroll
  const getPartStyle = (partIndex, totalParts) => {
    const threshold = partIndex / totalParts;
    const partProgress = Math.min(Math.max((scrollProgress - threshold) / (1 / totalParts), 0), 1);
    
    const translateY = (1 - partProgress) * (120 + partIndex * 40);
    const opacity = partProgress;
    const scale = 0.7 + partProgress * 0.3;
    
    return {
      transform: `translateY(${translateY}px) scale(${scale})`,
      opacity: opacity,
      transition: 'transform 0.15s ease-out, opacity 0.15s ease-out',
    };
  };

  return (
    <section id="about" className="bg-white">
      {/* Who We Are - Text Section */}
      <div className="py-24 lg:py-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-8 h-1 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full" />
            <span className="text-neutral-500 text-sm uppercase tracking-widest font-medium">
              Who We Are
            </span>
            <div className="w-8 h-1 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full" />
          </div>
          
          <p className="text-xl md:text-2xl text-neutral-700 leading-relaxed mb-8">
            We are a{' '}
            <span className="bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent font-semibold">
              future-driven R&D powerhouse
            </span>{' '}
            committed to pushing boundaries and turning visionary ideas into cutting-edge innovations. 
            For us, the{' '}
            <span className="bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent font-semibold">
              future
            </span>{' '}
            isn&apos;t something to predict, it&apos;s something to{' '}
            <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent font-semibold">
              create
            </span>.
          </p>

          {/* Vision */}
          <div className="mt-16 mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-6">Our Vision</h3>
            <p className="text-lg text-neutral-600 leading-relaxed max-w-3xl mx-auto">
              {companyInfo.vision}
            </p>
          </div>

          {/* Mission */}
          <div className="mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-6">Our Mission</h3>
            <p className="text-lg text-neutral-600 leading-relaxed max-w-3xl mx-auto">
              {companyInfo.mission}
            </p>
          </div>
        </div>
      </div>

      {/* Satellite Assembly Section with Gradient Background */}
      <div
        ref={containerRef}
        className="relative min-h-[120vh] overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #ec4899 0%, #f97316 50%, #fb923c 100%)',
        }}
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

        {/* Content */}
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center min-h-screen px-6 lg:px-16 py-20">
          {/* Satellite Assembly */}
          <div className="lg:w-1/2 flex items-center justify-center order-1 lg:order-2 mb-12 lg:mb-0">
            <div className="relative w-72 h-80 lg:w-80 lg:h-96">
              {/* Satellite Main Body */}
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                style={getPartStyle(0, 6)}
              >
                <div className="w-20 h-32 lg:w-24 lg:h-36 bg-gradient-to-b from-neutral-200 to-neutral-300 rounded-lg shadow-2xl relative border border-white/30">
                  <div className="absolute inset-2 border border-neutral-400/50 rounded-md" />
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-6 h-6 lg:w-8 lg:h-8 bg-neutral-800 rounded-full border-2 border-neutral-400" />
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-10 h-2 lg:w-12 lg:h-2 bg-neutral-500 rounded" />
                </div>
              </div>

              {/* Left Solar Panel */}
              <div
                className="absolute left-0 top-1/2 -translate-y-1/2"
                style={getPartStyle(1, 6)}
              >
                <div className="w-24 h-16 lg:w-28 lg:h-20 bg-gradient-to-r from-blue-400 to-blue-500 rounded-sm shadow-xl relative border border-white/30">
                  <div className="absolute inset-1 grid grid-cols-4 gap-0.5">
                    {[...Array(16)].map((_, i) => (
                      <div key={i} className="bg-blue-600 rounded-sm" />
                    ))}
                  </div>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full w-4 h-3 bg-neutral-400" />
                </div>
              </div>

              {/* Right Solar Panel */}
              <div
                className="absolute right-0 top-1/2 -translate-y-1/2"
                style={getPartStyle(2, 6)}
              >
                <div className="w-24 h-16 lg:w-28 lg:h-20 bg-gradient-to-l from-blue-400 to-blue-500 rounded-sm shadow-xl relative border border-white/30">
                  <div className="absolute inset-1 grid grid-cols-4 gap-0.5">
                    {[...Array(16)].map((_, i) => (
                      <div key={i} className="bg-blue-600 rounded-sm" />
                    ))}
                  </div>
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full w-4 h-3 bg-neutral-400" />
                </div>
              </div>

              {/* Communication Antenna */}
              <div
                className="absolute left-1/2 top-8 -translate-x-1/2"
                style={getPartStyle(3, 6)}
              >
                <div className="relative">
                  <div className="w-2 h-10 lg:h-12 bg-neutral-400 mx-auto" />
                  <div className="w-5 h-5 lg:w-6 lg:h-6 bg-neutral-500 rounded-full absolute -top-3 left-1/2 -translate-x-1/2 border border-white/30" />
                </div>
              </div>

              {/* Satellite Dish */}
              <div
                className="absolute right-4 top-16"
                style={getPartStyle(4, 6)}
              >
                <div className="relative">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 border-4 border-neutral-400 rounded-full bg-gradient-to-br from-neutral-300 to-neutral-400" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-2 h-2 bg-neutral-600 rounded-full" />
                  </div>
                </div>
              </div>

              {/* Thrusters */}
              <div
                className="absolute left-1/2 bottom-10 lg:bottom-12 -translate-x-1/2"
                style={getPartStyle(5, 6)}
              >
                <div className="flex space-x-2">
                  <div className="w-3 h-6 lg:w-4 lg:h-8 bg-gradient-to-b from-neutral-500 to-yellow-500 rounded-b-full" />
                  <div className="w-3 h-6 lg:w-4 lg:h-8 bg-gradient-to-b from-neutral-500 to-yellow-500 rounded-b-full" />
                </div>
                {scrollProgress > 0.8 && (
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-yellow-400/40 rounded-full blur-md animate-pulse" />
                )}
              </div>

              {/* Glow Effect when assembled */}
              {scrollProgress > 0.9 && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-40 h-40 lg:w-48 lg:h-48 bg-white/10 rounded-full blur-3xl animate-pulse" />
                </div>
              )}
            </div>
          </div>

          {/* Text Content */}
          <div className="lg:w-1/2 text-center lg:text-left order-2 lg:order-1">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Our Specialities
            </h2>
            <p className="text-white/80 text-lg md:text-xl max-w-lg mx-auto lg:mx-0 leading-relaxed mb-8">
              Watch as innovation comes together, piece by piece. Our R&D capabilities represent the pinnacle of engineering excellence.
            </p>
            
            {/* Progress Indicator */}
            <div className="flex items-center justify-center lg:justify-start space-x-4 mb-8">
              <div className="w-48 h-1.5 bg-white/30 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white rounded-full transition-all duration-100"
                  style={{ width: `${scrollProgress * 100}%` }}
                />
              </div>
              <span className="text-white/80 text-sm font-mono">
                {Math.round(scrollProgress * 100)}%
              </span>
            </div>

            {/* Assembly Labels */}
            <p className="text-white/60 text-sm uppercase tracking-widest">
              Scroll to assemble
            </p>
          </div>
        </div>
      </div>

      {/* Specialties Cards */}
      <div className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {specialties.map((specialty, index) => {
              const IconComponent = iconMap[specialty.icon];
              return (
                <div
                  key={specialty.id}
                  className="group p-6 lg:p-8 bg-white border border-neutral-200 rounded-2xl hover:shadow-xl transition-all duration-500"
                >
                  <div 
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                    style={{
                      background: 'linear-gradient(135deg, #ec4899 0%, #f97316 100%)',
                    }}
                  >
                    {IconComponent && (
                      <IconComponent className="w-7 h-7 text-white" />
                    )}
                  </div>
                  <h4 className="text-lg font-semibold text-neutral-900 mb-3">
                    {specialty.title}
                  </h4>
                  <p className="text-neutral-600 text-sm leading-relaxed">
                    {specialty.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
