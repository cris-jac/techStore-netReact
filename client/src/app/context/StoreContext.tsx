import { PropsWithChildren, createContext, useContext, useState } from "react";
import { ShoppingCart } from "../models/shoppingCart";

interface StoreContextValue {
    cart: ShoppingCart | null;
    setCart: (cart: ShoppingCart) => void;
    removeItem: (productId: number, quantity: number) => void;
}

export const StoreContext = createContext<StoreContextValue | undefined>(undefined);

export const useStoreContext = () => {
    const context = useContext(StoreContext);

    if (context == undefined) {
        throw Error("Outside the provider");
    }

    return context;
}

export const StoreProvider = ({children}: PropsWithChildren<any>) => {
    const [cart, setCart] = useState<ShoppingCart | null>(null);

    const removeItem = (productId: number, quantity: number) => {
        if (!cart) return;

        // // create copy
        // const items = [...cart.items];
        // const itemIndex = items.findIndex(i => i.productId == productId);

        // // check if item 
        // if (itemIndex >= 0) {
        //     items[itemIndex].quantity -= quantity;
            
        //     // check if item is 0
        //     if (items[itemIndex].quantity === 0) items.splice(itemIndex, 1);

        //     setCart(prevState => {
        //         return {...prevState!, items}
        //     })
        // }

        const updatedItems = cart.items.map(item => {
            if (item.productId === productId) {
                const updatedQuantity = Math.max(0, item.quantity - quantity);
                return { ...item, quantity: updatedQuantity }
            }

            return item;
        });

        const filteredItems = updatedItems.filter(item => item.quantity > 0);

        setCart(prevState => (
            { ...prevState!, items: filteredItems }
        ));
    }

    return (
        <StoreContext.Provider value={{ cart, setCart, removeItem }}>
            {children}
        </StoreContext.Provider>
    );
}