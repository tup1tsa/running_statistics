import { AxiosStatic } from "axios";
import { MESSAGES } from "running_app_core";
import { networkRequestFactory } from "../../../application/logic/network/networkRequest";

const getAxiosMock = () => {
  return {
    CancelToken: {
      source: () => ({})
    },
    isCancel: e => false
  } as AxiosStatic;
};

it("should call axios with correct get params", () => {
  const get = jest.fn();
  const axios = getAxiosMock();
  axios.get = get;
  networkRequestFactory(axios)("/some url", "get");
  expect(get.mock.calls.length).toBe(1);
  expect(get.mock.calls[0][0]).toBe("/some url");
});

it("should call axios with correct post params", () => {
  const post = jest.fn();
  const axios = getAxiosMock();
  axios.post = post;
  const data = [{ name: "barny" }];
  networkRequestFactory(axios)("/postUrl", "post", data);
  expect(post.mock.calls.length).toBe(1);
  expect(post.mock.calls[0][0]).toBe("/postUrl");
  expect(post.mock.calls[0][1]).toBe(data);
});

it("should return correct data with successful request", async done => {
  const post = jest.fn().mockResolvedValue({
    data: { appleColor: "green" },
    status: 200
  });
  const axios = getAxiosMock();
  axios.post = post;
  const result = await networkRequestFactory(axios)("/some url", "post");
  expect(result).toEqual({
    status: 200,
    data: { appleColor: "green" }
  });
  done();
});

it("should return correct error message if server send an error", async done => {
  const post = jest.fn().mockRejectedValue({
    response: { error: "some error" },
    status: 400
  });
  const axios = getAxiosMock();
  axios.post = post;
  const result = await networkRequestFactory(axios)("/some url", "post");
  expect(result).toEqual({ status: 400, errorMessage: "some error" });
  done();
});

it("should catch any possible error", async done => {
  const post = jest.fn().mockRejectedValue(new Error("random error"));
  const axios = getAxiosMock();
  axios.post = post;
  const result = await networkRequestFactory(axios)("/some url", "post");
  expect(result).toEqual({
    status: 500,
    errorMessage: MESSAGES.unexpectectedError
  });
  done();
});

it("should catch cancel error", async done => {
  // overly complicated test case
  // cancel mechanic in axios is mocked completely
  jest.useFakeTimers();
  const timeout = 15000;
  // resolve is not used hence ts-ignore
  // @ts-ignore
  const cancelledRequest = new Promise((resolve, reject) => {
    setTimeout(() => reject("fail"), timeout);
  });
  const longRequest = new Promise(resolve => {
    setTimeout(() => resolve("success"), 30000);
  });
  const axios = getAxiosMock();
  const cancelMock = jest.fn();
  const isCancelMock = jest.fn().mockReturnValue(true);
  const sourceMock = jest.fn().mockReturnValue({
    token: "cancel token",
    cancel: cancelMock
  });
  axios.CancelToken.source = sourceMock;
  axios.isCancel = isCancelMock;
  axios.get = jest
    .fn()
    .mockReturnValue(Promise.all([cancelledRequest, longRequest]));
  const request = networkRequestFactory(axios)("/some url", "get", undefined, {
    timeout
  });
  jest.advanceTimersByTime(20000);
  const result = await request;
  expect(result).toEqual({
    status: 400,
    errorMessage: MESSAGES.requestTimeout
  });
  expect(cancelMock.mock.calls.length).toBe(1);
  done();
});
