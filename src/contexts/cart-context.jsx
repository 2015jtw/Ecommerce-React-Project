import { createContext, useState, useEffect } from "react";

export const addCartItem = (cartItems, productToAdd) => {

    // find if cartItems contains productToAdd
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id)

    // if found, increment qty
    if(existingCartItem) {
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id ? {...cartItem, qty: cartItem.qty + 1} : cartItem)
    }

    // return new array with new cartItems
    return [...cartItems, {...productToAdd, qty: 1}]
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartCount: 0

})

export const CartProvider = ({children}) => {

    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.qty, 0)
        setCartCount(newCartCount);
    }, [cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd))
    }

    const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount};

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}