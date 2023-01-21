export const defaultPrepareResponse = ({ data }) => ({
  response: {
    ...data.response,
  },
});

export const prepareClassesResponse = ({ data, state }) => ({
  response: {
    classes: [...data.response],
  },
});

export const preparePrivateClassesResponse = ({ data, state }) => ({
  response: {
    privateClasses: [...data.response],
  },
});

export const prepareUserPrivateClassesResponse = ({ data, state }) => ({
  response: {
    userPrivateClasses: [...data.response],
  },
});

export const prepareUserTutorOffers = ({ data, state }) => ({
  response: {
    userTutorOffers: [...data.response],
  },
});

export const prepareSubjectResponse = ({ data, state }) => ({
  response: {
    subjects: [...data.response],
  },
});

export const prepareCreateSubjectResponse = ({ data, state }) => {
  return {
    response: {
      subjects: [data.response, ...state.subjects],
      newSubject: { ...data.response },
    },
  };
};

export const prepareEducationLevelsResponse = ({ data, state }) => ({
  response: {
    educationLevels: [...data.response],
  },
});

export const prepareSubjectCategoryResponse = ({ data, state }) => ({
  response: {
    subjectCategories: [...data.response],
  },
});

export const prepareUserClassesResponse = ({ data, state }) => ({
  response: {
    userClasses: [...data.response],
  },
});

export const prepareCreateClassResponse = ({ data, state }) => ({
  response: {
    userClasses: [...state.userClasses, ...data.response],
    classes: [...state.classes, ...data.response],
  },
});

export const prepareCreatePrivateClassResponse = ({ data, state }) => ({
  response: {
    userPrivateClasses: [...state.userPrivateClasses, ...data.response],
    privateClasses: [...state.privateClasses, ...data.response],
  },
});

export const prepareClassBookingsResponse = ({ data, state }) => {
  if (data.response.length == 0) {
    return {};
  }

  const classId = data.response[0].booking_class;

  return {
    response: {
      classBookings: {
        ...state.classBookings,
        [classId]: [...data.response],
      },
    },
  };
};
