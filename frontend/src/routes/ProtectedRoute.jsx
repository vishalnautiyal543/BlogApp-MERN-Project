import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import Loader from '../components/Loader'

const ProtectedRoute = ({children}) => {


    const {isAuthenticated,authLoading } = useSelector((state)=>state.auth)

    
    console.log(isAuthenticated);
    console.log(authLoading);
    

    if(authLoading){
        return <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50">
    <Loader />
  </div>
    }

  return   isAuthenticated?children:<Navigate to={"/"} replace />
  
}

export default ProtectedRoute