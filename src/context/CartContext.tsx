import { createContext, ReactNode, useContext, useState } from "react";
import { toast } from "sonner";

const CartContext = createContext({ numOfCartItems: 0, updateNumOfCartItems: (count: number) => { } })


export default function CartProvider({ children }: { children: ReactNode }) {
    const [numOfCartItems, setNumOfCartItems] = useState(0)


    function updateNumOfCartItems(count: number) {
        setNumOfCartItems(count)
    }

    return (
        <CartContext.Provider value={{ numOfCartItems, updateNumOfCartItems }}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext);

    if (!context) {
        toast.error("useCart must be used within CartProvider")
    }

    return context
}