import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Lock, Eye, Database, Shield, UserCheck } from 'lucide-react';
import { privacyPolicy } from '../data/mockData';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CybotChatbot from '../components/CybotChatbot';

const PrivacyPage = () => {
  const icons = [Lock, Eye, Database, Shield, UserCheck, Eye, Database, Lock];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-neutral-950">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center text-neutral-400 hover:text-white mb-8 transition-colors duration-300"
          >
            <ArrowLeft size={18} className="mr-2" />
            Back to Home
          </Link>

          <div className="flex items-center space-x-4 mb-6">
            <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center">
              <Lock className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                Privacy Policy
              </h1>
              <p className="text-neutral-400 mt-2">Last updated: {privacyPolicy.lastUpdated}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      {/* <section className="py-8 bg-neutral-50 border-b border-neutral-200 sticky top-16 lg:top-20 z-40">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="flex items-center space-x-2 overflow-x-auto pb-2">
            <span className="text-neutral-500 text-sm whitespace-nowrap">Jump to:</span>
            {privacyPolicy.sections.slice(0, 5).map((section, index) => (
              <a
                key={index}
                href={`#privacy-section-${index}`}
                className="px-3 py-1.5 text-sm text-neutral-600 bg-white border border-neutral-200 rounded-full hover:bg-neutral-100 transition-colors duration-300 whitespace-nowrap"
              >
                {section.title.split('.')[0]}
              </a>
            ))}
          </div>
        </div>
      </section> */}

      {/* Content */}
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          {/* Introduction */}
          <div className="mb-12 p-6 bg-neutral-50 rounded-2xl border border-neutral-200">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-neutral-900 rounded-xl flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-neutral-900 mb-2">Your Privacy Matters</h2>
                <p className="text-neutral-600 leading-relaxed">
                  At CYBOGLABS, we are committed to protecting your privacy and ensuring the security of your personal information.
                  This policy explains how we collect, use, and safeguard your data.
                </p>
              </div>
            </div>
          </div>

          {/* Sections */}
          <div className="space-y-12">
            {privacyPolicy.sections.map((section, index) => {
              const IconComponent = icons[index % icons.length];
              return (
                <div
                  key={index}
                  id={`privacy-section-${index}`}
                  className="scroll-mt-40"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-neutral-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-5 h-5 text-neutral-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-neutral-900 mb-4">
                        {section.title}
                      </h2>
                      <p className="text-neutral-600 leading-relaxed">
                        {section.content}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Cookie Notice */}
          <div className="mt-16 p-6 bg-neutral-100 rounded-2xl">
            <h3 className="text-lg font-semibold text-neutral-900 mb-3">Cookie Notice</h3>
            <p className="text-neutral-600 leading-relaxed mb-4">
              We use cookies to enhance your browsing experience, analyze site traffic, and personalize content.
              By continuing to use our site, you consent to our use of cookies.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="px-3 py-1 bg-white text-neutral-600 text-sm rounded-full border border-neutral-200">
                Essential Cookies
              </span>
              <span className="px-3 py-1 bg-white text-neutral-600 text-sm rounded-full border border-neutral-200">
                Analytics Cookies
              </span>
              <span className="px-3 py-1 bg-white text-neutral-600 text-sm rounded-full border border-neutral-200">
                Functional Cookies
              </span>
            </div>
          </div>

          {/* Contact */}
          <div className="mt-16 p-8 bg-neutral-950 rounded-3xl text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Privacy Concerns?</h3>
            <p className="text-neutral-400 mb-6">
              If you have any questions about our Privacy Policy or wish to exercise your data rights, please contact us.
            </p>
            <a
              href="mailto:support@cyboglabs.com"
              className="inline-flex items-center px-6 py-3 bg-white text-neutral-900 font-medium rounded-full hover:bg-neutral-100 transition-colors duration-300"
            >
              Contact Privacy Team
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <CybotChatbot />
    </div>
  );
};

export default PrivacyPage;
