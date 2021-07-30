import { userActionTypes } from './user.types';

const initialState = {
  currentUser: null,
  errorMessage: '',
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case userActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        errorMessage: null,
      };
    case userActionTypes.SIGN_UP_FAILURE:
    case userActionTypes.EMAIL_SIGN_IN_FAILURE:
    case userActionTypes.GOOGLE_SIGN_IN_FAILURE:
      return {
        ...state,
        errorMessage: action.payload,
      };
    case userActionTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
      };
    default:
      return state;
  }
};

export default userReducer;
