import { compose, createStore, applyMiddleware } from "@reduxjs/toolkit";
import { rootReducer } from "./root-reducer";
// import logger from 'redux-logger'

// import redux persist
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web


// create own middleware
const loggerMiddleware = (store) => (next) => (action) => {
    if(!action.type){
        return next(action);
    }
    console.log('type', action.type);
    console.log('payload', action.payload);
    console.log('currentState: ', store.getState());

    next(action);

    console.log('next state: ', store.getState());

}

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['user', 'cart']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);
  

// create root reducer
const middleWares = [loggerMiddleware];

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, undefined, composedEnhancers)

export const persistor = persistStore(store);