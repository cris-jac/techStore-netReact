// list: () => requests.get('products/getall'),
//     details: (id: number) => requests.get(`products/${id}`),

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5072/api/"
    }),
    tagTypes: ["Products"],
    endpoints: (builder) => ({
        // GET Products
        getProducts: builder.query({
            query: () => ({
                url: 'Products'
            }),
            providesTags: ["Products"]
        }),
        // GET product
        getProduct: builder.query({
            query: (id) => ({
                url: `Products/${id}`
            }),
            providesTags: ["Products"]
        }),
    })
});

export const { useGetProductQuery, useGetProductsQuery } = productApi;
export default productApi;