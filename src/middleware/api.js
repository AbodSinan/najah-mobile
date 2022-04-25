import * as actions from "../actions/api";
import api from "../services/api/Api";

const makeApiCall = async (store, action) => {
  const { apiName, endpointName, type, ...options } = action;

  const endpoint = api[endpointName];

  const result = await endpoint.call({ ...options });
  store.dispatch(
    actions.apiCallResult({
      apiName,
      endpointName,
      result,
      options,
    })
  );
};

export const apiMiddleware = (store) => (next) => (action) => {
  if (action.type !== actions.API_CALL_REQUESTED) {
    return next(action);
  }

  makeApiCall(store, action);
  return next(action);
};
