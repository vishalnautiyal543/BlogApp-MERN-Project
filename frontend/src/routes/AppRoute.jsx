import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from '../pages/Home'
import MainLayout from "../layouts/MainLayout"
import Blogs from "../pages/Blogs"
import About from "../pages/About"
import Trending from "../pages/Trending"
import Login from "../pages/Login"
import Register from "../pages/Register"
import ProtectedRoute from "./ProtectedRoute"
import DashboardLayout from "../layouts/DashboardLayout"
import DashboardHome from "../pages/Dashboard/DashboardHome"
import Profile from "../pages/Dashboard/Profile"
import CreateBlog from "../pages/Dashboard/CreateBlog"
import Settings from "../pages/Dashboard/Settings"
import MyBlogs from "../pages/Dashboard/MyBlogs"
import BlogContent from "../pages/BlogContent"

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
            <Route  path="/blog/:slug" element={<BlogContent/> } />
          </Route>
          <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardLayout/>
              </ProtectedRoute>
            } 
          >
            <Route index element={<DashboardHome/>} />
            <Route path="profile" element={<Profile/>} />
            <Route path="create-blog" element={<CreateBlog/>} />
            <Route path="myblogs" element={<MyBlogs/>} />
            <Route path="settings" element={<Settings/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default AppRoute