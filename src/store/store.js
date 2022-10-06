import { compose, createStore, applyMiddleware } from "@reduxjs/toolkit";
import { rootReducer } from "./root-reducer";
// import logger from 'redux-logger'

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

// create root reducer
const middleWares = [loggerMiddleware];

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, undefined, composedEnhancers)