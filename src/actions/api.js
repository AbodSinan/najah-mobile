export const API_CALL_REQUESTED = "@api/API_CALL_REQUESTED";
export const API_CALL_SUCCESS = "@api/API_CALL_SUCCESS";
export const API_CALL_ERROR = "@api/API_CALL_ERROR";

export const apiCallSuccess = (params) => ({
  type: API_CALL_SUCCESS,
  ...params,
});

export const apiCallError = (params) => ({
  type: API_CALL_ERROR,
  ...params,
});

export const apiCallResult = ({ result, ...params }) => {
  const { response, error } = result;

  if (response) {
    return apiCallSuccess({
      response,
      ...params,
    });
  }

  return apiCallError({
    error,
    ...params,
  });
};
