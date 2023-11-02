import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getCarts = createAsyncThunk(
    "allcart",
    async (args, { rejectWithValue }) => {
      try {
        const { data } = await axios.get("http://localhost:8001/cart/getAllCart");
        return data;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );  

  export const addToCart = createAsyncThunk(
    "addtocart",
    async (id, { rejectWithValue }) => {
      try {
        const { data } = await axios.get("http://localhost:8001/cart/addToCart/"+id);
        return data;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );  

  export const removefromCart = createAsyncThunk(
    "removecart",
    async (id, { rejectWithValue }) => {
      try {
        const { data } = await axios.delete("http://localhost:8001/cart/deleteCartItem/"+id);
        return data;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );  

  export const updatecart = createAsyncThunk(
    "updatecart",
    async ({id,type} ,{ rejectWithValue }) => {
      try {
        const { data } = await axios.patch(`http://localhost:8001/cart/updateQuantity/${id}?updatetype=${type}`);
        return data;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );  


