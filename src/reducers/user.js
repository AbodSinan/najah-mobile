import { REHYDRATE } from "redux-persist/lib/constants";
import * as userActions from "../actions/user";

const defaultState = Object.freeze({
  signedIn: false,
  name: null,
  email: null,
  token: null,
  userType: null,
  firstName: null,
  lastName: null,
  errors: [],
  status: {},
});

export default function userReducer(state = defaultState, action) {
  switch (action.type) {
    case REHYDRATE: {
      const incoming = action.payload && action.payload.user;
      return Object.freeze({
        ...incoming,
      });
    }
    case userActions.LOGOUT: {
      return Object.freeze({
        ...defaultState,
      });
    }
    case userActions.SET_USER_TYPE: {
      return Object.freeze({
        ...state,
        userType: action.userType,
      });
    }
    default:
      return Object.freeze({ ...state });
  }
}
