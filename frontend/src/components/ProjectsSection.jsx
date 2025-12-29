import React from 'react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { projects } from '../data/mockData';

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24 lg:py-32 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-neutral-200 text-neutral-600 text-sm font-medium rounded-full mb-6">
            Our Work
          </span>
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
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-neutral-900/20 to-transparent" />
                
                {/* Status Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-neutral-900 text-xs font-medium rounded-full">
                    {project.status}
                  </span>
                </div>
                
                {/* Project Name Overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white/70 text-sm mb-1">{project.name}</p>
                  <h3 className="text-xl font-bold text-white">{project.tagline}</h3>
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

        {/* CTA */}
        <div className="text-center mt-16">
          <button className="inline-flex items-center px-8 py-4 bg-neutral-900 text-white font-medium rounded-full hover:bg-neutral-800 transition-all duration-300 hover:shadow-xl hover:shadow-neutral-900/25 group">
            <span>View All Projects</span>
            <ExternalLink size={18} className="ml-2 group-hover:rotate-12 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
