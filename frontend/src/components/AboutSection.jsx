import React from 'react';
import { FlaskConical, Cog, Undo2, Lightbulb, ArrowRight, Eye, Target, Rocket } from 'lucide-react';
import { specialties, companyInfo } from '../data/mockData';

const iconMap = {
  FlaskConical,
  Cog,
  Undo2,
  Lightbulb,
};

const AboutSection = () => {
  return (
    <section id="about" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="inline-block px-4 py-2 bg-neutral-100 text-neutral-600 text-sm font-medium rounded-full mb-6">
            Who We Are
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6">
            Future-Driven
            <span className="block text-neutral-400">R&D Powerhouse</span>
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            {companyInfo.about}
          </p>
        </div>

        {/* Vision & Mission */}
        <div className="grid md:grid-cols-2 gap-8 mb-24">
          <div className="group p-8 lg:p-12 bg-neutral-950 rounded-3xl hover:bg-neutral-900 transition-all duration-500">
            <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Eye className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
            <p className="text-neutral-400 leading-relaxed">
              {companyInfo.vision}
            </p>
          </div>
          <div className="group p-8 lg:p-12 bg-neutral-100 rounded-3xl hover:bg-neutral-200 transition-all duration-500">
            <div className="w-14 h-14 bg-neutral-900 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Target className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-4">Our Mission</h3>
            <p className="text-neutral-600 leading-relaxed">
              {companyInfo.mission}
            </p>
          </div>
        </div>

        {/* Specialties */}
        <div className="mb-8">
          <h3 className="text-3xl md:text-4xl font-bold text-neutral-900 text-center mb-16">
            Our Specialties
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {specialties.map((specialty, index) => {
              const IconComponent = iconMap[specialty.icon];
              return (
                <div
                  key={specialty.id}
                  className="group p-6 lg:p-8 bg-white border border-neutral-200 rounded-2xl hover:border-neutral-900 hover:shadow-xl transition-all duration-500"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-12 h-12 bg-neutral-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-neutral-900 transition-colors duration-300">
                    {IconComponent && (
                      <IconComponent className="w-6 h-6 text-neutral-900 group-hover:text-white transition-colors duration-300" />
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
