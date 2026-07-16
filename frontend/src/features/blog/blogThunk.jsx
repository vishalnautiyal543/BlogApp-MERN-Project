import {createAsyncThunk} from "@reduxjs/toolkit"
import {getAllBlogsApi} from "./blogApi"

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

export {getAllBlogs}