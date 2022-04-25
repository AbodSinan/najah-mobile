const defaultState = Object.freeze({
  userBookings: [],
  userClasses: [],
  subjectCategories: [],
  educationLevels: [],
  subjects: [],
  status: {},
  errors: [],
});

export default function apiReducer(state = defaultState, action) {
  switch (action.type) {
    case REHYDRATE: {
      const incoming = action.payload && action.payload.api;
      return Object.freeze({
        ...incoming,
      });
    }
    default:
      return Object.freeze({ ...state });
  }
}
