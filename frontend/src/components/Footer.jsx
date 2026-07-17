import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full dark:bg-darkmode font-Inter bg-white border-t border-slate-200 text-slate-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-8 border-b border-slate-100">
          
          <div>
            <Link to="/" className="text-lg font-bold tracking-tight dark:text-white text-slate-900">
              Techify<span className="text-indigo-600">.</span>
            </Link>
            <p className="text-xs text-slate-400 mt-1">Stories that shape tech and culture.</p>
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm font-medium">
            <Link to="/about" className="hover:text-slate-900 transition-colors dark:text-slate-300 dark:hover:text-white">About</Link>
            <Link to="/trending" className="hover:text-slate-900 transition-colors dark:text-slate-300 dark:hover:text-white">Trending</Link>
            <Link to="/categories" className="hover:text-slate-900 transition-colors dark:text-slate-300 dark:hover:text-white">Categories</Link>
            <Link to="/privacy" className="hover:text-slate-900 transition-colors dark:text-slate-300 dark:hover:text-white">Privacy</Link>
            <Link to="/terms" className="hover:text-slate-900 transition-colors dark:text-slate-300 dark:hover:text-white">Terms</Link>
          </div>

        </div>

        <div className="pt-8 flex flex-col dark:text-gray-100 sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div>
            &copy; 2026 pulse. All rights reserved.
          </div>
          <div className="tracking-wide">
            ISSN 2026-4739
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;