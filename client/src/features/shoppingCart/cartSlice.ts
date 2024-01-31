import { createSlice } from "@reduxjs/toolkit";
import { ShoppingCart } from "../../app/models/shoppingCart";

interface CartStatus {
    cart: ShoppingCart | null;
    // status: string;     // for Thunk
}

const initialState: CartStatus = {
    cart: null,
    // status: 'idle'      // for Thunk
}

// For Thunk
// export const addItemToCartAsync = createAsyncThunk<ShoppingCart, { productId: number, quantity?: number  }>(
//     'cart/addItemToCartAsync',
//     async ({ productId, quantity= 1 }) => {
//         try {
//             return await agent.ShoppingCart.addItem(productId, quantity);
//         } catch (error) {
//             console.log(error);   
//             throw error;
//         }
//     }
// );

// Extra reducers
// export const cartExtraReducers = (builder: any) => {
//     builder.addCase(addItemToCartAsync.pending, (state: CartStatus, action: any) => {
//         console.log(action);
//         state.status = 'pendingAddItem';
//     });
//     builder.addCase(addItemToCartAsync.fulfilled, (state: CartStatus, action: any) => {
//         state.cart = action.payload;
//         state.status = 'idle';
//     });
//     builder.addCase(addItemToCartAsync.rejected, (state: CartStatus) => {
//         state.status = 'idle';
//     });
// }

export const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
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
    }, 
    // extraReducers: (builder => {
    //     builder.addCase(addItemToCartAsync.pending, (state, action) => {
    //         console.log(action);
    //         state.status = 'pendingAddItem';
    //     });
    //     builder.addCase(addItemToCartAsync.fulfilled, (state, action) => {
    //         state.cart = action.payload;
    //         state.status = 'idle';
    //     });
    //     builder.addCase(addItemToCartAsync.rejected, (state) => {
    //         state.status = 'idle';
    //     });
    // })
    // extraReducers: cartExtraReducers
});

export const { setCart, addItemToCart, removeItemFromCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;