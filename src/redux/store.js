// add middleware to our store to catch actions and use it just to log and pass it along
import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import rootReducer from "./root-reducer";

// all of the middlewares we want into an array
const middlewares = [logger];
const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;
