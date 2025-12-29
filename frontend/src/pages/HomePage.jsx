import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ProjectsSection from '../components/ProjectsSection';
import BlogPreview from '../components/BlogPreview';
import ContactSection from '../components/ContactSection';
import CybotChatbot from '../components/CybotChatbot';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <BlogPreview />
        <ContactSection />
      </main>
      <Footer />
      <CybotChatbot />
    </div>
  );
};

export default HomePage;
