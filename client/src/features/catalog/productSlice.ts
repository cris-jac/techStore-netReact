import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../../app/models/product";

interface ProductState {
    products: Product[] | null;
}

const initialState: ProductState = {
    products: null,
}

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts: (state, action) => {
            console.log("productSlice | setProducts");
            state.products = action.payload;
        },
    }
});

export const { setProducts } = productSlice.actions;
export const productsReducer = productSlice.reducer;