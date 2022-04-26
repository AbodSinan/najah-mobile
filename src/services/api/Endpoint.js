import * as actions from "../../actions/api";
import { defaultPrepareRequest } from "./prepareRequests";
import { defaultPrepareResponse } from "./prepareResponse";
import { toSnakeKeys } from "../../utils/commonUtils";

class Endpoint {
  constructor({
    endpoint,
    method = "GET",
    prepareRequest = defaultPrepareRequest,
    prepareResponse = defaultPrepareResponse,
    prepareRequestParams = null,
    requestParams = null,
    reducer = "api",
  }) {
    this.name = "";
    this.endpoint = endpoint;
    this.method = method;
    this.api = null;
    this.prepareRequest = prepareRequest;
    this.prepareResponse = prepareResponse;
    this.prepareRequestParams = prepareRequestParams;
    this.createAction = this.createAction.bind(this);
    this.reducer = reducer;
    this.requestParams = requestParams;
  }

  initialize({ api, name }) {
    this.api = api;
    this.name = name;

    this.prepareRequestParams =
      this.prepareRequestParams ?? api.prepareRequestParams;
  }

  createAction(requestParams = {}) {
    return {
      type: actions.API_CALL_REQUESTED,
      apiName: this.api.apiName,
      endpointName: this.name,
      ...requestParams,
    };
  }

  call(params = {}) {
    const { body, urlArgs } = this.prepareRequest(params);
    const parsedBody = body;

    const token = this.api.token;
    const endpoint = this.endpoint;
    const data = this.api.sendRequest(
      endpoint,
      {
        method: this.method,
        token,
        body: this.method === "GET" ? undefined : toSnakeKeys(parsedBody),
        urlArgs,
      },
      this
    );

    return data;
  }
}

export default Endpoint;
