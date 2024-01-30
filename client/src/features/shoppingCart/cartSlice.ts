import { createSlice } from "@reduxjs/toolkit";
import { ShoppingCart } from "../../app/models/shoppingCart";

interface CartStatus {
    cart: ShoppingCart | null;
}

const initialState: CartStatus = {
    cart: null
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCart: (state, action) => {
            state.cart = action.payload;
        },
        addItemToCart: (state, action) => {
            const { cartItem, quantity } = action.payload;
            
            const existingItem = state.cart?.items.find(item => item.productId === cartItem.productId);

            if (existingItem) {
                console.log("cartSlice | item found in state");
                existingItem.quantity += quantity;
            } else {
                console.log("cartSlice | item not found in state");
                state.cart?.items.push({
                    ...cartItem, quantity
                });
            }

        },
        removeItemFromCart: (state, action) => {
            const { cartItem, quantity } = action.payload;

            const existingItem = state.cart?.items.find(item => item.productId === cartItem.productId);

            if (existingItem) {
                if (existingItem.quantity > quantity) {
                    existingItem.quantity -= quantity;
                } else {
                    const index = state.cart?.items.indexOf(existingItem);

                    if (index !== -1) {
                        state.cart?.items.splice(index!, 1);
                    }
                }
            }
        }
    }
});

export const { setCart, addItemToCart, removeItemFromCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;