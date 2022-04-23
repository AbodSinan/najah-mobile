export const defaultPrepareResponse = ({ data }) => ({
  response: {
    ...data.response,
  },
});

export const prepareSubjectResponse = ({ data, state }) => {
  console.log(data);
  return {
    response: {
      subjects: [...data.response],
    },
  };
};
