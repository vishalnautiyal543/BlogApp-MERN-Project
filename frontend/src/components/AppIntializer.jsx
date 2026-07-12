import React, { useEffect } from 'react'
import { useDispatch} from 'react-redux'
import {refreshUser} from "../features/auth/authThunk"
import { authCheckComplete } from '../features/auth/authSlice'


const AppIntializer = ({children}) => {

    const dispatch = useDispatch()

    useEffect(() => {
        const flag = localStorage.getItem("hasSession")
      if (flag) {        
        dispatch(refreshUser())
      }else{
        dispatch(authCheckComplete())
      }
    }, [])

    return children
}

export default AppIntializer