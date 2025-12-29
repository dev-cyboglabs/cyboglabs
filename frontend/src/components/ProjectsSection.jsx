import React, { useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { projects } from '../data/mockData';

const ProjectsSection = () => {
  const [currentPage, setCurrentPage] = useState(0);
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
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
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
                <button className="inline-flex items-center text-neutral-900 font-medium text-sm group/btn">
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
    </section>
  );
};

export default ProjectsSection;
