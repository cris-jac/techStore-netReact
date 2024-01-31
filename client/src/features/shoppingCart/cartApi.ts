import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const cartApi = createApi({
//     reducerPath: "cartApi",
//     baseQuery: fetchBaseQuery({
//         baseUrl: "http://localhost:5072/api/"
//     }),
//     tagTypes: ["Carts"],
//     endpoints: (builder) => ({
//         query: () => ({
//             url: 'shoppingCarts'
//         }),
//         providesTags: ["Carts"]
//     })
// });

const cartApi = createApi({
    reducerPath: "cartApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5072/api/"
    }),
    tagTypes: ["Carts"],
    endpoints: (builder) => ({
        // GET Cart
        getCart: builder.query({
            query: () => ({
                url: 'ShoppingCarts'
            }),
            providesTags: ["Carts"]
        }),
        // ADD Item to Cart
        addItemToCart: builder.mutation({
            query: ({ productId, quantity }) => ({
                url: 'ShoppingCarts',
                method: "POST",
                params: {
                    productId,
                    quantity
                }
            }),
            invalidatesTags: ["Carts"]
        }),
        // REMOVE Item to Cart
        removeItemFromCart: builder.mutation({
            query: ({ productId, quantity }) => ({
                url: 'ShoppingCarts',
                method: "DELETE",
                params: {
                    productId,
                    quantity
                },
            }),
            invalidatesTags: ["Carts"]
        })
    })
});

export const { useGetCartQuery, useAddItemToCartMutation, useRemoveItemFromCartMutation } = cartApi;
export default cartApi;