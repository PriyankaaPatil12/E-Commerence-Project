import { createSlice } from "@reduxjs/toolkit";
import { getCategory } from "./Action";

const initialState = {
    categories: [],
    category: {},
    isLoading: false,
    success: null,
    error: null,
  };

export const categorySlice = createSlice({
    name:"Categories",
    initialState,
    reducers:{},
    extraReducers:{
        [getCategory.pending]: (state) => {
            state.isLoading = true;
        },
        [getCategory.fulfilled]: (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
        },
        [getCategory.rejected]: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        },
    }
})

export default categorySlice.reducer