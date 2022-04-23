import { vsprintf } from "sprintf-js";
import { chain, isObject } from "lodash";

class baseApi {
  constructor({ baseUrl, apiSettings = {} }) {
    this.endpointNames = [];
    this.token = null;
    this.apiSettings = apiSettings;
    this.baseUrl = baseUrl.toString();
  }

  initializeEndpoints(Endpoint) {
    const endpointNames = [];
    chain(this)
      .toPairs()
      .filter(([endpointName, endpoint]) => endpoint instanceof Endpoint)
      .forEach(([endpointName, endpoint]) => {
        endpoint.initialize({ api: this, name: endpointName });
        endpointNames.push(endpointName);
      })
      .value();

    this.endpointNames = endpointNames;
  }

  setToken(token = null) {
    this.token = token;
  }

  constructUrl(endpoint, args = []) {
    const url = new URL(endpoint, this.baseUrl);
    return vsprintf(url.href, args);
  }

  logError(endpoint, url, options, response) {
    console.error(`Failed to ${options.method || "GET"} from ${url}`);
  }

  prepareRequestParams({ body, token = null, ...otherParams }) {
    console.log("TOJEN", token);
    const headers = new Headers({
      ...(token && { Authorization: `Token ${token}` }),
      ...(body && { "Content-Type": "application/json" }),
      Accept: "application/json",
    });

    return {
      headers,
      body: body && JSON.stringify(body),
      ...otherParams,
    };
  }

  parseResponse(responseText) {
    try {
      return JSON.parse(responseText);
    } catch (error) {
      return responseText;
    }
  }

  checkSuccess({ response, responseData }) {
    return (
      response.ok === true ||
      response.status === 204 ||
      (isObject(responseData) &&
        responseData.success !== false &&
        responseData.success !== undefined)
    );
  }

  async sendRequest(endpointUrl, options, endpoint) {
    const { urlArgs, ...requestParams } = options;
    const url = this.constructUrl(endpointUrl, urlArgs);
    const preparedRequestParams = endpoint.prepareRequestParams(requestParams);
    const response = await this.executeRequest(url, preparedRequestParams);

    if (response.error) {
      this.logError(endpoint, url, requestParams, response);
    }

    return response;
  }

  async executeRequest(url, options) {
    let response;
    try {
      response = await fetch(url, { ...options });
    } catch (error) {
      return {
        error: {
          success: false,
          message: error.message || "undefined error",
        },
      };
    }

    const responseText = await response.text();
    const responseData = this.parseResponse(responseText);
    const isSuccess = this.checkSuccess({ response, responseData });

    if (isSuccess) {
      return {
        response: responseData || { success: true },
      };
    }

    return {
      error: {
        ...responseData,
      },
    };
  }
}

export default baseApi;
