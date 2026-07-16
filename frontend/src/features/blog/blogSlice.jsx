import {createSlice} from "@reduxjs/toolkit";
import {getAllBlogs} from "./blogThunk";


const initialState = {
    blogs:[],
    loading:false,
    error:null
}

const blogSlice = createSlice({
    name:"blog",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(getAllBlogs.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllBlogs.fulfilled, (state, action) => {
                state.loading = false;
                state.blogs = action.payload;
            })
            .addCase(getAllBlogs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
})


export default blogSlice.reducer