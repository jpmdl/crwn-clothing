// 'takeEvery' listens to every action type being passed
// 'takeLatest' cancels all previous requests and resolves the latest
// we want that because we don't want to get  multiple times from firebase
// 'call' is the effect that invokes the method
// 'put' is the saga effect that dispatches changes to the reducer
import { takeLatest, call, put, all } from "redux-saga/effects";

import ShopActionTypes from "./shop.types";

import {
  firestore,
  convertCollectionsSnapshotToMap
} from "../../firebase/firebase.utils";

import {
  fetchCollectionsSuccess,
  fetchCollectionsFailure
} from "./shop.actions";

// generator funciton notation 'function*'
// every generator function must yield something
export function* fetchCollectionsAsync() {
  try {
    const collectionRef = firestore.collection("collections");
    const snapshot = yield collectionRef.get(); // similar to await
    // takes as first argument the function and the subsequent arguments are that function's arguments
    // In case 'convertCollectionsSnapshotToMap' takes longer that we expect we are yielding (awaiting)
    const collectionsMap = yield call(
      convertCollectionsSnapshotToMap,
      snapshot
    );
    yield put(fetchCollectionsSuccess(collectionsMap));
  } catch (error) {
    yield put(fetchCollectionsFailure(error.message));
  }
}

export function* fetchCollectionsStart() {
  yield takeLatest(
    ShopActionTypes.FETCH_COLLECTIONS_START,
    fetchCollectionsAsync
  );
}

export function* shopSagas() {
  yield all([call(fetchCollectionsStart)]);
}
