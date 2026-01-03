import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft, ArrowRight, Tag, Share2, Facebook, Twitter, Linkedin, Link2, X } from 'lucide-react';
import { blogPosts } from '../data/mockData';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CybotChatbot from '../components/CybotChatbot';

const BlogPostPage = () => {
  const { id } = useParams();
  const post = blogPosts.find((p) => p.id === parseInt(id));
  const [showShareDropdown, setShowShareDropdown] = useState(false);
  const [copiedText, setCopiedText] = useState(false);
  const shareDropdownRef = useRef(null);

  // Scroll to top when component mounts or when blog post changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (shareDropdownRef.current && !shareDropdownRef.current.contains(event.target)) {
        setShowShareDropdown(false);
      }
    };

    if (showShareDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showShareDropdown]);

  // Share functionality
  const shareArticle = async (platform) => {
    const url = window.location.href;
    const title = post.title;
    
    switch(platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'copy':
        try {
          await navigator.clipboard.writeText(url);
          setCopiedText(true);
          setTimeout(() => setCopiedText(false), 2000);
        } catch (err) {
          console.error('Failed to copy text: ', err);
        }
        break;
    }
    if (platform !== 'copy') {
      setShowShareDropdown(false);
    }
  };

  // Get next and previous posts
  const currentIndex = blogPosts.findIndex((p) => p.id === parseInt(id));
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;

  // Get related posts (same category)
  const relatedPosts = blogPosts
    .filter((p) => p.category === post?.category && p.id !== post?.id)
    .slice(0, 2);

  if (!post) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-32 pb-20 text-center">
          <h1 className="text-4xl font-bold text-neutral-900 mb-4">Post Not Found</h1>
          <p className="text-neutral-600 mb-8">The article you are looking for does not exist.</p>
          <Link
            to="/blog"
            className="inline-flex items-center px-6 py-3 bg-neutral-900 text-white rounded-full hover:bg-neutral-800 transition-colors duration-300"
          >
            <ArrowLeft size={18} className="mr-2" />
            Back to Blog
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 bg-neutral-950">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <Link
            to="/blog"
            className="inline-flex items-center text-neutral-400 hover:text-white mb-8 transition-colors duration-300"
          >
            <ArrowLeft size={18} className="mr-2" />
            Back to Blog
          </Link>

          {/* Category */}
          <span className="inline-flex ml-4 items-center px-3 py-1 bg-white/10 text-white text-sm font-medium rounded-full mb-6">
            <Tag size={14} className="mr-1.5" />
            {post.category}
          </span>

          <h1 className="text-xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-6 text-neutral-400">
            <span className="flex items-center">
              <Calendar size={18} className="mr-2" />
              {post.date}
            </span>
            <span className="flex items-center">
              <User size={18} className="mr-2" />
              {post.author}
            </span>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <div className="max-w-5xl mx-auto px-6 lg:px-8 -mt-8">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-64 md:h-96 object-cover"
          />
        </div>
      </div>

      {/* Article Content */}
      <article className="py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="prose prose-lg prose-neutral max-w-none">
            {post.content.split('\n\n').map((paragraph, index) => {
              // Check if paragraph is a heading (starts and ends with ** and no other text)
              if (paragraph.startsWith('**') && paragraph.endsWith('**') && paragraph.split('**').filter(Boolean).length === 1) {
                return (
                  <h2 key={index} className="text-2xl font-bold text-neutral-900 mt-10 mb-4">
                    {paragraph.replace(/\*\*/g, '')}
                  </h2>
                );
              }
              
              // Check if paragraph contains bold text and render it properly
              if (paragraph.includes('**')) {
                const parts = paragraph.split('**');
                const elements = parts.map((part, i) => {
                  if (i % 2 === 1) {
                    // This is bold text (odd index)
                    return <strong key={i} className="font-bold text-neutral-900">{part}</strong>;
                  }
                  return <span key={i}>{part}</span>;
                });
                
                // Check if it's a bullet point list with bold text
                if (paragraph.includes('\u2022')) {
                  const items = paragraph.split('\u2022').filter(Boolean);
                  return (
                    <ul key={index} className="space-y-2 my-6">
                      {items.map((item, i) => {
                        // Process bold text within each list item
                        const itemParts = item.split('**');
                        const itemElements = itemParts.map((part, j) => {
                          if (j % 2 === 1) {
                            return <strong key={j} className="font-bold text-neutral-900">{part}</strong>;
                          }
                          return <span key={j}>{part}</span>;
                        });
                        
                        return (
                          <li key={i} className="flex items-start">
                            <span className="w-2 h-2 bg-neutral-900 rounded-full mt-2 mr-3 flex-shrink-0" />
                            <span className="text-neutral-700 leading-relaxed">{itemElements}</span>
                          </li>
                        );
                      })}
                    </ul>
                  );
                }
                
                // Regular paragraph with bold text
                return (
                  <p key={index} className="text-neutral-700 leading-relaxed mb-6">
                    {elements}
                  </p>
                );
              }
              
              // Check if paragraph contains bullet points (without bold text)
              if (paragraph.includes('\u2022')) {
                const items = paragraph.split('\u2022').filter(Boolean);
                return (
                  <ul key={index} className="space-y-2 my-6">
                    {items.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <span className="w-2 h-2 bg-neutral-900 rounded-full mt-2 mr-3 flex-shrink-0" />
                        <span className="text-neutral-700 leading-relaxed">{item.trim()}</span>
                      </li>
                    ))}
                  </ul>
                );
              }
              
              // Regular paragraph
              return (
                <p key={index} className="text-neutral-700 leading-relaxed mb-6">
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* Share */}
          <div className="mt-12 pt-8 border-t border-neutral-200">
            <div className="flex items-center justify-between">
              <span className="text-neutral-600 font-medium">Share this article</span>
              <div className="relative" ref={shareDropdownRef}>
                <button 
                  onClick={() => setShowShareDropdown(!showShareDropdown)}
                  className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center hover:bg-neutral-200 transition-colors duration-300"
                >
                  <Share2 size={18} className="text-neutral-600" />
                </button>
                
                {/* Share Dropdown */}
                {showShareDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-neutral-200 py-2 z-50">
                    <button
                      onClick={() => shareArticle('facebook')}
                      className="w-full px-4 py-2 text-left text-sm text-neutral-700 hover:bg-neutral-50 flex items-center gap-3 transition-colors duration-200"
                    >
                      <div className="w-4 h-4 bg-blue-600 rounded-sm flex items-center justify-center">
                        <span className="text-white text-xs font-bold">f</span>
                      </div>
                      Share on Facebook
                    </button>
                    <button
                      onClick={() => shareArticle('twitter')}
                      className="w-full px-4 py-2 text-left text-sm text-neutral-700 hover:bg-neutral-50 flex items-center gap-3 transition-colors duration-200"
                    >
                      <div className="w-4 h-4 bg-black rounded-sm flex items-center justify-center">
                        <span className="text-white text-xs font-bold">𝕏</span>
                      </div>
                      Share on X
                    </button>
                    <button
                      onClick={() => shareArticle('linkedin')}
                      className="w-full px-4 py-2 text-left text-sm text-neutral-700 hover:bg-neutral-50 flex items-center gap-3 transition-colors duration-200"
                    >
                      <div className="w-4 h-4 bg-blue-700 rounded-sm flex items-center justify-center">
                        <span className="text-white text-xs font-bold">in</span>
                      </div>
                      Share on LinkedIn
                    </button>
                    <button
                      onClick={() => shareArticle('copy')}
                      className="w-full px-4 py-2 text-left text-sm text-neutral-700 hover:bg-neutral-50 flex items-center gap-3 transition-colors duration-200"
                    >
                      {copiedText ? (
                        <>
                          <div className="w-4 h-4 bg-green-600 rounded-sm flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                          </div>
                          <span className="text-green-600 font-medium">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Link2 size={16} className="text-neutral-600" />
                          Copy Link
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-12 grid md:grid-cols-2 gap-6">
            {prevPost && (
              <Link
                to={`/blog/${prevPost.id}`}
                className="group p-3 md:p-6 bg-neutral-50 rounded-2xl hover:bg-neutral-100 transition-colors duration-300"
              >
                <span className="text-sm text-neutral-500 flex items-center mb-2">
                  <ArrowLeft size={14} className="mr-1" />
                  Previous
                </span>
                <h4 className="font-semibold text-neutral-900 group-hover:text-neutral-600 transition-colors duration-300 line-clamp-1">
                  {prevPost.title}
                </h4>
              </Link>
            )}
            {nextPost && (
              <Link
                to={`/blog/${nextPost.id}`}
                className="group p-3 md:p-6 bg-neutral-50 rounded-2xl hover:bg-neutral-100 transition-colors duration-300 text-right md:col-start-2"
              >
                <span className="text-sm text-neutral-500 flex items-center justify-end mb-2">
                  Next
                  <ArrowRight size={14} className="ml-1" />
                </span>
                <h4 className="font-semibold text-neutral-900 group-hover:text-neutral-600 transition-colors duration-300 line-clamp-1">
                  {nextPost.title}
                </h4>
              </Link>
            )}
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-neutral-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-8">Related Articles</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  to={`/blog/${relatedPost.id}`}
                  className="group flex bg-white rounded-2xl overflow-hidden border border-neutral-200 hover:shadow-lg transition-all duration-500"
                >
                  <div className="w-1/3 overflow-hidden">
                    <img
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="w-2/3 p-6">
                    <span className="text-xs text-neutral-500">{relatedPost.date}</span>
                    <h3 className="font-semibold text-neutral-900 mt-2 group-hover:text-neutral-600 transition-colors duration-300 line-clamp-2">
                      {relatedPost.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
      <CybotChatbot />
    </div>
  );
};

export default BlogPostPage;
