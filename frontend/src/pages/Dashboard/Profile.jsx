import React from 'react'
import {useSelector} from "react-redux"

const Profile = () => {

  const {user} = useSelector((state)=>state.auth)

  
  return (
 <div className="px-4 py-16 font-inter bg-neutral-50 min-h-screen flex items-center justify-center">
  <div className="profileCard bg-white border border-neutral-200/80 rounded-none p-6 md:p-10 w-full max-w-md md:max-w-2xl gap-8 flex flex-col md:flex-row items-center md:items-stretch mx-auto shadow-[0_4px_30px_rgba(0,0,0,0.02)] group hover:border-neutral-400 transition-colors duration-500">
    
    {/* Left Side: Sharp, Framed Avatar */}
    <div className="w-32 h-32 md:w-40 md:h-auto md:aspect-square shrink-0 bg-neutral-100 overflow-hidden relative border border-neutral-200 p-1.5">
      <img 
        className="w-full h-full object-cover filter contrast-[1.05] group-hover:scale-105 transition-transform duration-700 ease-out" 
        src={user.avatar} 
        alt={user.name} 
      />
    </div>
    
    {/* Right Side: Clean Typography Layout */}
    <div className="flex flex-col justify-between w-full text-center md:text-left py-1">
      
      {/* Top Section: Name and Handle */}
      <div className="space-y-2">
        <div className="text-[10px] uppercase tracking-[0.2em] font-semibold text-neutral-400 block">
          Creative Member // {user.username}
        </div>
        <h2 className="text-3xl font-light text-neutral-900 tracking-tight leading-tight">
          Hello, I am <span className="font-medium underline decoration-neutral-300 decoration-1 underline-offset-4">{user.name}</span>
        </h2>
      </div>

      {/* Bottom Section: Divider line & Contact */}
      <div className="mt-6 md:mt-0 pt-4 border-t border-neutral-100 flex flex-col md:flex-row md:items-center justify-between gap-2">
        <span className="text-xs font-mono text-neutral-500 tracking-tight">
          {user.email}
        </span>
        <span className="text-xs text-neutral-400 font-light group-hover:text-neutral-900 transition-colors duration-300 cursor-pointer flex items-center justify-center md:justify-start gap-1">
          View Portfolio →
        </span>
      </div>

    </div>

  </div>
</div>

  

  )
}

export default Profile