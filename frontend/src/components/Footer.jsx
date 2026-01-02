import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Mail, MapPin, Phone, ArrowUpRight } from 'lucide-react';
import { companyInfo } from '../data/mockData';
import logoLight from '../assets/logo-light.svg';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();

  const handleLinkClick = (path) => {
    if (path.includes('#')) {
      // Handle hash links
      if (location.pathname === '/') {
        // Already on home page - scroll to section
        const element = document.querySelector(path.replace('/', ''));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        // Navigate to home page first, then scroll
        window.location.href = path;
      }
    } else {
      // Handle regular navigation - scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const footerLinks = {
    company: [
      { name: 'About Us', path: '/#about' },
      { name: 'Our Projects', path: '/#projects' },
      { name: 'Blog', path: '/blog' },
      { name: 'Contact', path: '/#contact' },
    ],
    careers: [
      { name: 'Full-time Careers', path: '/careers' },
      { name: 'Internships', path: '/internships' },
      { name: 'Events & News', path: '/events-news' },
    ],
    services: [
      { name: 'Product-Driven R&D', path: '/#about' },
      { name: 'AI & ML Systems', path: '/#about' },
      { name: 'Hardware-Software Co-Dev', path: '/#about' },
      { name: 'Technology Problem Solving', path: '/#about' },
    ],
    legal: [
      { name: 'Terms & Conditions', path: '/terms' },
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'FAQ', path: '/faq' },
    ],
  };

  return (
    <footer className="bg-neutral-950 text-white">
      {/* Gradient Accent Line */}
      <div 
        className="h-1"
        style={{
          background: 'linear-gradient(90deg, #ec4899 0%, #f97316 50%, #fb923c 100%)',
        }}
      />
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-flex items-center space-x-2 group mb-6">
              <img src={logoLight} alt="CYBOGLABS" className="h-10" />
            </Link>
            <p className="text-neutral-400 text-sm leading-relaxed mb-6">
              {companyInfo.about.slice(0, 120)}...
            </p>
            <div className="space-y-3">
              <button
                onClick={() => {
                  const email = companyInfo.email;
                  // Try to open email client
                  window.location.href = `mailto:${email}`;
                  // Fallback: copy to clipboard (silent)
                  setTimeout(() => {
                    navigator.clipboard.writeText(email).catch(() => {
                      // Silent fallback
                    });
                  }, 100);
                }}
                className="flex items-center space-x-3 text-neutral-400 hover:text-white transition-colors duration-300 cursor-pointer"
              >
                <Mail size={18} />
                <span className="text-sm">{companyInfo.email}</span>
              </button>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-neutral-300 mb-6">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    onClick={() => handleLinkClick(link.path)}
                    className="text-neutral-400 hover:text-white transition-colors duration-300 text-sm inline-flex items-center group"
                  >
                    {link.name}
                    <ArrowUpRight
                      size={14}
                      className="ml-1 opacity-0 group-hover:opacity-100 transform -translate-x-1 group-hover:translate-x-0 transition-all duration-300"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-neutral-300 mb-6">
              Services
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    onClick={() => handleLinkClick(link.path)}
                    className="text-neutral-400 hover:text-white transition-colors duration-300 text-sm inline-flex items-center group"
                  >
                    {link.name}
                    <ArrowUpRight
                      size={14}
                      className="ml-1 opacity-0 group-hover:opacity-100 transform -translate-x-1 group-hover:translate-x-0 transition-all duration-300"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Careers & Events Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-neutral-300 mb-6">
              Careers & Events
            </h4>
            <ul className="space-y-3">
              {footerLinks.careers.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    onClick={() => handleLinkClick(link.path)}
                    className="text-neutral-400 hover:text-white transition-colors duration-300 text-sm inline-flex items-center group"
                  >
                    {link.name}
                    <ArrowUpRight
                      size={14}
                      className="ml-1 opacity-0 group-hover:opacity-100 transform -translate-x-1 group-hover:translate-x-0 transition-all duration-300"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-neutral-300 mb-6">
              Legal
            </h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    onClick={() => handleLinkClick(link.path)}
                    className="text-neutral-400 hover:text-white transition-colors duration-300 text-sm inline-flex items-center group"
                  >
                    {link.name}
                    <ArrowUpRight
                      size={14}
                      className="ml-1 opacity-0 group-hover:opacity-100 transform -translate-x-1 group-hover:translate-x-0 transition-all duration-300"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-neutral-500 text-sm">
              © {currentYear} CYBOGLABS. All rights reserved.
            </p>
            <p className="text-neutral-500 text-sm uppercase tracking-wider">
              Technology & Life
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
