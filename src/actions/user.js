export const SET_USER_TYPE = "SET_USER_TYPE";
export const LOGOUT = "LOGOUT";

export const setUserType = ({ userType }) => ({
  type: SET_USER_TYPE,
  userType,
});

export const logout = () => ({
  type: LOGOUT,
});
