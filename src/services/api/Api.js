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
    prepareRequest: prepareRequestUtils.prepareRegisterRequest,
  });
  login = new Endpoint({
    endpoint: "auth/login",
    method: "POST",
    reducer: "user",
  });
  getProfile = new Endpoint({ endpoint: "profile", reducer: "user" });
  getUserClasses = new Endpoint({
    endpoint: "booking/user-classes",
    prepareResponse: prepareResponseUtils.prepareUserClassesResponse,
  });
  createClass = new Endpoint({
    endpoint: "booking/subject-classes/%s",
    method: "POST",
    prepareRequest: prepareRequestUtils.prepareCreateClassRequest,
  });
  getSubjects = new Endpoint({
    endpoint: "education/subjects",
    prepareResponse: prepareResponseUtils.prepareSubjectResponse,
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
  subjectClasses = new Endpoint({ endpoint: "booking/subject-classes/%s" });
}

export const apiMapping = {
  api: new Api({ baseUrl: "https://i-najah.herokuapp.com/" }),
};

export default apiMapping["api"];
