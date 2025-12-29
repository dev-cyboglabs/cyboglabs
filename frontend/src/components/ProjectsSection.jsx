import React, { useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { projects } from '../data/mockData';

const ProjectsSection = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const projectsPerPage = 6;
  const totalPages = Math.ceil(projects.length / projectsPerPage);

  const currentProjects = projects.slice(
    currentPage * projectsPerPage,
    (currentPage + 1) * projectsPerPage
  );

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const openProjectModal = (project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <section id="projects" className="py-24 lg:py-32 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-1 bg-gradient-to-r from-rose-400 to-amber-400 rounded-full" />
            <span className="text-neutral-500 text-sm uppercase tracking-widest font-medium">
              Our Work
            </span>
            <div className="w-8 h-1 bg-gradient-to-r from-amber-400 to-rose-400 rounded-full" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6">
            From Concept
            <span className="block text-neutral-400">to Reality</span>
          </h2>
          <p className="text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto">
            Discover our innovative projects that are shaping the future of technology.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentProjects.map((project) => (
            <div
              key={project.id}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-neutral-900/20 to-transparent" />
                
                {/* Status Badge */}
                <div className="absolute top-4 left-4">
                  <span 
                    className="px-3 py-1 text-white text-xs font-medium rounded-full"
                    style={{
                      background: 'linear-gradient(135deg, #f472b6 0%, #fbbf24 100%)',
                    }}
                  >
                    {project.status}
                  </span>
                </div>
                
                {/* Project Name Overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white/70 text-sm mb-1">{project.name}</p>
                  <h3 className="text-lg font-bold text-white">{project.tagline}</h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-neutral-600 text-sm leading-relaxed mb-4">
                  {project.description}
                </p>
                <button 
                  onClick={() => openProjectModal(project)}
                  className="inline-flex items-center text-neutral-900 font-medium text-sm group/btn hover:text-rose-500 transition-colors duration-300"
                >
                  <span>Learn More</span>
                  <ArrowRight
                    size={16}
                    className="ml-2 group-hover/btn:translate-x-1 transition-transform duration-300"
                  />
                </button>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-neutral-900/0 group-hover:bg-neutral-900/5 transition-colors duration-500 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center mt-12 space-x-4">
            <button
              onClick={prevPage}
              className="w-10 h-10 rounded-full border border-neutral-300 flex items-center justify-center hover:bg-neutral-100 transition-colors duration-300"
            >
              <ChevronLeft size={20} className="text-neutral-600" />
            </button>
            
            <div className="flex items-center space-x-2">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    currentPage === index
                      ? 'bg-neutral-900 w-8'
                      : 'bg-neutral-300 hover:bg-neutral-400'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextPage}
              className="w-10 h-10 rounded-full border border-neutral-300 flex items-center justify-center hover:bg-neutral-100 transition-colors duration-300"
            >
              <ChevronRight size={20} className="text-neutral-600" />
            </button>
          </div>
        )}

        {/* Project Count */}
        <div className="text-center mt-8">
          <p className="text-neutral-500 text-sm">
            Showing {currentPage * projectsPerPage + 1}-{Math.min((currentPage + 1) * projectsPerPage, projects.length)} of {projects.length} projects
          </p>
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={closeProjectModal}
        >
          <div 
            className="relative bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeProjectModal}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300"
            >
              <X size={20} className="text-neutral-700" />
            </button>

            {/* Modal Content */}
            <div className="overflow-y-auto max-h-[90vh]">
              {/* Project Image */}
              <div className="relative h-64 md:h-80">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                
                {/* Status Badge */}
                <div className="absolute top-4 left-4">
                  <span 
                    className="px-4 py-1.5 text-white text-sm font-medium rounded-full"
                    style={{
                      background: 'linear-gradient(135deg, #f472b6 0%, #fbbf24 100%)',
                    }}
                  >
                    {selectedProject.status}
                  </span>
                </div>

                {/* Title Overlay */}
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white/80 text-sm mb-2 uppercase tracking-wider">{selectedProject.name}</p>
                  <h2 className="text-3xl md:text-4xl font-bold text-white">{selectedProject.tagline}</h2>
                </div>
              </div>

              {/* Project Details */}
              <div className="p-6 md:p-8">
                {/* Overview */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-3">Overview</h3>
                  <p className="text-neutral-600 leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>

                {/* Extended Content */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-3">About {selectedProject.name}</h3>
                  <p className="text-neutral-600 leading-relaxed mb-4">
                    {selectedProject.name} represents CYBOGLABS' commitment to innovation and excellence. 
                    This project embodies our core philosophy of transforming complex challenges into elegant, 
                    scalable solutions that drive real-world impact.
                  </p>
                  <p className="text-neutral-600 leading-relaxed">
                    Our team of expert engineers and researchers have developed this solution using 
                    cutting-edge technologies, ensuring reliability, performance, and seamless user experience. 
                    The platform is designed to adapt and evolve with changing industry needs, making it 
                    a future-proof investment for our clients.
                  </p>
                </div>

                {/* Key Features */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-4">Key Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3 p-4 bg-neutral-50 rounded-xl">
                      <div className="w-2 h-2 mt-2 rounded-full bg-gradient-to-r from-rose-400 to-amber-400 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-neutral-900 text-sm">Advanced Technology</h4>
                        <p className="text-neutral-500 text-sm">Built with state-of-the-art frameworks and tools</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-neutral-50 rounded-xl">
                      <div className="w-2 h-2 mt-2 rounded-full bg-gradient-to-r from-rose-400 to-amber-400 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-neutral-900 text-sm">Scalable Architecture</h4>
                        <p className="text-neutral-500 text-sm">Designed to grow with your business needs</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-neutral-50 rounded-xl">
                      <div className="w-2 h-2 mt-2 rounded-full bg-gradient-to-r from-rose-400 to-amber-400 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-neutral-900 text-sm">Real-time Analytics</h4>
                        <p className="text-neutral-500 text-sm">Comprehensive insights and data visualization</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-neutral-50 rounded-xl">
                      <div className="w-2 h-2 mt-2 rounded-full bg-gradient-to-r from-rose-400 to-amber-400 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-neutral-900 text-sm">Seamless Integration</h4>
                        <p className="text-neutral-500 text-sm">Easy integration with existing systems</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="mailto:support@cyboglabs.com"
                    className="flex-1 px-6 py-3 bg-neutral-900 text-white font-medium rounded-lg text-center hover:bg-neutral-800 transition-colors duration-300"
                  >
                    Get in Touch
                  </a>
                  <button
                    onClick={closeProjectModal}
                    className="flex-1 px-6 py-3 border border-neutral-300 text-neutral-700 font-medium rounded-lg text-center hover:bg-neutral-50 transition-colors duration-300"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectsSection;
