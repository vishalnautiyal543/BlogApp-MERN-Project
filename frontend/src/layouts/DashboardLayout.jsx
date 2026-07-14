import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Menu, LayoutDashboard } from 'lucide-react';
import Sidebar from '../components/Dashboard/Sidebar'; 
import {useDispatch} from "react-redux"
import { logoutUser } from '../features/auth/authThunk';
import {toast} from "react-toastify"

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const dispatch  = useDispatch()
  

  const handleLogout = async() => {
    try {
      const res = await dispatch(logoutUser()).unwrap();
     toast.success(res?.message || "Logout Successful!", { position: "top-right" });
      navigate('/login');
    } catch (error) {
          const errorMessage = err?.message || err || "Login failed!";
          toast.error(errorMessage, { position: "top-right" });
    }
  };

  const toggleSidebar = (status) => {
    if (typeof status === 'boolean') {
      setIsSidebarOpen(status);
    } else {
      setIsSidebarOpen(!isSidebarOpen);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col w-full text-gray-900 overflow-y-auto">
      
      {/* --- MOBILE TOP BAR --- */}
      <header className="flex items-center justify-between bg-white px-4 py-3 border-b border-gray-200 md:hidden sticky top-0 z-30 w-full shrink-0">
        <div className="flex items-center gap-2">
          <LayoutDashboard className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg text-gray-900">Dashboard</span>
        </div>
        <button 
          onClick={() => toggleSidebar()} 
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-md focus:outline-none"
        >
          <Menu className="h-6 w-6" />
        </button>
      </header>

      {/* --- SIDEBAR BACKDROP (MOBILE ONLY) --- */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => toggleSidebar(false)}
        />
      )}

      {/* --- LAYOUT WRAPPER --- */}
      <div className="flex flex-1 w-full relative items-start justify-start">
        
        {/* --- CALLING SIDEBAR COMPONENT --- */}
        <Sidebar 
          isSidebarOpen={isSidebarOpen} 
          toggleSidebar={toggleSidebar} 
          handleLogout={handleLogout} 
        />

        {/* --- MAIN CONTENT AREA --- */}
        <main className="flex-1 w-full min-h-0 md:pl-64 block pt-4 px-4 md:pt-8 md:px-8">
          <div className="w-full max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>

      </div>
    </div>
  );
};

export default DashboardLayout;