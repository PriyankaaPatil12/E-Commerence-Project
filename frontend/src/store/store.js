import { configureStore } from "@reduxjs/toolkit";

import categoryReducer from "./category/categorySlice";
import subcategoryReducer from "./subcategory/subcategorySlice";
import productReducer from "./product/productSlice";
import cartReducer from "./cart/cartSlice";

const store = configureStore({
    reducer:{
        category:categoryReducer,
        subcategory:subcategoryReducer,
        product:productReducer,
        cart:cartReducer
    }
})

export default store
