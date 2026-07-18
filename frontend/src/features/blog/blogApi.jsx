import {axiosInstance} from "../../services/axios"

const createApi = async(blogContent)=>{
    const response = await axiosInstance.post('/blogs/create',blogContent)
    return response.data;
}


const getAllBlogsApi = async()=>{
    const response = await axiosInstance.get('/blogs')
    return response.data;
}

const getSingleBlogApi = async(slug)=>{
    const response = await axiosInstance.get(`/blogs/${slug}`)
    return response.data;
}


export {createApi, getAllBlogsApi, getSingleBlogApi}