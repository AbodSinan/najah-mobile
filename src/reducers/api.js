const defaultState = Object.freeze({
  userBookings: [],
  userClasses: [],
  subjects: [],
  status: {},
  errors: [],
});

export default function apiReducer(state = defaultState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
