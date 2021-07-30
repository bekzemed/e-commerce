import { put } from 'redux-saga/effects';
import { clearCart } from './cart.actions';

export function* clearCartOnSignOut() {
  yield put(clearCart());
}
