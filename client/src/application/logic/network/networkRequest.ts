import Axios from "axios";
import { AxiosResponse, AxiosStatic } from "axios";
import { MESSAGES } from "../../common_files/config";

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
    if (e.response && e.response.error && e.status) {
      return {
        status: e.status,
        errorMessage: e.response.error
      };
    }
    if (axios.isCancel(e)) {
      return {
        status: 400,
        errorMessage: MESSAGES[10]
      };
    }
    return {
      status: 500,
      errorMessage: MESSAGES[0]
    };
  }
};

export const networkRequest: NetworkRequest = (url, type, data, options) =>
  networkRequestFactory(Axios)(url, type, data, options);
