import { CART_ACTION_TYPES } from "./cart-type";
import { createAction } from "../../utils/reducers/reducer.util";


const addCartItem = (cartItems, productToAdd) => {

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


export const setIsCartOpen = (bool) => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool);


export const addItemToCart = (cartItems, productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd)
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove)
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export const clearItemFromCart = (cartItems, cartItemToClear) => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear)
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

// const setIsCartOpen = (boolean) => {
//     dispatch(
//         createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean))
// }