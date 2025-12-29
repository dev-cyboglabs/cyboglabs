import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, Briefcase, CheckCircle, Send, X, Upload } from 'lucide-react';
import { careers } from '../data/mockData';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CybotChatbot from '../components/CybotChatbot';

const JobDetailPage = () => {
  const { id } = useParams();
  const job = careers.find((j) => j.id === parseInt(id));
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    linkedin: '',
    portfolio: '',
    experience: '',
    coverLetter: '',
    resume: null
  });

  if (!job) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-32 pb-20 text-center">
          <h1 className="text-4xl font-bold text-neutral-900 mb-4">Position Not Found</h1>
          <p className="text-neutral-600 mb-8">The job posting you are looking for does not exist.</p>
          <Link
            to="/careers"
            className="inline-flex items-center px-6 py-3 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors duration-300"
          >
            <ArrowLeft size={18} className="mr-2" />
            Back to Careers
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({ ...prev, resume: file }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate submission
    setTimeout(() => {
      setApplicationSubmitted(true);
    }, 1000);
  };

  const closeModal = () => {
    setShowApplicationModal(false);
    setApplicationSubmitted(false);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      linkedin: '',
      portfolio: '',
      experience: '',
      coverLetter: '',
      resume: null
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section 
        className="pt-32 pb-16 relative overflow-hidden"
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
        
        <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10">
          <Link
            to="/careers"
            className="inline-flex items-center text-neutral-400 hover:text-white mb-8 transition-colors duration-300"
          >
            <ArrowLeft size={18} className="mr-2" />
            Back to All Positions
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span 
              className="px-4 py-1.5 text-sm font-medium text-white rounded-full"
              style={{
                background: 'linear-gradient(135deg, #f472b6 0%, #fbbf24 100%)',
              }}
            >
              {job.department}
            </span>
            <span className="px-4 py-1.5 text-sm font-medium text-neutral-300 bg-white/10 rounded-full">
              {job.type}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            {job.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-neutral-300">
            <span className="flex items-center gap-2">
              <MapPin size={18} />
              {job.location}
            </span>
            <span className="flex items-center gap-2">
              <Briefcase size={18} />
              {job.experience}
            </span>
            <span className="flex items-center gap-2">
              <Clock size={18} />
              Posted {job.posted}
            </span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* About the Role */}
              <div>
                <h2 className="text-2xl font-bold text-neutral-900 mb-4">About the Role</h2>
                <div className="prose prose-neutral max-w-none">
                  {job.description.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-neutral-600 leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Responsibilities */}
              <div>
                <h2 className="text-2xl font-bold text-neutral-900 mb-4">Key Responsibilities</h2>
                <ul className="space-y-3">
                  {job.responsibilities.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle size={20} className="text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-neutral-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Requirements */}
              <div>
                <h2 className="text-2xl font-bold text-neutral-900 mb-4">Requirements</h2>
                <ul className="space-y-3">
                  {job.requirements.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-neutral-400 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-neutral-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Nice to Have */}
              <div>
                <h2 className="text-2xl font-bold text-neutral-900 mb-4">Nice to Have</h2>
                <ul className="space-y-3">
                  {job.niceToHave.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-neutral-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Apply Card */}
                <div className="p-6 bg-neutral-50 rounded-2xl border border-neutral-200">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-4">Interested in this role?</h3>
                  <p className="text-neutral-600 text-sm mb-6">
                    Join our team and help us build innovative solutions that shape the future.
                  </p>
                  <button
                    onClick={() => setShowApplicationModal(true)}
                    className="w-full inline-flex items-center justify-center px-6 py-3 text-white font-medium rounded-lg transition-all duration-300 hover:shadow-lg"
                    style={{
                      background: 'linear-gradient(135deg, #f472b6 0%, #fbbf24 100%)',
                    }}
                  >
                    <Send size={18} className="mr-2" />
                    Apply Now
                  </button>
                </div>

                {/* Tech Stack */}
                <div className="p-6 bg-white rounded-2xl border border-neutral-200">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-4">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {job.techStack.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 text-sm font-medium text-neutral-700 bg-neutral-100 rounded-lg"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Share */}
                <div className="p-6 bg-white rounded-2xl border border-neutral-200">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-4">Share this Position</h3>
                  <p className="text-neutral-600 text-sm mb-4">
                    Know someone perfect for this role? Share this opportunity!
                  </p>
                  <button 
                    onClick={() => navigator.clipboard.writeText(window.location.href)}
                    className="w-full px-4 py-2.5 border border-neutral-300 text-neutral-700 font-medium rounded-lg hover:bg-neutral-50 transition-colors duration-300"
                  >
                    Copy Link
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Modal */}
      {showApplicationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-neutral-600 transition-colors duration-300"
            >
              <X size={24} />
            </button>

            {applicationSubmitted ? (
              <div className="p-8 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={40} className="text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-4">Application Submitted!</h3>
                <p className="text-neutral-600 mb-6">
                  Thank you for your interest in the {job.title} position. Our team will review your application and get back to you within 5-7 business days.
                </p>
                <button
                  onClick={closeModal}
                  className="px-6 py-3 bg-neutral-900 text-white font-medium rounded-lg hover:bg-neutral-800 transition-colors duration-300"
                >
                  Close
                </button>
              </div>
            ) : (
              <div className="p-8">
                <h3 className="text-2xl font-bold text-neutral-900 mb-2">Apply for {job.title}</h3>
                <p className="text-neutral-600 mb-6">Fill out the form below to submit your application.</p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all duration-300"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all duration-300"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all duration-300"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                        Years of Experience <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all duration-300"
                        placeholder="5 years"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                        LinkedIn Profile
                      </label>
                      <input
                        type="url"
                        name="linkedin"
                        value={formData.linkedin}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all duration-300"
                        placeholder="https://linkedin.com/in/username"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                        Portfolio / GitHub
                      </label>
                      <input
                        type="url"
                        name="portfolio"
                        value={formData.portfolio}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all duration-300"
                        placeholder="https://github.com/username"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                      Resume / CV <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        name="resume"
                        onChange={handleFileChange}
                        required
                        accept=".pdf,.doc,.docx"
                        className="hidden"
                        id="resume-upload"
                      />
                      <label
                        htmlFor="resume-upload"
                        className="flex items-center justify-center w-full px-4 py-4 border-2 border-dashed border-neutral-300 rounded-lg cursor-pointer hover:border-rose-400 transition-colors duration-300"
                      >
                        <Upload size={20} className="mr-2 text-neutral-400" />
                        <span className="text-neutral-600">
                          {formData.resume ? formData.resume.name : 'Upload PDF, DOC, or DOCX (Max 5MB)'}
                        </span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                      Cover Letter
                    </label>
                    <textarea
                      name="coverLetter"
                      value={formData.coverLetter}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all duration-300 resize-none"
                      placeholder="Tell us why you're interested in this role and what makes you a great fit..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center px-6 py-3.5 text-white font-medium rounded-lg transition-all duration-300 hover:shadow-lg"
                    style={{
                      background: 'linear-gradient(135deg, #f472b6 0%, #fbbf24 100%)',
                    }}
                  >
                    <Send size={18} className="mr-2" />
                    Submit Application
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default JobDetailPage;
