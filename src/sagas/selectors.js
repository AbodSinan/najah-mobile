export const getUserType = (state) => state.user.userType;
export const getUserToken = (state) => state.user.token;
export const getUserInfo = (state) => state.user;

export const getLoginErrors = (state) =>
  state.user.errors.filter((error) => error.endpointName === "login");

export const getUserClasses = (state) => state.api.userClasses;
export const getUserPrivateClasses = (state) => state.api.userPrivateClasses;
export const getPrivateClasses = (state) => state.api.privateClasses;
export const getSubjects = (state) => state.api.subjects;
export const getEducationLevels = (state) => state.api.educationLevels;
export const getSubjectCategories = (state) => state.api.subjectCategories;

export const selectEducationLevel = (state, educationLevelId) =>
  state.api.educationLevels[educationLevelId];
export const selectSubjectClasses = (state, subjectId) =>
  state.api.classes.filter((cls) => cls.subject === subjectId);

export const selectClass = (state, classId) =>
  state.api.classes.find((cls) => cls.id === classId);
