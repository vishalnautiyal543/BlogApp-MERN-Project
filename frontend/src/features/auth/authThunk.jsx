import { createAsyncThunk } from "@reduxjs/toolkit";
import { registerApi, loginApi, refreshApi, logoutApi } from "./authApi";
import { setAccessToken } from "../../utils/tokenManager";

const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, ThunkApi) => {
    try {
      return await registerApi(userData);
    } catch (error) {
      return ThunkApi.rejectWithValue(error.response?.data?.message);
    }
  },
);

const loginUser = createAsyncThunk("auth/login", async (userData, ThunkApi) => {
  try {
    let data = await loginApi(userData,ThunkApi);
    setAccessToken(data.accessToken);
    return data;
  } catch (error) {
    return ThunkApi.rejectWithValue(
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    );
  }
});

const refreshUser = createAsyncThunk("auth/refresh", async (_, ThunkApi) => {
  try {
    return await refreshApi();
  } catch (error) {
      console.log("Response:", error.response);
    return ThunkApi.rejectWithValue(error.response?.data?.message);
  }
});


const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_,ThunkApi) =>{
    try {
      return await logoutApi();
      
    } catch (error) {
      return ThunkApi.rejectWithValue(error.response?.data?.message);
    }
  }
)

export { registerUser, loginUser, refreshUser, logoutUser };
