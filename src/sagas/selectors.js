export const getUserType = (state) => state.user.userType;
export const getUserToken = (state) => state.user.token;
export const getUserInfo = (state) => state.user;

export const getLoginErrors = (state) =>
  state.user.errors.filter((error) => error.endpointName === "login");

export const getUserClasses = (state) => state.api.userClasses;
export const getSubjects = (state) => state.api.subjects;
export const getEducationLevels = (state) => state.api.educationLevels;
export const getSubjectCategories = (state) => state.api.subjectCategories;

export const selectSubjectClasses = (state, subjectId) => {
  console.log(state.api.classes);
  console.log("SUBJECT ID", subjectId);
  return state.api.classes.filter((cls) => cls.subject === subjectId);
};

export const selectClass = (state, classId) => {
  return state.api.classes.filter((cls) => cls.id === classId);
};
