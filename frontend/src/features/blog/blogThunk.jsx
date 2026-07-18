import {createAsyncThunk} from "@reduxjs/toolkit"
import {getAllBlogsApi,getSingleBlogApi} from "./blogApi"


// get all blogs
const getAllBlogs = createAsyncThunk(
    "blog/getAll",
    async (_, ThunkApi) => {
    try {
        const response = await getAllBlogsApi();
        return response.data;
    } catch (error) {
        return ThunkApi.rejectWithValue(error.response?.data?.message);
    }
});


// get single blog
const getSingleBlog = createAsyncThunk(
    "blog/getSingle",
    async (slug, ThunkApi) => {
    try {
        const response = await getSingleBlogApi(slug);
        return response;
    } catch (error) {
        return ThunkApi.rejectWithValue(error.response?.data?.message);
    }
});



export {getAllBlogs, getSingleBlog}