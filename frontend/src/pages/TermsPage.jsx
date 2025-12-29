import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, Shield, AlertTriangle, Scale } from 'lucide-react';
import { termsAndConditions } from '../data/mockData';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const TermsPage = () => {
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
              <FileText className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                Terms & Conditions
              </h1>
              <p className="text-neutral-400 mt-2">Last updated: {termsAndConditions.lastUpdated}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-8 bg-neutral-50 border-b border-neutral-200 sticky top-16 lg:top-20 z-40">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="flex items-center space-x-2 overflow-x-auto pb-2">
            <span className="text-neutral-500 text-sm whitespace-nowrap">Jump to:</span>
            {termsAndConditions.sections.slice(0, 5).map((section, index) => (
              <a
                key={index}
                href={`#section-${index}`}
                className="px-3 py-1.5 text-sm text-neutral-600 bg-white border border-neutral-200 rounded-full hover:bg-neutral-100 transition-colors duration-300 whitespace-nowrap"
              >
                {section.title.split('.')[0]}
              </a>
            ))}
          </div>
        </div>
      </section>

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
                <h2 className="text-lg font-semibold text-neutral-900 mb-2">Important Notice</h2>
                <p className="text-neutral-600 leading-relaxed">
                  Please read these Terms and Conditions carefully before using our services.
                  By accessing or using CYBOGLABS services, you agree to be bound by these terms.
                </p>
              </div>
            </div>
          </div>

          {/* Sections */}
          <div className="space-y-12">
            {termsAndConditions.sections.map((section, index) => (
              <div
                key={index}
                id={`section-${index}`}
                className="scroll-mt-40"
              >
                <h2 className="text-xl font-bold text-neutral-900 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-neutral-100 rounded-lg flex items-center justify-center text-sm font-medium text-neutral-600 mr-3">
                    {index + 1}
                  </span>
                  {section.title.replace(/^\d+\.\s*/, '')}
                </h2>
                <div className="pl-11">
                  <p className="text-neutral-600 leading-relaxed">
                    {section.content}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Questions */}
          <div className="mt-16 p-8 bg-neutral-950 rounded-3xl text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Have Questions?</h3>
            <p className="text-neutral-400 mb-6">
              If you have any questions about these Terms & Conditions, please contact us.
            </p>
            <a
              href="mailto:support@cyboglabs.com"
              className="inline-flex items-center px-6 py-3 bg-white text-neutral-900 font-medium rounded-full hover:bg-neutral-100 transition-colors duration-300"
            >
              Contact Support
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TermsPage;
