import { verifyEmailRouteFactory } from "../../application/routes/verifyEmailRoute";
import { getRequestReponse } from "./registationRoute.test";

it("should return 403 if verification link is not defined", async done => {
  const { request, response, next, status, end } = getRequestReponse();
  const updateUser = jest.fn();
  const setCookies = jest.fn();
  const findUser = jest.fn();
  await verifyEmailRouteFactory(updateUser, setCookies, findUser)(
    request,
    response,
    next
  );
  expect(updateUser.mock.calls.length).toBe(0);
  expect(findUser.mock.calls.length).toBe(0);
  expect(status.mock.calls.length).toBe(1);
  expect(end.mock.calls.length).toBe(1);
  expect(status.mock.calls[0][0]).toBe(403);
  expect(setCookies.mock.calls.length).toBe(0);
  done();
});

it("should return 403 if verification link is not correct", async done => {
  const { request, response, next, status, end } = getRequestReponse();
  request.body.emailVerificationLink = "some link";
  const findUser = jest.fn().mockResolvedValue(null);
  const updateUser = jest.fn();
  const setCookies = jest.fn();
  await verifyEmailRouteFactory(updateUser, setCookies, findUser)(
    request,
    response,
    next
  );
  expect(status.mock.calls.length).toBe(1);
  expect(end.mock.calls.length).toBe(1);
  expect(status.mock.calls[0][0]).toBe(403);
  expect(setCookies.mock.calls.length).toBe(0);
  done();
});

it("should update user and send correct response if link is correct", async done => {
  const { request, response, next, status, end } = getRequestReponse();
  const emailVerificationLink = "basta";
  request.body.emailVerificationLink = emailVerificationLink;
  const user = { emailVerificationLink, accessToken: "hamma" };
  const findUser = jest.fn().mockResolvedValue(user);
  const updateUser = jest.fn().mockResolvedValue({ result: { nModified: 1 } });
  const setCookies = jest.fn();
  await verifyEmailRouteFactory(updateUser, setCookies, findUser)(
    request,
    response,
    next
  );

  expect(status.mock.calls.length).toBe(1);
  expect(status.mock.calls[0][0]).toBe(200);
  expect(end.mock.calls.length).toBe(1);
  expect(setCookies.mock.calls.length).toBe(1);
  expect(setCookies.mock.calls[0][0]).toBe(response);
  expect(response.locals.user).toEqual(user);
  expect(updateUser.mock.calls.length).toBe(1);
  expect(updateUser.mock.calls[0][0]).toEqual({ emailVerificationLink });
  expect(updateUser.mock.calls[0][1]).toEqual({
    isEmailVerified: true,
    emailVerificationLink: ""
  });
  done();
});

it("should return 403 if update was unsuccessful", async done => {
  const { request, response, next, status, end } = getRequestReponse();
  request.body.emailVerificationLink = "some link";
  const user = {};
  const findUser = jest.fn().mockResolvedValue(user);
  const updateUser = jest.fn().mockResolvedValue({ result: { nModified: 0 } });
  const setCookies = jest.fn();
  await verifyEmailRouteFactory(updateUser, setCookies, findUser)(
    request,
    response,
    next
  );
  expect(status.mock.calls.length).toBe(1);
  expect(end.mock.calls.length).toBe(1);
  expect(status.mock.calls[0][0]).toBe(403);
  expect(setCookies.mock.calls.length).toBe(0);
  done();
});
