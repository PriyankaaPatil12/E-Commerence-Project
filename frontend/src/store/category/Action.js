import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getCategory = createAsyncThunk(
    "getCategories",
    async (args, { rejectWithValue }) => {
      try {
        const { data } = await axios.get(
          `http://localhost:8001/category/get-categoryAll`
          
        );
        return data;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );  