import { toSnakeKeys } from "../../utils/commonUtils";

export const defaultPrepareRequest = (params) => {
  return toSnakeKeys({
    body: {
      ...params,
    },
  });
};

export const prepareRegisterRequest = (params) =>
  toSnakeKeys({
    body: {
      ...params,
    },
  });

export const prepareCreateClassRequest = (params) => {
  const {
    noOfTimes,
    duration,
    frequency,
    subject,
    subjectCategory,
    description,
    educationLevel,
  } = params;
  return {
    urlArgs: [subject],
    body: {
      noOfTimes,
      duration,
      frequency,
      subjectCategory,
      description,
      educationLevel,
    },
  };
};

export const prepareCreateClassBookingRequest = (params) => {
  const { classId } = params;

  return {
    urlArgs: [classId],
    body: {},
  };
};
