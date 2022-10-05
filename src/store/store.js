import { compose, createStore, applyMiddleware } from "@reduxjs/toolkit";
import { rootReducer } from "./root-reducer";
import logger from 'redux-logger'

// create root reducer

const middleWares = [logger];

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, undefined, composedEnhancers)