import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../../app/models/product";

interface ProductState {
    product: Product | null;
}

const initialState: ProductState = {
    product: null
}

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts: (state, action) => {
            state.product = action.payload;
        },
    }
});

export const { setProducts } = productSlice.actions;
export const productsReducer = productSlice.reducer;