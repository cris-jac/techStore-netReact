import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "../../features/shoppingCart/cartSlice";
import cartApi from "../../features/shoppingCart/cartApi";
import { productsReducer } from "../../features/catalog/productSlice";
import productApi from "../../features/catalog/productApi";
import { setupListeners } from "@reduxjs/toolkit/query";

const store = configureStore({
    reducer: {
        cartStore: cartReducer,
        productStore: productsReducer,
        [cartApi.reducerPath]: cartApi.reducer,
        [productApi.reducerPath]: productApi.reducer
    },
    // For Apis
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(cartApi.middleware).concat(productApi.middleware)
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export default store;