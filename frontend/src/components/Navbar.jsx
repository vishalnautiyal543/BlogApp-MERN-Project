import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Search, Menu, X, Flame, Sparkles } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const linkStyles = ({ isActive }) =>
    `relative text-sm font-medium transition-colors pb-1 flex items-center gap-1.5 ${
      isActive
        ? "text-slate-900 after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:bg-indigo-600 after:rounded-full"
        : "text-slate-500 hover:text-slate-900"
    }`;

  const mobileLinkStyles = ({ isActive }) =>
    `block px-4 py-2.5 rounded-xl text-base font-medium transition-all ${
      isActive
        ? "bg-indigo-50 text-indigo-600 font-semibold"
        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
    }`;

  return (
    <nav className="w-full bg-white border-b border-slate-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="shrink-0 font-Inter">
            <NavLink
              to="/"
              className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2"
            >
              <span className="h-8 w-8  rounded-lg bg-indigo-600 flex items-center justify-center text-white font-black text-lg">
                T
              </span>
              Techify
            </NavLink>
          </div>

          <div className="hidden md:flex font-Inter items-center space-x-8">
            <NavLink to="/" end className={linkStyles}>
              Home
            </NavLink>
            <NavLink to="/trending" className={linkStyles}>
              <Flame size={15} className="text-orange-500" />
              Trending
            </NavLink>

            <NavLink to="/blogs" className={linkStyles}>
              <Sparkles size={15} className="text-amber-500" />
              Blogs
            </NavLink>
            <NavLink to="/about" className={linkStyles}>
              About
            </NavLink>
          </div>

          {/* 3. Search Bar & CTA */}
          <div className="hidden md:flex items-center space-x-5">
            {/* Minimalist Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search stories..."
                className="w-52 lg:w-60 pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200/60 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-900 transition-all placeholder:text-slate-400"
              />
              <Search
                size={16}
                className="text-slate-400 absolute left-3 top-2.5"
              />
            </div>

            {/* Premium Solid Button */}
            <Link to={"/login"}>
              <button className="px-5 py-2 text-sm font-Inter font-medium text-white bg-slate-950 hover:bg-slate-800 rounded-full shadow-sm transition-all duration-200">
                Sign up/in
              </button>
            </Link>
            <Link to={"/dashboard"}>
              <button className="px-5 py-2 text-sm font-Inter font-medium text-white bg-slate-950 hover:bg-slate-800 rounded-full shadow-sm transition-all duration-200">
                Dashboard
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-slate-500 hover:bg-slate-50 hover:text-slate-900 focus:outline-none transition-colors"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* 4. Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="px-3 pt-3 pb-6 space-y-1">
            <NavLink
              to="/"
              end
              onClick={() => setIsOpen(false)}
              className={mobileLinkStyles}
            >
              Home
            </NavLink>
            <NavLink
              to="/trending"
              onClick={() => setIsOpen(false)}
              className={mobileLinkStyles}
            >
              Trending
            </NavLink>
            <NavLink
              to="/categories"
              onClick={() => setIsOpen(false)}
              className={mobileLinkStyles}
            >
              Categories
            </NavLink>
            <NavLink
              to="/about"
              onClick={() => setIsOpen(false)}
              className={mobileLinkStyles}
            >
              About
            </NavLink>

            <div className="pt-4 border-t border-slate-100 px-3 space-y-4">
              {/* Mobile Search */}
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search stories..."
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200/60 rounded-xl text-sm focus:outline-none focus:border-indigo-500 text-slate-900"
                />
                <Search
                  size={16}
                  className="text-slate-400 absolute left-3 top-3"
                />
              </div>
              <Link to={"/login"}>
                <button className="w-full text-center py-2.5 text-sm font-medium text-white bg-slate-950 hover:bg-slate-800 rounded-xl transition-colors shadow-sm mb-1">
                  Login
                </button>
              </Link>
              <Link to={"/dashboard"}>
                <button className="w-full text-center py-2.5 text-sm font-medium text-white bg-slate-950 hover:bg-slate-800 rounded-xl transition-colors shadow-sm">
                  Dashboard
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
