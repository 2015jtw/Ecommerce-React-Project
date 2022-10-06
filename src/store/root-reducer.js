import { combineReducers } from "@reduxjs/toolkit";

// import redux reducers to combine into the root reducer
import { userReducer } from "./user/user-reducer";
import { categoriesReducer } from "./categories/category-reducer";

export const rootReducer = combineReducers({
    user: userReducer,
    categories: categoriesReducer,


})