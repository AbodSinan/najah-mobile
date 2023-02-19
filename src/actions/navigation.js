export const INIT = "INIT";
export const NAVIGATE = "NAVIGATE";
export const GO_BACK = "GO_BACK";
export const RESET = "RESET";
export const NAVIGATION_STATE_CHANGED = "NAVIGATION_STATE_CHANGED";

export const persistNavigationState = (navigationState) => ({
  type: NAVIGATION_STATE_CHANGED,
  payload: navigationState,
});
