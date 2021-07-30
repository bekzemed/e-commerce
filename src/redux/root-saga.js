import { all, takeLatest } from 'redux-saga/effects';
import { shopActionTypes } from './shop/shop.types';
import { fetchCollectionsAsync } from './shop/shop.sagas';
import { userActionTypes } from './user/user.types';
import {
  emailSignInAsync,
  googleSignInAsync,
  isUserAuthenticated,
  signInAfterSignup,
  signOutUser,
  signUpUserSaga,
} from './user/user.sagas';
import { clearCartOnSignOut } from './cart/cart.sagas';

export default function* rootSaga() {
  // all effect == runs all saga concurently
  yield all([
    takeLatest(shopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionsAsync),
    takeLatest(userActionTypes.GOOGLE_SIGN_IN_START, googleSignInAsync),
    takeLatest(userActionTypes.EMAIL_SIGN_IN_START, emailSignInAsync),
    takeLatest(userActionTypes.CHECK_USER_SESSION, isUserAuthenticated),
    takeLatest(userActionTypes.SIGN_OUT, signOutUser),
    takeLatest(userActionTypes.SIGN_OUT, clearCartOnSignOut),
    takeLatest(userActionTypes.SIGN_UP_START, signUpUserSaga),
    takeLatest(userActionTypes.SIGN_UP_SUCCESS, signInAfterSignup),
  ]);
}
