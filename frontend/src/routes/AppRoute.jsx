import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from '../pages/Home'
import MainLayout from "../layouts/MainLayout"
import Blogs from "../pages/Blogs"
import About from "../pages/About"
import Trending from "../pages/Trending"
import Login from "../pages/Login"
import Register from "../pages/Register"

const AppRoute = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout/>} >
            <Route path="/" element={<Home/>} />
            <Route  path="/blogs" element={<Blogs/> } />
            <Route  path="/about" element={<About/> } />
            <Route  path="/trending" element={<Trending/> } />
            <Route  path="/login" element={<Login/> } />
            <Route  path="/register" element={<Register/> } />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default AppRoute