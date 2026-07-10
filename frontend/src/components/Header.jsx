import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Clock, Bookmark, Sparkles } from 'lucide-react';

const Header = () => {
  return (
    <header className="w-full font-Inter bg-white text-slate-900 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 rounded-full text-indigo-600 text-xs font-semibold uppercase tracking-wider">
              <Sparkles size={12} />
              The Editor's Choice
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-slate-900 leading-[1.1]">
              Stories that shape <br />
              <span className="underline decoration-indigo-500/30 decoration-wavy underline-offset-8">the future of tech</span> and culture.
            </h1>

            
            <p className="text-lg font-Inter text-slate-500 max-w-xl font-normal leading-relaxed">
              Join 50,000+ readers getting raw insights, curated trends, and deep dives into the digital landscape. No fluff, just pure value.
            </p>

           
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link 
                to="/blogs" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-slate-950 text-white hover:bg-slate-800 text-sm font-medium rounded-full transition-all duration-200 shadow-sm"
              >
                Start Reading Premium
                <ArrowUpRight size={16} />
              </Link>
              
              <Link 
                to="/trending" 
                className="px-6 py-3 border border-slate-200 hover:border-slate-900 text-slate-600 hover:text-slate-900 text-sm font-medium rounded-full transition-all duration-200"
              >
                Explore Trending
              </Link>
            </div>

          </div>

          {/* Right Column: Hero Featured Card (Takes 5 cols on large screens) */}
          <div className="lg:col-span-5">
            <div className="group relative bg-slate-50 border border-slate-200/60 rounded-3xl p-6 sm:p-8 transition-all duration-300 hover:border-slate-300 hover:shadow-md">
              
              {/* Card Meta Info */}
              <div className="flex items-center justify-between text-xs font-medium text-slate-400 mb-4">
                <span className="text-indigo-600 uppercase font-bold tracking-wider">Artificial Intelligence</span>
                <div className="flex items-center gap-1">
                  <Clock size={12} />
                  <span>7 min read</span>
                </div>
              </div>

              {/* Featured Article Title */}
              <Link to="/article/future-of-generative-agents" className="block group-hover:text-indigo-600 transition-colors">
                <h3 className="text-2xl font-serif font-bold text-slate-900 leading-snug mb-3">
                  The Rise of Generative Agents: How AI is Learning to Think in Loops
                </h3>
              </Link>

              {/* Excerpt */}
              <p className="text-sm text-slate-500 line-clamp-3 mb-6 leading-relaxed">
                Beyond chat boxes and image generators, the next evolution of artificial intelligence lies in autonomous agents executing multi-step operations. Here is how it impacts your workflow...
              </p>

              {/* Author & Actions Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-200/60">
                <div className="flex items-center gap-3">
                  {/* Dummy Initial Avatar */}
                  <div className="h-9 w-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm">
                    SR
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-slate-800">Saurabh Rai</h4>
                    <p className="text-xs text-slate-400">July 2026</p>
                  </div>
                </div>

                {/* Save Button */}
                <button 
                  className="p-2 text-slate-400 hover:text-slate-900 rounded-full hover:bg-slate-100 transition-colors"
                  aria-label="Bookmark article"
                >
                  <Bookmark size={18} />
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </header>
  );
};

export default Header;