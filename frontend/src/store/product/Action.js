import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProduct = createAsyncThunk(
    "product",
    async (subCategory, { rejectWithValue }) => {
      try {
        console.log(subCategory)
        const { data } = await axios.get("http://localhost:8001/product/get-productbysubCat/"+subCategory);
        return data;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );  

  export const getsingleProduct = createAsyncThunk(
    "singleproduct",
    async (id, { rejectWithValue }) => {
      try {
        console.log(id)
        const { data } = await axios.get("http://localhost:8001/product/get-singleProduct/"+id);
        return data;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );  