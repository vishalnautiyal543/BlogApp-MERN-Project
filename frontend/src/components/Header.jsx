import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Clock, Bookmark, Sparkles } from 'lucide-react';

const Header = () => {
  return (
    <header className="w-full font-Inter bg-white dark:bg-darkmode  text-slate-900 dark:text-zinc-50 border-b border-slate-100 dark:border-zinc-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Hero Text */}
          <div className="lg:col-span-7 space-y-6 md:space-y-8">
            
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-100/50 dark:border-indigo-900/30 rounded-full text-indigo-600 dark:text-indigo-400 text-xs font-semibold uppercase tracking-wider">
              <Sparkles size={12} className="animate-pulse" />
              The Editor's Choice
            </div>

            {/* Typography */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-slate-950 dark:text-zinc-50 leading-[1.15]">
              Stories that shape <br />
              <span className="underline decoration-indigo-500/40 dark:decoration-indigo-400/40 decoration-wavy underline-offset-8">the future of tech</span> and culture.
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-slate-500 dark:text-zinc-400 max-w-xl font-normal leading-relaxed">
              Join 50,000+ readers getting raw insights, curated trends, and deep dives into the digital landscape. No fluff, just pure value.
            </p>

            {/* Premium Interactive Call to Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link 
                to="/blogs" 
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-slate-950 dark:bg-zinc-50 text-white dark:text-zinc-950 hover:bg-indigo-600 dark:hover:bg-indigo-500 text-sm font-medium rounded-full transition-all duration-300 shadow-sm shadow-slate-950/10 hover:shadow-indigo-500/20"
              >
                Start Reading Premium
                <ArrowUpRight size={16} />
              </Link>
              
              <Link 
                to="/trending" 
                className="px-6 py-3.5 border border-slate-200 dark:border-zinc-800 hover:border-slate-950 dark:hover:border-zinc-300 text-slate-600 dark:text-zinc-400 hover:text-slate-950 dark:hover:text-zinc-100 text-sm font-medium rounded-full transition-all duration-300"
              >
                Explore Trending
              </Link>
            </div>

          </div>

          {/* Right Column: Hero Featured Card */}
          <div className="lg:col-span-5">
            <div className="group relative bg-slate-50/60 dark:bg-darkmode border border-slate-200/60 dark:border-zinc-800/60 rounded-3xl p-6 sm:p-8 transition-all duration-300 hover:border-indigo-500/30 dark:hover:border-indigo-400/30 hover:bg-white dark:hover:bg-darkmode/90 hover:shadow-[0_20px_50px_rgba(99,102,241,0.05)] dark:hover:shadow-[0_20px_50px_rgba(99,102,241,0.02)]">
              
              {/* Card Meta Info */}
              <div className="flex items-center justify-between text-xs font-medium text-slate-400 dark:text-zinc-500 mb-4">
                <span className="text-indigo-600 dark:text-indigo-400 uppercase font-bold tracking-wider">Artificial Intelligence</span>
                <div className="flex items-center gap-1.5">
                  <Clock size={12} />
                  <span>7 min read</span>
                </div>
              </div>

              {/* Featured Article Title */}
              <Link to="/article/future-of-generative-agents" className="block mb-3">
                <h3 className="text-2xl font-serif font-bold text-slate-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300 leading-snug">
                  The Rise of Generative Agents: How AI is Learning to Think in Loops
                </h3>
              </Link>

              {/* Excerpt */}
              <p className="text-sm text-slate-500 dark:text-zinc-400 line-clamp-3 mb-6 leading-relaxed">
                Beyond chat boxes and image generators, the next evolution of artificial intelligence lies in autonomous agents executing multi-step operations. Here is how it impacts your workflow...
              </p>

              {/* Author & Actions Footer */}
              <div className="flex items-center justify-between pt-5 border-t border-slate-100 dark:border-zinc-800/80">
                <div className="flex items-center gap-3">
                  {/* Styled Avatar */}
                  <div className="h-9 w-9 rounded-full bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-100/50 dark:border-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-semibold text-xs tracking-wider">
                    SR
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-slate-800 dark:text-zinc-200">Saurabh Rai</h4>
                    <p className="text-xs text-slate-400 dark:text-zinc-500">July 2026</p>
                  </div>
                </div>

                {/* Save Button */}
                <button 
                  className="p-2.5 text-slate-400 dark:text-zinc-500 hover:text-slate-900 dark:hover:text-zinc-200 rounded-full hover:bg-slate-100 dark:hover:bg-zinc-800/60 transition-colors duration-200"
                  aria-label="Bookmark article"
                >
                  <Bookmark size={16} />
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