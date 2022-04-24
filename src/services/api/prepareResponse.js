export const defaultPrepareResponse = ({ data }) => ({
  response: {
    ...data.response,
  },
});

export const prepareSubjectResponse = ({ data, state }) => ({
  response: {
    subjects: [...data.response],
  },
});

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
