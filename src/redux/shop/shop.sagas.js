import { call, put } from 'redux-saga/effects';
import {
  firestore,
  convertCollectionsSnapshotToMap,
} from '../../firebase/firebase.utils';
import {
  fetchCollectionsFailure,
  fetchCollectionsSuccess,
} from './shop.action';

export function* fetchCollectionsAsync() {
  try {
    const collectionRef = firestore.collection('collections');
    const snapshot = yield collectionRef.get();
    // call is an effect that used to make an api call
    const collectionsMap = yield call(
      convertCollectionsSnapshotToMap,
      snapshot
    );
    yield put(fetchCollectionsSuccess(collectionsMap));
  } catch (error) {
    yield put(fetchCollectionsFailure(error.message));
  }
}
