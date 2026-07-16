import {createSlice} from "@reduxjs/toolkit";

const getInitialTheme = () => {
    if(typeof window !== "undefined" ) {
        return localStorage.getItem("theme") || "system";
    }

    return "system";
}

const initialState = {
    mode: getInitialTheme()
}

const themeSlice = createSlice({
    name:"theme",
    initialState,
    reducers:{
        setTheme: (state, action) => {
            state.mode = action.payload;
            if(action.payload === "system") {
                localStorage.removeItem("theme");
            } else {
                localStorage.setItem("theme", action.payload);
            }
        }
    }
})

export const {setTheme} = themeSlice.actions;

export default themeSlice.reducer;