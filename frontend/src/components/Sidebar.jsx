import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  User, 
  SquarePlus, 
  BarChart3, 
  BookOpen, 
  LogOut, 
  X, 
  LayoutDashboard 
} from 'lucide-react';

const Sidebar = ({ isSidebarOpen, toggleSidebar, handleLogout }) => {
  // Sidebar ki default width 256px (w-64) set ki hai
  const [sidebarWidth, setSidebarWidth] = useState(256);
  const isResizing = useRef(false);

  const menuItems = [
    { name: 'Profile', path: '/dashboard/profile', icon: User },
    { name: 'Create Blog', path: '/dashboard/createblog', icon: SquarePlus },
    { name: 'Analytics', path: '/dashboard/analytics', icon: BarChart3 },
    { name: 'My Blogs', path: '/dashboard/myblogs', icon: BookOpen },
  ];

  // Dragging start karne ke liye handler
  const startResizing = (e) => {
    e.preventDefault();
    isResizing.current = true;
    document.body.style.cursor = 'ew-resize'; // Cursor ko change karein
    document.body.style.userSelect = 'none'; // Text selection block karein
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizing.current) return;
      
      // Mouse ki current X position hi new width hogi
      let newWidth = e.clientX; 

      // Boundary check: sidebar ko bohot chota ya bohot bada hone se rokein
      if (newWidth < 200) newWidth = 200;
      if (newWidth > 450) newWidth = 450;

      setSidebarWidth(newWidth);
      
      // Global CSS variable update karein taaki Main Content area ko pata chal sake
      document.documentElement.style.setProperty('--sidebar-width', `${newWidth}px`);
    };

    const handleMouseUp = () => {
      isResizing.current = false;
      document.body.style.cursor = 'default';
      document.body.style.userSelect = 'auto';
    };

    // Events ko listen karein
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const navLinkClass = ({ isActive }) => 
    `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
      isActive 
        ? 'bg-[#2563EB] text-white' 
        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
    }`;

  return (
    <aside 
      style={{ width: `${sidebarWidth}px` }} // Inline style se dynamic width apply hogi
      className={`
        fixed inset-y-0 left-0 z-50 bg-white border-r border-gray-200 flex flex-col justify-between transform transition-transform duration-300 ease-in-out h-full
        md:fixed md:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
    >
      <div>
        {/* Sidebar Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <LayoutDashboard className="h-6 w-6 text-[#2563EB]" />
            <span className="font-bold text-xl text-gray-900 truncate">Dashboard</span>
          </div>
          <button onClick={toggleSidebar} className="p-1 text-gray-500 hover:bg-gray-100 rounded md:hidden">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink 
                key={item.path} 
                to={item.path} 
                className={navLinkClass}
                onClick={() => toggleSidebar(false)}
              >
                <Icon className="h-5 w-5 shrink-0" />
                <span className="truncate">{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-100">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut className="h-5 w-5 shrink-0" />
          <span className="truncate">Logout</span>
        </button>
      </div>

      {/* --- DRAG/RESIZE HANDLE (Desktop Only) --- */}
      <div 
        onMouseDown={startResizing}
        className="hidden md:block absolute top-0 right-0 w-1.5 h-full cursor-ew-resize hover:bg-[#2563EB]/40 active:bg-[#2563EB] transition-colors z-50"
      />
    </aside>
  );
};

export default Sidebar;