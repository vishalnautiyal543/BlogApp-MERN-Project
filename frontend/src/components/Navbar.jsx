import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setTheme } from "../features/theme/themeSlice"; 
import { Menu, X, Flame, Sparkles, Sun, Moon, Monitor } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Redux hooks
  const dispatch = useDispatch();
  const currentTheme = useSelector((state) => state.theme.mode);

  const themeOptions = [
    { id: "light", name: "Light", icon: Sun },
    { id: "dark", name: "Dark", icon: Moon },
    { id: "system", name: "System", icon: Monitor },
  ];

  // Get active icon for the trigger button
  const ActiveIcon = themeOptions.find((t) => t.id === currentTheme)?.icon || Sun;

  // Fully v4 dark-mode compliant styles
  const linkStyles = ({ isActive }) =>
    `relative text-sm font-medium font-Inter transition-colors pb-1 flex items-center gap-1.5 ${
      isActive
        ? "text-slate-900 dark:text-white after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:bg-indigo-600 after:rounded-full"
        : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
    }`;

  const mobileLinkStyles = ({ isActive }) =>
    `block px-4 py-2.5 rounded-xl text-base font-medium font-Inter transition-all ${
      isActive
        ? "bg-indigo-50 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 font-semibold"
        : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
    }`;

  return (
    <nav className="w-full bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-50 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo / Brand */}
          <div className="shrink-0 font-Inter">
            <NavLink
              to="/"
              className="text-xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2"
            >
              <span className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-black text-lg">
                T
              </span>
              Techify
            </NavLink>
          </div>

          {/* Desktop Links */}
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

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            
            {/* Theme Selector Dropdown Component */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="p-2 rounded-xl border border-slate-200/60 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none"
              >
                <ActiveIcon size={18} />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-36 rounded-xl shadow-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 py-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  {themeOptions.map((option) => {
                    const OptionIcon = option.icon;
                    return (
                      <button
                        key={option.id}
                        onClick={() => {
                          dispatch(setTheme(option.id));
                          setIsDropdownOpen(false);
                        }}
                        className={`flex w-full items-center gap-2 px-3 py-2 text-sm text-left transition-colors font-Inter
                          ${currentTheme === option.id 
                            ? "bg-indigo-50 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 font-medium" 
                            : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                          }`}
                      >
                        <OptionIcon size={15} />
                        {option.name}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <Link to="/login">
              <button className="px-5 py-2 text-sm font-Inter font-medium text-white dark:text-white bg-primary dark:bg-primary hover:bg-slate-800 dark:hover:bg-primary/90 rounded-full shadow-sm transition-all duration-200">
                Sign up/in
              </button>
            </Link>
            <Link to="/dashboard">
              <button className="px-5 py-2 text-sm font-Inter font-medium text-white dark:text-white bg-primary dark:bg-primary hover:bg-slate-800 dark:hover:bg-primary/90 rounded-full shadow-sm transition-all duration-200">
                Dashboard
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button Toggle */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white focus:outline-none transition-colors"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="px-3 pt-3 pb-6 space-y-1">
            <NavLink to="/" end onClick={() => setIsOpen(false)} className={mobileLinkStyles}>
              Home
            </NavLink>
            <NavLink to="/trending" onClick={() => setIsOpen(false)} className={mobileLinkStyles}>
              Trending
            </NavLink>
            <NavLink to="/blogs" onClick={() => setIsOpen(false)} className={mobileLinkStyles}>
              Blogs
            </NavLink>
            <NavLink to="/about" onClick={() => setIsOpen(false)} className={mobileLinkStyles}>
              About
            </NavLink>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 px-3 space-y-4">
              
              {/* Mobile Theme Selector Segment */}
              <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-900 p-1 rounded-xl border border-slate-200/60 dark:border-slate-800">
                {themeOptions.map((option) => {
                  const OptionIcon = option.icon;
                  return (
                    <button
                      key={option.id}
                      onClick={() => dispatch(setTheme(option.id))}
                      className={`flex flex-1 items-center justify-center gap-2 py-2 rounded-lg text-sm transition-all font-Inter
                        ${currentTheme === option.id 
                          ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm font-medium" 
                          : "text-slate-500 dark:text-slate-400"
                        }`}
                    >
                      <OptionIcon size={16} />
                      <span className="text-xs">{option.name}</span>
                    </button>
                  );
                })}
              </div>

              <Link to="/login" onClick={() => setIsOpen(false)}>
                <button className="w-full text-center py-2.5 text-sm font-medium text-white dark:text-white bg-slate-950 dark:bg-primary hover:bg-slate-800 dark:hover:bg-primary/90 rounded-xl transition-colors shadow-sm mb-1">
                  Login
                </button>
              </Link>
              <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                <button className="w-full text-center py-2.5 text-sm font-medium text-white dark:text-slate-950 bg-slate-950 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 rounded-xl transition-colors shadow-sm">
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