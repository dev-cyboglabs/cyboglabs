import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, MapPin, Clock, GraduationCap, CheckCircle, Send, X, Upload, Briefcase } from 'lucide-react';
import { internships } from '../data/mockData';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const InternshipsPage = () => {
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    college: '',
    degree: '',
    graduationYear: '',
    linkedin: '',
    github: '',
    coverLetter: '',
    resume: null
  });

  const handleApply = (internship) => {
    setSelectedInternship(internship);
    setShowApplicationModal(true);
  };

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
    setTimeout(() => {
      setApplicationSubmitted(true);
    }, 1000);
  };

  const closeModal = () => {
    setShowApplicationModal(false);
    setApplicationSubmitted(false);
    setSelectedInternship(null);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      college: '',
      degree: '',
      graduationYear: '',
      linkedin: '',
      github: '',
      coverLetter: '',
      resume: null
    });
  };

  const benefits = [
    "Hands-on experience with real projects",
    "Mentorship from industry experts",
    "Flexible work arrangements",
    "Certificate of completion",
    "Pre-placement opportunity",
    "Networking with professionals"
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
                Internships
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Kickstart Your
              <span className="block bg-gradient-to-r from-rose-400 to-amber-400 bg-clip-text text-transparent">
                Tech Career
              </span>
            </h1>
            <p className="text-xl text-neutral-300 leading-relaxed">
              Join CYBOGLABS as an intern and gain hands-on experience working on 
              cutting-edge R&D projects. Learn from industry experts and build your career foundation.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-4">
              Why Intern at CYBOGLABS?
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="p-4 bg-white rounded-xl border border-neutral-200 text-center hover:shadow-md transition-all duration-300"
              >
                <CheckCircle size={24} className="mx-auto mb-2 text-green-500" />
                <p className="text-sm text-neutral-700">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Internships List */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-1 bg-gradient-to-r from-rose-400 to-amber-400 rounded-full" />
              <span className="text-neutral-500 text-sm uppercase tracking-widest font-medium">
                Open Positions
              </span>
              <div className="w-8 h-1 bg-gradient-to-r from-amber-400 to-rose-400 rounded-full" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Available Internships
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {internships.map((internship) => (
              <div
                key={internship.id}
                className="group p-6 lg:p-8 bg-white border border-neutral-200 rounded-2xl hover:border-neutral-400 hover:shadow-xl transition-all duration-500"
              >
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span 
                    className="px-3 py-1 text-xs font-medium text-white rounded-full"
                    style={{
                      background: 'linear-gradient(135deg, #f472b6 0%, #fbbf24 100%)',
                    }}
                  >
                    {internship.department}
                  </span>
                  <span className="px-3 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                    {internship.stipend}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-neutral-900 mb-3 group-hover:text-neutral-700 transition-colors duration-300">
                  {internship.title}
                </h3>

                <p className="text-neutral-600 mb-4 line-clamp-2">
                  {internship.description}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-500 mb-6">
                  <span className="flex items-center gap-1.5">
                    <MapPin size={16} />
                    {internship.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={16} />
                    {internship.duration}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <GraduationCap size={16} />
                    Students
                  </span>
                </div>

                {/* Requirements Preview */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-neutral-700 mb-2">Requirements:</h4>
                  <ul className="space-y-1">
                    {internship.requirements.slice(0, 3).map((req, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-neutral-600">
                        <span className="w-1 h-1 bg-neutral-400 rounded-full mt-2 flex-shrink-0" />
                        <span className="line-clamp-1">{req}</span>
                      </li>
                    ))}
                    {internship.requirements.length > 3 && (
                      <li className="text-sm text-neutral-400">
                        +{internship.requirements.length - 3} more requirements
                      </li>
                    )}
                  </ul>
                </div>

                {/* What You Will Learn */}
                <div className="mb-6 p-4 bg-neutral-50 rounded-xl">
                  <h4 className="text-sm font-semibold text-neutral-700 mb-2">What You Will Learn:</h4>
                  <div className="flex flex-wrap gap-2">
                    {internship.learnings.map((learning, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs text-neutral-600 bg-white rounded border border-neutral-200"
                      >
                        {learning}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => handleApply(internship)}
                  className="w-full inline-flex items-center justify-center px-6 py-3 text-white font-medium rounded-lg transition-all duration-300 hover:shadow-lg"
                  style={{
                    background: 'linear-gradient(135deg, #f472b6 0%, #fbbf24 100%)',
                  }}
                >
                  <Send size={18} className="mr-2" />
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full-time CTA */}
      <section className="py-16 bg-neutral-900">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <Briefcase className="w-12 h-12 text-amber-400 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Looking for Full-Time Positions?
          </h2>
          <p className="text-lg text-neutral-400 mb-8 max-w-2xl mx-auto">
            Explore our full-time career opportunities and join our team of innovators.
          </p>
          <Link
            to="/careers"
            className="inline-flex items-center px-8 py-4 bg-white text-neutral-900 font-medium rounded-lg hover:bg-neutral-100 transition-all duration-300"
          >
            View Full-Time Careers
            <ArrowRight size={18} className="ml-2" />
          </Link>
        </div>
      </section>

      {/* Application Modal */}
      {showApplicationModal && selectedInternship && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl my-8">
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
                  Thank you for applying for the {selectedInternship.title} internship. 
                  Our team will review your application and get back to you within 7-10 business days.
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
                <h3 className="text-2xl font-bold text-neutral-900 mb-2">
                  Apply for {selectedInternship.title}
                </h3>
                <p className="text-neutral-600 mb-6">
                  Fill out the form below to submit your internship application.
                </p>

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
                        College/University <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="college"
                        value={formData.college}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all duration-300"
                        placeholder="IIT Madras"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                        Degree & Branch <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="degree"
                        value={formData.degree}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all duration-300"
                        placeholder="B.Tech Computer Science"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                        Expected Graduation Year <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="graduationYear"
                        value={formData.graduationYear}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all duration-300"
                        placeholder="2026"
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
                        GitHub Profile
                      </label>
                      <input
                        type="url"
                        name="github"
                        value={formData.github}
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
                      Why do you want to intern at CYBOGLABS?
                    </label>
                    <textarea
                      name="coverLetter"
                      value={formData.coverLetter}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all duration-300 resize-none"
                      placeholder="Share your motivation, relevant projects, and what you hope to learn..."
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

export default InternshipsPage;
