import { createContext, useState, useEffect } from "react";

// add helper function
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

// remove helper function
export const removeCartItem = (cartItems, cartItemToRemove) => {

    // find the cartitem to remove
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id)

    // check if qty is equal to 1, if it is remove it from the cart
    if(existingCartItem.qty === 1){
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
    }

    // if it isn't qty equal to 1, return back cartItems with matching cart item with reduced qty
    if(existingCartItem) {
        return cartItems.map((cartItem) => cartItem.id === cartItemToRemove.id ? {...cartItem, qty: cartItem.qty - 1} : cartItem)
    }

    // return new array with new cartItems
    return [...cartItems, {...cartItemToRemove, qty: -1}]
}

// clear helper function
export const clearCartItem = (cartItems, cartItemToClear) => {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id);
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartCount: 0,
    cartTotal: 0

})

export const CartProvider = ({children}) => {

    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    // useEffect for cartCount
    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.qty, 0)
        setCartCount(newCartCount);
    }, [cartItems])

    // useEffect for cartTotal
    useEffect(() => {
        const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.qty * cartItem.price, 0)
        setCartTotal(newCartTotal);
    }, [cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd))
    }

    const removeItemFromCart = (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems, cartItemToRemove))
    }

    const clearItemFromCart = (cartItemToClear) => {
        setCartItems(clearCartItem(cartItems, cartItemToClear))
    }

    const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount, removeItemFromCart, clearItemFromCart, cartTotal};

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}