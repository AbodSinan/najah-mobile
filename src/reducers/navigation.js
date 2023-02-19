import { GO_BACK, INIT, NAVIGATE, RESET } from "../actions/navigation";

const initialState = {
  navigationState: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case INIT:
      return {
        ...state,
        navigationState: action.payload,
      };
    case NAVIGATE:
      return {
        ...state,
        navigationState: action.payload,
      };
    case GO_BACK:
      return {
        ...state,
        navigationState: action.payload,
      };
    case RESET:
      return {
        ...state,
        navigationState: action.payload,
      };
    default:
      return state;
  }
};
