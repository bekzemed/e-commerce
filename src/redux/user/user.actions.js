import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';
import { userActionTypes } from './user.types';

export const fetchUserSuccess = user => ({
  type: userActionTypes.FETCH_USER_SUCCESS,
  payload: user,
});

export const fetchUserStart = () => ({
  type: userActionTypes.FETCH_USER_START,
});

export const fetchUserFailure = errorMessage => ({
  type: userActionTypes.FETCH_USER_FAILURE,
  payload: errorMessage,
});

export const fetchUserStartAsync = () => {
  return dispatch => {
    auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef
          .get()
          .then(snapshot => {
            console.log(snapshot.data());
            dispatch(fetchUserSuccess({ id: snapshot.id, ...snapshot.data() }));
          })
          .catch(error => dispatch(fetchUserFailure(error.message)));
      }
      dispatch(fetchUserSuccess(userAuth));
    });
  };
};
