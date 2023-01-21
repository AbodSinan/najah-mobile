import { REHYDRATE } from "redux-persist/lib/constants";
import * as userActions from "../actions/user";
import apiStatusEnum from "../enums/apiStatusEnum";
import { rehydrateReducer } from "../utils/reducerUtils";

const defaultState = Object.freeze({
  signedIn: false,
  email: null,
  token: null,
  userType: null,
  firstName: null,
  lastName: null,
  fullName: null,
  gender: null,
  educationLevel: null,
  image: null,
  description: null,
  errors: [],
  status: {
    editProfileStatus: apiStatusEnum.INITIAL,
  },
});

export default function userReducer(state = defaultState, action) {
  switch (action.type) {
    case REHYDRATE: {
      const incoming = action.payload && action.payload.user;
      if (incoming && incoming.version === state.version) {
        return Object.freeze({
          ...rehydrateReducer(
            [
              "signedIn",
              "firstName",
              "lastName",
              "fullName",
              "email",
              "gender",
              "token",
              "userType",
              "educationLevel",
              "image",
              "description",
            ],
            state,
            incoming
          ),
        });
      }
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
