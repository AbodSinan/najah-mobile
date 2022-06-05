export const getUserType = (state) => state.user.userType;
export const getUserToken = (state) => state.user.token;
export const getUserInfo = (state) => state.user;

export const getLoginErrors = (state) =>
  state.user.errors.filter((error) => error.endpointName === "login");

export const getUserClasses = (state) => state.api.userClasses;
export const getUserPrivateClasses = (state) => state.api.userPrivateClasses;
export const getPrivateClasses = (state) => state.api.privateClasses;
export const getSubjects = (state) => state.api.subjects;
export const getNewSubject = (state) => state.api.newSubjects;
export const getEducationLevels = (state) => state.api.educationLevels;
export const getSubjectCategories = (state) => state.api.subjectCategories;

export const getCreateOfferStatus = (state) =>
  state.api.status.createTutorOffer;

export const getCreateSubjectStatus = (state) => state.api.status.createSubject;

export const selectEducationLevel = (state, educationLevelId) =>
  state.api.educationLevels[educationLevelId];
export const selectSubjectClasses = (state, subjectId) =>
  state.api.classes.filter((cls) => cls.subject === subjectId);
export const selectSubject = (state, subjectId) =>
  state.api.subjects.find((subj) => subj.id === subjectId);
export const selectClass = (
  state,
  classId,
  isPrivate = false,
  ownClass = false
) =>
  ownClass
    ? isPrivate
      ? state.api.userPrivateClasses.find((cls) => cls.id === classId)
      : state.api.userClasses.find((cls) => cls.id === classId)
    : isPrivate
    ? state.api.privateClasses.find((cls) => cls.id === classId)
    : state.api.classes.find((cls) => cls.id === classId);
