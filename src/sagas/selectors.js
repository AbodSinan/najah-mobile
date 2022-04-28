export const getUserType = (state) => state.user.userType;
export const getUserToken = (state) => state.user.token;
export const getUserInfo = (state) => state.user;

export const getLoginErrors = (state) =>
  state.user.errors.filter((error) => error.endpointName === "login");

export const getUserClasses = (state) => state.api.userClasses;
export const getSubjects = (state) => state.api.subjects;
export const getEducationLevels = (state) => state.api.educationLevels;
export const getSubjectCategories = (state) => state.api.subjectCategories;
