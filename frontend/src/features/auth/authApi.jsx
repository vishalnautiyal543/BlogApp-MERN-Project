import {axiosInstance} from "../../services/axios"


const registerApi = async (userData) => {
    const response = await axiosInstance.post("/signup",userData)
    return response.data;
};



export {
    registerApi
}




