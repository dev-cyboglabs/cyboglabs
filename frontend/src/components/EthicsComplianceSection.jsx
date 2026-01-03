import React from 'react';
import { Shield, Scale, Eye, Users, Lock, Award, CheckCircle } from 'lucide-react';

const EthicsComplianceSection = () => {
  const principles = [
    {
      icon: Shield,
      title: 'Integrity First',
      description: 'We uphold the highest standards of honesty and transparency in all our business dealings, research, and partnerships.',
    },
    {
      icon: Scale,
      title: 'Ethical Innovation',
      description: 'Our R&D practices prioritize responsible innovation, ensuring our technologies benefit society while minimizing potential risks.',
    },
    {
      icon: Eye,
      title: 'Transparency',
      description: 'We maintain open communication with stakeholders, providing clear insights into our processes, decisions, and outcomes.',
    },
    {
      icon: Users,
      title: 'Inclusive Excellence',
      description: 'We foster a diverse and inclusive environment where every team member can contribute their best work.',
    },
    {
      icon: Lock,
      title: 'Data Privacy',
      description: 'We are committed to protecting personal data and maintaining strict compliance with global privacy regulations.',
    },
    {
      icon: Award,
      title: 'Quality Standards',
      description: 'Our products and services meet rigorous quality benchmarks, backed by continuous improvement processes.',
    },
  ];

  const commitments = [
    'ISO 27001 Information Security Management',
    'GDPR & Data Protection Compliance',
    'Environmental Sustainability Practices',
    'Fair Labor Standards & Employee Welfare',
    'Anti-Corruption & Bribery Policies',
    'Responsible AI Development Guidelines',
  ];

  return (
    <section id="ethics" className="py-12 md:py-24 lg:py-32 bg-neutral-900 text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-1 bg-gradient-to-r from-rose-400 to-amber-400 rounded-full" />
            <span className="text-neutral-400 text-sm uppercase tracking-widest font-medium">
              Our Commitment
            </span>
            <div className="w-8 h-1 bg-gradient-to-r from-amber-400 to-rose-400 rounded-full" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Ethics &
            <span className="block text-neutral-500">Compliance</span>
          </h2>
          <p className="text-1xl md:text-xl text-neutral-400 max-w-3xl mx-auto">
            At CYBOGLABS, we believe that groundbreaking innovation must be built on a foundation of 
            ethical practices and unwavering integrity. Our commitment to compliance isn't just about 
            following rules—it's about leading with responsibility.
          </p>
        </div>

        {/* Core Principles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {principles.map((principle, index) => (
            <div
              key={index}
              className="group p-8 bg-neutral-800/50 rounded-2xl border border-neutral-700 hover:border-neutral-600 transition-all duration-300 hover:bg-neutral-800"
            >
              <div 
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                style={{
                  background: 'linear-gradient(135deg, rgba(244, 114, 182, 0.2) 0%, rgba(251, 191, 36, 0.2) 100%)',
                }}
              >
                <principle.icon 
                  className="w-7 h-7"
                  style={{
                    stroke: 'url(#iconGradient)',
                  }}
                  strokeWidth={1.5}
                />
                <svg width="0" height="0">
                  <defs>
                    <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f472b6" />
                      <stop offset="100%" stopColor="#fbbf24" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-rose-300 transition-colors duration-300">
                {principle.title}
              </h3>
              <p className="text-neutral-400 leading-relaxed">
                {principle.description}
              </p>
            </div>
          ))}
        </div>

        {/* Compliance Commitments */}
        <div className="bg-neutral-800/30 rounded-3xl p-8 md:p-12 border border-neutral-700">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="lg:w-1/2">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Our Compliance Framework
              </h3>
              <p className="text-neutral-400 leading-relaxed mb-6">
                We adhere to international standards and best practices, ensuring our operations 
                meet the highest benchmarks of corporate responsibility and regulatory compliance.
              </p>
              <a
                href="mailto:compliance@cyboglabs.com"
                className="inline-flex items-center px-6 py-3 text-sm font-medium text-white rounded-lg transition-all duration-300 hover:opacity-90"
                style={{
                  background: 'linear-gradient(135deg, #f472b6 0%, #fbbf24 100%)',
                }}
              >
                Contact Compliance Team
              </a>
            </div>
            
            <div className="lg:w-1/2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {commitments.map((commitment, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-neutral-300 text-sm">{commitment}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Quote */}
        <div className="text-center mt-16">
          <blockquote className="text-1xl md:text-2xl text-neutral-300 italic max-w-3xl mx-auto">
            "Innovation without ethics is incomplete. At CYBOGLABS, we engineer not just technology, 
            but trust."
          </blockquote>
          <p className="mt-4 text-neutral-500 text-xs md:text-sm uppercase tracking-wider">
            — CYBOGLABS Leadership
          </p>
        </div>
      </div>
    </section>
  );
};

export default EthicsComplianceSection;
