import { REHYDRATE } from "redux-persist/lib/constants";
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
  newSubject: {},
  status: {},
  errors: [],
});

export default function apiReducer(state = defaultState, action) {
  switch (action.type) {
    case REHYDRATE: {
      const incoming = action.payload && action.payload.api;
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
            "subjects",
            "newSubject",
          ],
          state,
          incoming
        ),
      });
    }
    default:
      return Object.freeze({ ...state });
  }
}
