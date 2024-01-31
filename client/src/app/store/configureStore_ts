import { configureStore } from "@reduxjs/toolkit";
// import { counterSlice } from "../../features/contact/counterSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { shoppingCartSlice } from "../../features/shoppingCart/shoppingCartSlice";
import { cartReducer } from "../../features/shoppingCart/cartSlice";
import { productsReducer } from "../../features/catalog/productSlice";

// import cartReducer from '../../features/shoppingCart/cartSlice';

export const store = configureStore({
    reducer: {
        // counter: counterSlice.reducer,
        shoppingCart: shoppingCartSlice.reducer,
        // new
        cart: cartReducer,
        product: productsReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// export type RootState = ReturnType<typeof store.getState>;
export default store;