import { toSnakeKeys } from "../../utils/commonUtils";

export const defaultPrepareRequest = (params) => {
  return toSnakeKeys({
    body: {
      ...params,
    },
  });
};

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

export const prepareCreatePrivateClassRequest = (params) => {
  const { subject, educationLevel, rate, description } = params;
  return {
    body: {
      subject,
      educationLevel,
      rate,
      description,
    },
  };
};

export const prepareClassBookingsRequest = (params) => {
  const { classId } = params;

  return {
    urlArgs: [classId],
  };
};

export const prepareCreateClassBookingRequest = (params) => {
  const { classId } = params;

  return {
    urlArgs: [classId],
    body: {},
  };
};

export const prepareCreateSubjectRequest = (params) => {
  return {
    body: {
      ...params,
    },
  };
};

export const prepareCreateTutorOfferRequest = (params) => {
  return {
    body: {
      ...params,
    },
  };
};

export const prepareUpdateProfilePicture = (params) => {
  return {
    body: {
      ...params,
    },
  };
};

export const prepareSelectTutorRequest = (params) => ({
  body: {
    ...params,
  },
});

export const prepareGetProfileRequest = (params) => {
  const { profileId } = params;

  return {
    urlArgs: [profileId],
  };
};
