import {createAsyncThunk} from "@reduxjs/toolkit"
import { registerApi } from "./authApi"

const registerUser = createAsyncThunk(
    "auth/register",
    async (userData,ThunkApi)=>{
        try {
            return await registerApi(userData)
        } catch (error) {
            return ThunkApi.rejectWithValue(error.response?.data?.message)
        }
    }
)


export {
    registerUser
}