import {axiosInstance} from "../../services/axios"


const registerApi = async (userData) => {
    const response = await axiosInstance.post("/signup",userData)
    return response.data;
};

const loginApi = async (userData) => {
    const response = await axiosInstance.post("/login",userData)
    localStorage.setItem("hasSession","true")
    return response.data;
}

const logoutApi = async(accessToken)=>{
    const response = await axiosInstance.post("/logout")
    localStorage.removeItem("hasSession")
    return response.data
}

const refreshApi = async ()=>{
    
    const response  = await axiosInstance.post("/refresh-token")

    return response.data
}

export {
    registerApi,
    loginApi,
    refreshApi,
    logoutApi
}




