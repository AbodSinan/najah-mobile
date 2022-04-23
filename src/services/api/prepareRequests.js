import { toSnakeKeys } from "../../utils/commonUtils";

export const defaultPrepareRequest = (params) => {
  return toSnakeKeys({
    body: {
      ...params,
    },
  });
};

export const prepareRegisterRequest = (params) =>
  toSnakeKeys({
    body: {
      ...params,
    },
  });
