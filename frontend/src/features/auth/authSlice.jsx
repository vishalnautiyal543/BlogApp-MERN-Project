import { createSlice } from "@reduxjs/toolkit";
import { loginUser, logoutUser, refreshUser, registerUser } from "./authThunk";

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  success: false,
  message: "",
  accessToken: null,
  authLoading: true ,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
     setAccessToken:(state,action)=>{
            state.accessToken = action.payload
        },
        logout:(state)=>{
            state.user=null
            state.accessToken = null
            state.isAuthenticated = false
        },
        authCheckComplete:(state)=>{
            state.authLoading = false
        }
  },
  extraReducers: (builder) => {
    builder
      // register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = action.payload.success;
        state.message = action.payload.message;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //login

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.authLoading = false;
        state.isAuthenticated = true;
        state.success = action.payload.success;
        state.message = action.payload.message;
        state.accessToken = action.payload.accessToken;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.authLoading = false;
        state.error = action.payload;
      })

      //refresh user

      .addCase(refreshUser.pending, (state) => {
        state.authLoading = true;
      })

      .addCase(refreshUser.fulfilled, (state, action) => {
        state.authLoading = false;

        state.user = action.payload.user;

        state.accessToken = action.payload.accessToken;

        state.isAuthenticated = true;
      })

      .addCase(refreshUser.rejected, (state) => {
        state.authLoading = false;

        state.user = null;

        state.accessToken = null;

        state.isAuthenticated = false;
      })

      //logout

      .addCase(logoutUser.pending,(state)=>{
          state.loading = true
      })

      .addCase(logoutUser.fulfilled,(state,action)=>{
                state.user = null
                state.accessToken= null
                state.loading= false
                state.error= null
                state.authLoading = false
                state.success= action.payload.success
                state.message= action.payload.message
                state.isAuthenticated= false
      })

      .addCase(logoutUser.rejected,(state,action)=>{
          state.loading = false;
          state.error = action.payload;
      })
  },
});

export const {logout,setAccessToken,authCheckComplete} = authSlice.actions;

export default authSlice.reducer;
