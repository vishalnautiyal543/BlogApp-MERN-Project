import {createSlice} from "@reduxjs/toolkit";
import {getAllBlogs,getSingleBlog} from "./blogThunk";


const initialState = {
    blogs:[],
    singleBlog:null,
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
            })

            //get single blog
            .addCase(getSingleBlog.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getSingleBlog.fulfilled, (state, action) => {
                state.loading = false;
                state.singleBlog = action.payload;
            })
            .addCase(getSingleBlog.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})


export default blogSlice.reducer