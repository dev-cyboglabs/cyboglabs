import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, ArrowUpRight } from 'lucide-react';
import { companyInfo } from '../data/mockData';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: 'About Us', path: '/#about' },
      { name: 'Our Projects', path: '/#projects' },
      { name: 'Blog', path: '/blog' },
      { name: 'Contact', path: '/#contact' },
    ],
    legal: [
      { name: 'Terms & Conditions', path: '/terms' },
      { name: 'Privacy Policy', path: '/privacy' },
    ],
    services: [
      { name: 'Applied Research', path: '/#about' },
      { name: 'Experimental Development', path: '/#about' },
      { name: 'Reverse Engineering', path: '/#about' },
      { name: 'Tech Challenge Solving', path: '/#about' },
    ],
  };

  return (
    <footer className="bg-neutral-950 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-flex items-center space-x-2 group mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-white to-neutral-300 rounded-xl flex items-center justify-center">
                <span className="text-neutral-900 font-bold text-lg">C</span>
              </div>
              <span className="font-semibold text-lg tracking-tight text-white">
                CYBOGLABS
              </span>
            </Link>
            <p className="text-neutral-400 text-sm leading-relaxed mb-6">
              {companyInfo.about.slice(0, 150)}...
            </p>
            <div className="space-y-3">
              <a
                href={`mailto:${companyInfo.email}`}
                className="flex items-center space-x-3 text-neutral-400 hover:text-white transition-colors duration-300"
              >
                <Mail size={18} />
                <span className="text-sm">{companyInfo.email}</span>
              </a>
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
            <p className="text-neutral-500 text-sm">
              The FUTURE is calling! CYBOGLABS is answering!
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
