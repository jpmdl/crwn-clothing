import { createStore, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";
import logger from "redux-logger";
// import thunk from "redux-thunk"; // library that lets reduz call functions
import createSagaMiddleware from "redux-saga";

import rootReducer from "./root-reducer";
import rootSaga from "./root-saga";

// const middlewares = [thunk];
const sagaMiddlewre = createSagaMiddleware();
const middlewares = [sagaMiddlewre];

if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

// after store is created with saga middleware,
// we are going to run each saga we want to apply
sagaMiddlewre.run(rootSaga);

export const persistor = persistStore(store);

export default { store, persistStore };
