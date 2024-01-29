import axios, { AxiosResponse } from "axios";


axios.defaults.baseURL = 'http://localhost:5072/api/';
axios.defaults.withCredentials = true;

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
}

const Catalog = {
    list: () => requests.get('products/getall'),
    details: (id: number) => requests.get(`products/${id}`),
}

const ShoppingCart = {
    get: () => requests.get('shoppingcarts'),
    addItem: (productId: number, quantity = 1) => requests.post(`shoppingcarts?productId=${productId}&quantity=${quantity}`, {}),
    removeItem: (productId: number, quantity = 1) => requests.delete(`shoppingcarts?productId=${productId}&quantity=${quantity}`)
}

// const TestErrors = {
//     get400Error: () => requests.get('errors/bad-request'),
//     get401Error: () => requests.get('errors/unauthorized'),
//     get404Error: () => requests.get('errors/not-found'),
//     get500Error: () => requests.get('errors/server-error'),
//     getValidationError: () => requests.get('errors/validation-error'),
// }

const agent = {
    Catalog,
    // TestErrors,
    ShoppingCart
}

export default agent;