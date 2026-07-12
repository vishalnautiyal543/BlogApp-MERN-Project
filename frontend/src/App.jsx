import React from 'react'
import AppRoute from './routes/AppRoute'
import {ToastContainer} from "react-toastify"
import  AppIntializer from "./components/AppIntializer"

const App = () => {
  return (
    <>
      <AppIntializer>
        <AppRoute/>
      </AppIntializer>
      <ToastContainer />
    </>
  )
}

export default App