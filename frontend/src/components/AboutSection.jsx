import React from 'react';
import { FlaskConical, Cog, Lightbulb, Brain, Cpu, Rocket } from 'lucide-react';
import { specialties, companyInfo } from '../data/mockData';

const iconMap = {
  FlaskConical,
  Cog,
  Lightbulb,
  Brain,
  Cpu,
  Rocket,
};

const AboutSection = () => {
  return (
    <section id="about" className="bg-white">
      {/* Who We Are - Text Section */}
      <div className="py-24 lg:py-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-8 h-1 bg-gradient-to-r from-rose-400 to-amber-400 rounded-full" />
            <span className="text-neutral-500 text-sm uppercase tracking-widest font-medium">
              Who We Are
            </span>
            <div className="w-8 h-1 bg-gradient-to-r from-amber-400 to-rose-400 rounded-full" />
          </div>
          
          <p className="text-xl md:text-2xl text-neutral-700 leading-relaxed mb-8">
            We are a{' '}
            <span className="bg-gradient-to-r from-rose-500 to-amber-500 bg-clip-text text-transparent font-semibold">
              future-driven R&D powerhouse
            </span>{' '}
            committed to pushing boundaries and turning visionary ideas into cutting-edge innovations. 
            For us, the{' '}
            <span className="bg-gradient-to-r from-rose-500 to-amber-500 bg-clip-text text-transparent font-semibold">
              future
            </span>{' '}
            isn&apos;t something to predict, it&apos;s something to{' '}
            <span className="bg-gradient-to-r from-amber-500 to-rose-500 bg-clip-text text-transparent font-semibold">
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

      {/* Specialties Section with Softer Gradient Background */}
      <div
        className="py-24 lg:py-32"
        style={{
          background: 'linear-gradient(135deg, #f9a8d4 0%, #fcd34d 50%, #fdba74 100%)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Our Specialities
            </h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Comprehensive R&D capabilities driving innovation across multiple domains
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {specialties.map((specialty) => {
              const IconComponent = iconMap[specialty.icon];
              return (
                <div
                  key={specialty.id}
                  className="group p-6 lg:p-8 bg-white/95 backdrop-blur-sm rounded-2xl hover:shadow-xl transition-all duration-500 hover:bg-white"
                >
                  <div 
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                    style={{
                      background: 'linear-gradient(135deg, #f472b6 0%, #fbbf24 100%)',
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
