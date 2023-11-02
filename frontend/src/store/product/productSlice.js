import { createSlice } from "@reduxjs/toolkit";
import { getProduct , getsingleProduct} from "./Action";

const initialState = {
    products: [],
    product: {},
    isLoading: false,
    success: null,
    error: null,
  };

export const productSlice = createSlice({
    name:"product",
    initialState,
    reducers:{},
    extraReducers:{
        [getProduct.pending]: (state) => {
            state.isLoading = true;
        },
        [getProduct.fulfilled]: (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
        },
        [getProduct.rejected]: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        },

        [getsingleProduct.pending]: (state) => {
            state.isLoading = true;
        },
        [getsingleProduct.fulfilled]: (state, action) => {
        state.isLoading = false;
        state.product = action.payload;
        },
        [getsingleProduct.rejected]: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        },
    }
})

export default productSlice.reducer