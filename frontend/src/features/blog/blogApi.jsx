import {axiosInstance} from "../../services/axios"

const createApi = async(blogContent)=>{
    const response = await axiosInstance.post('/blogs/create')
    return response.data;
}


export {createApi}