import React from 'react';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const DashboardHome = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="w-full block md:pl-4  ">
     
      
      {/* Welcome Card */}
      <div className='w-full  md:max-w-2xl flex flex-col md:flex-row items-center gap-6 text-center md:text-left font-Inter shadow-sm bg-amber-50/60 border border-gray-200 rounded-2xl p-6'>
          
          {/* Avatar Container */}
          <div className="shrink-0">
            <img 
              src={user?.avatar || 'https://via.placeholder.com/150'} 
              alt="user_avatar" 
              className='w-24 h-24 md:w-26 md:h-26 rounded-full object-cover border-2 border-primary/20 shadow-sm' 
            />
          </div>
          
          {/* User Details */}
          <div className="space-y-1">
            <h2 className='text-2xl md:text-3xl font-semibold text-gray-800'>
              Welcome, <span className='text-primary'>{user?.name || 'User'}</span>
            </h2>
            <p className='text-sm md:text-base text-gray-500 italic font-medium'>
              {user?.email}
            </p>
          </div>

      </div>

    </div>
  );
};

export default DashboardHome;