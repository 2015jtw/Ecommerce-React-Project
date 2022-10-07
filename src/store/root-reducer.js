import { combineReducers } from "@reduxjs/toolkit";

// import redux reducers to combine into the root reducer
import { userReducer } from "./user/user-reducer";
import { categoriesReducer } from "./categories/category-reducer";
import { cartReducer } from "./cart/cart-reducer";

export const rootReducer = combineReducers({
    user: userReducer,
    categories: categoriesReducer,
    cart: cartReducer,


})