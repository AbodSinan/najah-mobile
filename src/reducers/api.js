import { REHYDRATE } from "redux-persist/lib/constants";
import { rehydrateReducer } from "../utils/reducerUtils";

const defaultState = Object.freeze({
  userBookings: [],
  userClasses: [],
  userPrivateClasses: [],
  subjectCategories: [],
  educationLevels: [],
  classes: [],
  privateClasses: [],
  subjects: [],
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
            "userPrivateClasses",
            "subjectCategories",
            "educationLevels",
            "classes",
            "subjects",
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
