import { createSlice } from "@reduxjs/toolkit";
import { getSubcategory } from "./Action";

const initialState = {
    subcategories: [],
    subcategory: {},
    isLoading: false,
    success: null,
    error: null,
  };

export const subcategorySlice = createSlice({
    name:"SubCategories",
    initialState,
    reducers:{},
    extraReducers:{
        [getSubcategory.pending]: (state) => {
            state.isLoading = true;
        },
        [getSubcategory.fulfilled]: (state, action) => {
        state.isLoading = false;
        state.subcategories = action.payload;
        },
        [getSubcategory.rejected]: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        },
    }
})

export default subcategorySlice.reducer