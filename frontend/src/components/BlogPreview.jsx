import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, User } from 'lucide-react';
import { blogPosts } from '../data/mockData';

const BlogPreview = () => {
  // Show only first 3 posts
  const previewPosts = blogPosts.slice(0, 3);

  const handleViewAllPosts = () => {
    // Scroll to top immediately after a short delay to ensure navigation completes
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 50);
  };

  return (
    <section className="py-12 md:py-24 lg:py-32 bg-neutral-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
          <div>
            <span className="inline-block px-4 py-2 bg-white/10 text-white/70 text-sm font-medium rounded-full mb-6">
              Recent Blog
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Insights &
              <span className="block text-neutral-500">Innovation</span>
            </h2>
          </div>
          <Link
            to="/blog"
            onClick={handleViewAllPosts}
            className="inline-flex items-center mt-6 md:mt-0 text-white font-medium group"
          >
            <span>View All Posts</span>
            <ArrowRight
              size={18}
              className="ml-2 group-hover:translate-x-1 transition-transform duration-300"
            />
          </Link>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {previewPosts.map((post, index) => (
            <Link
              key={post.id}
              to={`/blog/${post.id}`}
              className="group block"
            >
              <article className="h-full bg-neutral-900/50 rounded-2xl overflow-hidden border border-neutral-800 hover:border-neutral-700 transition-all duration-500">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent" />
                  
                  {/* Category */}
                  <span className="absolute top-4 left-4 px-3 py-1 bg-white/10 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                    {post.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Meta */}
                  <div className="flex items-center space-x-4 text-neutral-500 text-sm mb-4">
                    <span className="flex items-center">
                      <Calendar size={14} className="mr-1.5" />
                      {post.date}
                    </span>
                    <span className="flex items-center">
                      <User size={14} className="mr-1.5" />
                      {post.author}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-neutral-300 transition-colors duration-300 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-neutral-400 text-sm leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>

                  {/* Read More */}
                  <div className="mt-4 flex items-center text-white text-sm font-medium">
                    <span>Read More</span>
                    <ArrowRight
                      size={14}
                      className="ml-2 group-hover:translate-x-1 transition-transform duration-300"
                    />
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
