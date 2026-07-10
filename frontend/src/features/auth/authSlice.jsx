import {createSlice} from '@reduxjs/toolkit';
import { registerUser } from './authThunk';


const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  success: false,
  message:"",
  accessToken: null,
  authLoading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(registerUser.pending,(state)=>{
        state.loading = true;
        state.error = null;
    })
    .addCase(registerUser.fulfilled,(state,action)=>{
        state.loading = false;
        state.isAuthenticated= action.payload.success;
        state.message = action.payload.message
    })
    .addCase(registerUser.rejected,(state,action)=>{

    })
  }
});


export default authSlice.reducer;