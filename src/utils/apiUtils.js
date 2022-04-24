import * as actions from "../actions/api";

export const apiCallSuccessChannel = (endpointName) => (action) => {
  return (
    action.type === actions.API_CALL_SUCCESS &&
    action.endpointName === endpointName
  );
};

export const apiCallErrorChannel = (endpointName) => (action) => {
  return (
    action.type === actions.API_CALL_ERROR &&
    action.endpointName === endpointName
  );
};
