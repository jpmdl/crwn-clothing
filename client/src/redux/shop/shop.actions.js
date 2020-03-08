import ShopActionTypes from "./shop.types";

import {
  firestore,
  convertCollectionsSnapshotToMap
} from "../../firebase/firebase.utils";

export const fetchCollectionsStart = () => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_START
});

export const fetchCollectionsSuccess = collectionsMap => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionsMap
});

export const fetchCollectionsFailure = errorMessage => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
  payload: errorMessage
});

export const fetchCollectionsStartAsync = () => {
  // instead of returning an action object, we can return a function.
  // redux-thunk will ignore action objects and, as a middleware, will
  // catch any funciton being passed to the root reducer and it will
  // execute that funciton, in this case, the 'dispatch' function.
  // while is being executed, everytime thunk finds a 'dispatch' call
  // it will pass on to the root reducer that action and continues
  // with the previous function execution till the end
  return dispatch => {
    const collectionRef = firestore.collection("collections");
    // as soon as firestore starts the collection get,
    // we instatiate fetchCollectionsStart action that sets isFetching to true
    dispatch(fetchCollectionsStart());

    // ** Observable pattern **
    // this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
    //   const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
    //   dispatch(fetchCollectionsSuccess(collectionsMap));
    // });

    // ** Promise pattern **
    collectionRef
      .get()
      .then(snapshot => {
        const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        // as soon as firestore returns data,
        // we instatiate fetchCollectionsSuccess action that sets isFetching to false and sets collections
        dispatch(fetchCollectionsSuccess(collectionsMap));
      })
      .catch(error => dispatch(fetchCollectionsFailure(error.message)));

    // ** API calls **
    // fetch('https://firestore.googleapis.com/v1/projects/crwn-db-aeff9/databases/(default)/documents/collections')
    // .then(res => res.json())
    // .then(collections => console.log)
  };
};

// we can return functions on actions because of 'redux-thunk'.
// if 'redux-thunk' middleware is enabled, any time we attempt
// to 'dispatch' a function instead of an object, the middleware,
// will call that function with 'dispatch' method itself as the
// first argument.
