import { PublicUserInfo } from "running_app_core";
import {
  loginFail,
  loginStart,
  loginSuccess
} from "../../../application/actions/actionCreators";
import { loginRequestFactory } from "../../../application/actions/async/loginViaToken";

const successValidator = (userInfo: unknown): userInfo is PublicUserInfo => {
  return true;
};

it("should dispatch login start action", async done => {
  const dispatch = jest.fn();
  const networkRequest = jest.fn().mockResolvedValue("any");
  await loginRequestFactory(networkRequest, successValidator)()(dispatch);
  expect(dispatch.mock.calls[0][0]).toEqual(loginStart());
  done();
});

it("should call correct endpoint", async done => {
  const dispatch = jest.fn();
  const networkRequest = jest.fn().mockResolvedValue("any");
  await loginRequestFactory(networkRequest, successValidator)()(dispatch);
  expect(networkRequest.mock.calls.length).toBe(1);
  expect(networkRequest.mock.calls[0][0]).toBe("/login");
  expect(networkRequest.mock.calls[0][1]).toBe("get");
  done();
});

it("should dispatch login fail action on fail", async done => {
  const dispatch = jest.fn();
  const errorMessage = "something went wrong";
  const networkRequest = jest.fn().mockResolvedValue({
    status: 500,
    errorMessage
  });
  await loginRequestFactory(networkRequest, successValidator)()(dispatch);
  expect(dispatch.mock.calls.length).toBe(2);
  expect(dispatch.mock.calls[1][0]).toEqual(loginFail(new Error(errorMessage)));
  done();
});

it("should dispatch login success action on success", async done => {
  const dispatch = jest.fn();
  const user = {
    name: "monna",
    email: "has@gmail.com",
    isEmailVerified: true
  };
  const networkRequest = jest.fn().mockResolvedValue({
    status: 200,
    data: user
  });
  await loginRequestFactory(networkRequest, successValidator)()(dispatch);
  expect(dispatch.mock.calls.length).toBe(2);
  expect(dispatch.mock.calls[1][0]).toEqual(loginSuccess(user));
  done();
});

it("should dispatch login fail action if info from the backend is not valid", async done => {
  const dispatch = jest.fn();
  const user = {
    name: "monna",
    email: "has@gmail.com",
    isEmailVerified: true
  };
  const networkRequest = jest.fn().mockResolvedValue({
    status: 200,
    data: user
  });
  const failValidator = jest.fn().mockReturnValue(false);
  // @ts-ignore
  await loginRequestFactory(networkRequest, failValidator)()(dispatch);
  expect(dispatch.mock.calls.length).toBe(2);
  expect(dispatch.mock.calls[1][0]).toEqual(
    loginFail(new Error("user data is corrupted. Try to login again"))
  );
  done();
});
