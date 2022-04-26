import { requestStatus } from "./commonUtils";

export function rehydrateReducer(whitelist, state, incoming) {
  const newState = { ...state };

  whitelist.map((propertyName) => {
    newState[propertyName] = incoming[propertyName];
    return propertyName;
  });
  return newState;
}

export function rehydrateStatus(whitelist, state, incoming) {
  const newState = { ...state };

  whitelist.map((propertyName) => {
    newState.status[propertyName] = rehydrateStatusHelper(
      state.status[propertyName],
      incoming.status[propertyName]
    );

    return propertyName;
  });
  return newState;
}

function rehydrateStatusHelper(currentStatus, incomingStatus) {
  if (currentStatus === statusEnum.INITIAL) {
    return incomingStatus;
  }
  if (currentStatus === statusEnum.REQUESTED) {
    return requestStatus(incomingStatus);
  }
  return currentStatus;
}
