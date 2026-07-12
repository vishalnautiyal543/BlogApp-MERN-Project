import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = ({children}) => {


    const {isAuthenticated,authLoading } = useSelector((state)=>state.auth)

    console.log(isAuthenticated);
    console.log(authLoading);
    

    if(authLoading){
        return <h2>Loading...</h2>
    }

  return   isAuthenticated?children:<Navigate to={"/"} replace />
  
}

export default ProtectedRoute