export interface CartItem {
    productId: number;
    name: string;
    priceInARS: number;
    pictureUrl: string;
    category: string;
    brand: string;
    quantity: number;
}

export interface ShoppingCart {
    id: number;
    buyerId: string;
    items: CartItem[];
}