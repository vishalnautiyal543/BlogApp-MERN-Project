import React, { useEffect } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { getAllBlogs } from '../../features/blog/blogThunk'
import BlogCard from '../BlogCard'

const Blogs = () => {

    const dispatch = useDispatch()

    const {blogs,loading} =useSelector((state)=>state.blog)
    console.log(blogs);
    
    useEffect(()=>{
        dispatch(getAllBlogs())
    },[])
    
    

  return (
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
    
        { loading? (
            <div className="col-span-full text-center text-gray-500">
                Loading blogs...
            </div>
        ) : blogs.length === 0 ? (
            <div className="col-span-full text-center text-gray-500">
                No blogs available.
            </div>
        ) : (

            blogs.map((card)=>{
                return <>
                <BlogCard key={card._id} Card= {card} />
                </>
            })
        )}
   </div>
  )
}       



export default Blogs