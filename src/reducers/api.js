import { REHYDRATE } from "redux-persist/lib/constants";
import apiStatusEnum from "../enums/apiStatusEnum";
import { rehydrateReducer } from "../utils/reducerUtils";

const defaultState = Object.freeze({
  userBookings: [],
  userClasses: [],
  userPrivateOffers: [],
  userPrivateClasses: [],
  subjectCategories: [],
  educationLevels: [],
  classes: [],
  privateClasses: [],
  subjects: [],
  classBookings: {},
  newSubject: {},
  retrievedProfile: {},
  status: {
    acceptStudent: apiStatusEnum.INITIAL,
    retrievedProfile: apiStatusEnum.INITIAL,
  },
  errors: [],
});

export default function apiReducer(state = defaultState, action) {
  switch (action.type) {
    case REHYDRATE: {
      const incoming = action.payload && action.payload.api;
      if (incoming && incoming.version === state.version) {
        return Object.freeze({
          ...rehydrateReducer(
            [
              "userBookings",
              "userClasses",
              "userPrivateOffers",
              "userPrivateClasses",
              "subjectCategories",
              "educationLevels",
              "classes",
              "classBookings",
              "subjects",
              "newSubject",
            ],
            state,
            incoming
          ),
        });
      }
    }
    default:
      return Object.freeze({ ...state });
  }
}
