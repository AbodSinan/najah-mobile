import baseApi from "./baseApi";
import Endpoint from "./Endpoint";

import {
  prepareRegisterRequest,
  prepareCreateClassRequest,
} from "./prepareRequests";

import { prepareSubjectResponse } from "./prepareResponse";

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
    prepareRequest: prepareRegisterRequest,
  });
  login = new Endpoint({
    endpoint: "auth/login",
    method: "POST",
    reducer: "user",
  });
  getProfile = new Endpoint({ endpoint: "profile", reducer: "user" });
  getUserClasses = new Endpoint({ endpoint: "booking/user-classes" });
  createClass = new Endpoint({
    endpoint: "booking/subject-classes/%s",
    method: "POST",
    prepareRequest: prepareCreateClassRequest,
  });
  getSubjects = new Endpoint({
    endpoint: "education/subjects",
    prepareResponse: prepareSubjectResponse,
  });
  getEducationLevels = new Endpoint({ endpoint: "education/education-levels" });
  getSubjectCategories = new Endpoint({
    endpoint: "education/subject-categories ",
  });
  classBookings = new Endpoint({ endpoint: "booking/class-bookings/%s" });
  subjectClasses = new Endpoint({ endpoint: "booking/subject-classes/%s" });
}

export const apiMapping = {
  api: new Api({ baseUrl: "https://i-najah.herokuapp.com/" }),
};

export default apiMapping["api"];
