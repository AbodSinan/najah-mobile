import baseApi from "./baseApi";
import Endpoint from "./Endpoint";

import * as prepareRequestUtils from "./prepareRequests";
import * as prepareResponseUtils from "./prepareResponse";

class Api extends baseApi {
  constructor(...args) {
    super(...args);
    this.apiName = this.constructor.name;
    this.initializeEndpoints(Endpoint);
  }

  register = new Endpoint({
    endpoint: "auth/register",
    method: "POST",
    reducer: "user",
  });
  login = new Endpoint({
    endpoint: "auth/login",
    method: "POST",
    reducer: "user",
  });
  getProfile = new Endpoint({ endpoint: "profile", reducer: "user" });
  updateProfilePicture = new Endpoint({
    endpoint: "profile",
    method: "PATCH",
    prepareRequest: prepareRequestUtils.prepareUpdateProfilePicture,
  });
  getUserClasses = new Endpoint({
    endpoint: "booking/user-classes",
    prepareResponse: prepareResponseUtils.prepareUserClassesResponse,
  });
  getClasses = new Endpoint({
    endpoint: "booking/classes",
    prepareResponse: prepareResponseUtils.prepareClassesResponse,
  });
  getPrivateClasses = new Endpoint({
    endpoint: "private/private-classes",
    prepareResponse: prepareResponseUtils.preparePrivateClassesResponse,
  });
  getUserPrivateClasses = new Endpoint({
    endpoint: "private/student-private-classes",
    prepareResponse: prepareResponseUtils.prepareUserPrivateClassesResponse,
  });
  getUserTutorOffers = new Endpoint({
    endpoint: "private/tutor-offers",
    prepareResponse: prepareResponseUtils.prepareUserTutorOffers,
  });
  createClass = new Endpoint({
    endpoint: "booking/subject-classes/%s",
    method: "POST",
    prepareRequest: prepareRequestUtils.prepareCreateClassRequest,
  });
  createPrivateClass = new Endpoint({
    endpoint: "private/private-classes/",
    method: "POST",
    prepareRequest: prepareRequestUtils.prepareCreatePrivateClassRequest,
  });
  getSubjects = new Endpoint({
    endpoint: "education/subjects",
    prepareResponse: prepareResponseUtils.prepareSubjectResponse,
  });
  createSubject = new Endpoint({
    endpoint: "education/subjects",
    prepareRequest: prepareRequestUtils.prepareCreateSubjectRequest,
  });
  getEducationLevels = new Endpoint({
    endpoint: "education/education-levels",
    prepareResponse: prepareResponseUtils.prepareEducationLevelsResponse,
  });
  getSubjectCategories = new Endpoint({
    endpoint: "education/subject-categories ",
    prepareResponse: prepareResponseUtils.prepareSubjectCategoryResponse,
  });
  classBookings = new Endpoint({ endpoint: "booking/class-bookings/%s" });
  createClassBooking = new Endpoint({
    endpoint: "booking/class-bookings/%s",
    method: "POST",
    prepareRequest: prepareRequestUtils.prepareCreateClassBookingRequest,
  });
  createTutorOffer = new Endpoint({
    endpoint: "private/tutor-offers/",
    method: "POST",
    prepareRequest: prepareRequestUtils.prepareCreateTutorOfferRequest,
  });
  subjectClasses = new Endpoint({ endpoint: "booking/subject-classes/%s" });
}

export const apiMapping = {
  api: new Api({ baseUrl: "https://i-najah.herokuapp.com/" }),
};

export default apiMapping["api"];
