import Axios, { AxiosResponse, AxiosStatic } from "axios";
import { MESSAGES } from "running_app_core";

interface RequestResponse {
  readonly status: number;
  readonly data?: unknown;
  readonly errorMessage?: string;
}

interface Options {
  timeout: number;
}

export type NetworkRequest = (
  url: string,
  type: "get" | "post",
  data?: any,
  options?: Options
) => Promise<RequestResponse>;
type NetworkRequestFactory = (axios: AxiosStatic) => NetworkRequest;

export const networkRequestFactory: NetworkRequestFactory = axios => async (
  url,
  type,
  data,
  options = { timeout: 60000 }
) => {
  let result: AxiosResponse;
  const source = axios.CancelToken.source();
  const timeoutId = setTimeout(() => {
    source.cancel();
  }, options.timeout);
  try {
    result =
      type === "get"
        ? await axios.get(url, { cancelToken: source.token })
        : await axios.post(url, data, { cancelToken: source.token });
    clearTimeout(timeoutId);
    return {
      status: result.status,
      data: result.data
    };
  } catch (e) {
    clearTimeout(timeoutId);
    if (e.response && e.response.data && e.response.status) {
      return {
        status: e.response.status,
        errorMessage: e.response.data
      };
    }
    if (axios.isCancel(e)) {
      return {
        status: 400,
        errorMessage: MESSAGES.requestTimeout
      };
    }
    return {
      status: 500,
      errorMessage: MESSAGES.unexpectectedError
    };
  }
};

export const networkRequest: NetworkRequest = (url, type, data, options) =>
  networkRequestFactory(Axios)(url, type, data, options);
