import { createContext, useState, useEffect, useReducer } from "react";

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

const CART_ACTION_TYPES = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
}

const INITIAL_STATE = {
    isCartOpen: true,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0
}

const cartReducer = (state, action) => {
    const {type, payload} = action;


    switch(type){
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload
            }
        
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return{
                ...state,
                isCartOpen: payload
            }
        

        default:
            throw new Error (`Unhandled type ${type} in the cartReducer `)
    }
}

export const CartProvider = ({children}) => {

    const [{cartItems, isCartOpen, cartCount, cartTotal}, dispatch] = useReducer(cartReducer, INITIAL_STATE);

    const updateCartItemsReducer = (newCartItems) => {

        // generate newCartTotal
        const newCartTotal = newCartItems.reduce((total, cartItem) => total + cartItem.qty * cartItem.price, 0)
        
        // generate newCartCount
        const newCartCount = newCartItems.reduce((total, cartItem) => total + cartItem.qty, 0)
        

        // dispatch new action with payload
        // newCartItems, newCartTotal, newCartCount 
        dispatch({
            type: CART_ACTION_TYPES.SET_CART_ITEMS, 
            payload: {
                cartItems: newCartItems, 
                cartTotal: newCartTotal, 
                cartCount: newCartCount
            }})

    }

    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd)
        updateCartItemsReducer(newCartItems);
    }

    const removeItemFromCart = (cartItemToRemove) => {
        const newCartItems = removeCartItem(cartItems, cartItemToRemove)
        updateCartItemsReducer(newCartItems);
    }

    const clearItemFromCart = (cartItemToClear) => {
        const newCartItems = clearCartItem(cartItems, cartItemToClear)
        updateCartItemsReducer(newCartItems);
    }

    const setIsCartOpen = (boolean) => {
        dispatch({type: CART_ACTION_TYPES.SET_IS_CART_OPEN, payload: boolean})
    }

    const value = {
        isCartOpen, 
        setIsCartOpen, 
        addItemToCart, 
        cartItems, 
        cartCount, 
        removeItemFromCart, 
        clearItemFromCart, 
        cartTotal};

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}