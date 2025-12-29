import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, MapPin, Clock, Briefcase, Users, Zap, Heart } from 'lucide-react';
import { careers } from '../data/mockData';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CybotChatbot from '../components/CybotChatbot';

const CareersPage = () => {
  const benefits = [
    {
      icon: Zap,
      title: "Innovation First",
      description: "Work on cutting-edge R&D projects that shape the future of technology"
    },
    {
      icon: Users,
      title: "Collaborative Culture",
      description: "Join a team of passionate engineers, researchers, and innovators"
    },
    {
      icon: Heart,
      title: "Work-Life Balance",
      description: "Flexible work arrangements with hybrid and remote options"
    },
    {
      icon: Briefcase,
      title: "Growth Opportunities",
      description: "Continuous learning, certifications, and career advancement paths"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section 
        className="pt-32 pb-20 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)',
        }}
      >
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(to right, #fff 1px, transparent 1px),
                linear-gradient(to bottom, #fff 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
            }}
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <Link
            to="/"
            className="inline-flex items-center text-neutral-400 hover:text-white mb-8 transition-colors duration-300"
          >
            <ArrowLeft size={18} className="mr-2" />
            Back to Home
          </Link>

          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-1 bg-gradient-to-r from-rose-400 to-amber-400 rounded-full" />
              <span className="text-neutral-400 text-sm uppercase tracking-widest font-medium">
                Careers
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Build the Future
              <span className="block bg-gradient-to-r from-rose-400 to-amber-400 bg-clip-text text-transparent">
                With Us
              </span>
            </h1>
            <p className="text-xl text-neutral-300 leading-relaxed">
              Join CYBOGLABS and be part of a team that&apos;s pushing the boundaries of technology. 
              We&apos;re looking for passionate innovators who want to create solutions that matter.
            </p>
          </div>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Why Join CYBOGLABS?
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              We offer more than just a job – we offer the opportunity to make a real impact
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div
                  key={index}
                  className="p-6 bg-white rounded-2xl border border-neutral-200 hover:shadow-lg transition-all duration-300"
                >
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{
                      background: 'linear-gradient(135deg, #f472b6 0%, #fbbf24 100%)',
                    }}
                  >
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-neutral-600 text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-1 bg-gradient-to-r from-rose-400 to-amber-400 rounded-full" />
              <span className="text-neutral-500 text-sm uppercase tracking-widest font-medium">
                Open Positions
              </span>
              <div className="w-8 h-1 bg-gradient-to-r from-amber-400 to-rose-400 rounded-full" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Current Opportunities
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Explore our open positions and find where you can make the biggest impact
            </p>
          </div>

          <div className="space-y-6">
            {careers.map((job) => (
              <div
                key={job.id}
                className="group p-6 lg:p-8 bg-white border border-neutral-200 rounded-2xl hover:border-neutral-400 hover:shadow-xl transition-all duration-500"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span 
                        className="px-3 py-1 text-xs font-medium text-white rounded-full"
                        style={{
                          background: 'linear-gradient(135deg, #f472b6 0%, #fbbf24 100%)',
                        }}
                      >
                        {job.department}
                      </span>
                      <span className="px-3 py-1 text-xs font-medium text-neutral-600 bg-neutral-100 rounded-full">
                        {job.type}
                      </span>
                    </div>
                    
                    <h3 className="text-xl lg:text-2xl font-bold text-neutral-900 mb-3 group-hover:text-neutral-700 transition-colors duration-300">
                      {job.title}
                    </h3>
                    
                    <p className="text-neutral-600 mb-4 line-clamp-2">
                      {job.shortDescription}
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-500">
                      <span className="flex items-center gap-1.5">
                        <MapPin size={16} />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Briefcase size={16} />
                        {job.experience}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock size={16} />
                        Posted {job.posted}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
                    <Link
                      to={`/careers/${job.id}`}
                      className="inline-flex items-center justify-center px-6 py-3 bg-neutral-900 text-white font-medium rounded-lg hover:bg-neutral-800 transition-all duration-300 group/btn"
                    >
                      <span>View Details</span>
                      <ArrowRight size={16} className="ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </div>
                </div>
                
                {/* Tech Stack Tags */}
                <div className="mt-6 pt-6 border-t border-neutral-100">
                  <div className="flex flex-wrap gap-2">
                    {job.techStack.slice(0, 6).map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-xs font-medium text-neutral-600 bg-neutral-100 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                    {job.techStack.length > 6 && (
                      <span className="px-3 py-1 text-xs font-medium text-neutral-400">
                        +{job.techStack.length - 6} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        className="py-20"
        style={{
          background: 'linear-gradient(135deg, #f9a8d4 0%, #fcd34d 50%, #fdba74 100%)',
        }}
      >
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Don&apos;t See a Perfect Fit?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            We&apos;re always looking for talented individuals. Send us your resume and let us know how you can contribute to our mission.
          </p>
          <a
            href="mailto:careers@cyboglabs.com"
            className="inline-flex items-center px-8 py-4 bg-white text-neutral-900 font-medium rounded-lg hover:bg-neutral-100 transition-all duration-300 shadow-lg"
          >
            Send Your Resume
            <ArrowRight size={18} className="ml-2" />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CareersPage;
