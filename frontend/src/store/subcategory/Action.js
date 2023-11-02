import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getSubcategory = createAsyncThunk(
    "SubCategories",
    async (category, { rejectWithValue }) => {
      try {
        console.log(category)
        const { data } = await axios.get("http://localhost:8001/subcategory/get-SubCategory/"+category);
        return data;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );  