import { createSlice } from "@reduxjs/toolkit";
import { getCarts ,addToCart ,updatecart,removefromCart} from "./Action";

const initialState = {
    carts: [],
    cart: {},
    isLoading: false,
    success: null,
    error: null,
  };

  export const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{},
    extraReducers:{
        [getCarts.pending]: (state) => {
            state.isLoading = true;
        },
        [getCarts.fulfilled]: (state, action) => {
        state.isLoading = false;
        state.carts = action.payload;
        },
        [getCarts.rejected]: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        },

        [addToCart.pending]: (state) => {
            state.isLoading = true;
        },
        [addToCart.fulfilled]: (state, action) => {
        state.isLoading = false;
        state.cart = action.payload;
        },
        [addToCart.rejected]: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        },

        [updatecart.pending]: (state) => {
            state.isLoading = true;
        },
        [updatecart.fulfilled]: (state, action) => {
        state.isLoading = false;
        state.cart = action.payload;
        },
        [updatecart.rejected]: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        },

        [removefromCart.pending]: (state) => {
            state.isLoading = true;
        },
        [removefromCart.fulfilled]: (state, action) => {
        state.isLoading = false;
        state.cart = action.payload;
        },
        [removefromCart.rejected]: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        },
    }
})

export default cartSlice.reducer