import { checkAccessFactory } from "../../application/routes/checkAccess";
import { getRequestReponse } from "./registationRoute.test";

it("should stop processing request if user token is invalid", async done => {
  const { request, response, end, status, next } = getRequestReponse();
  request.cookies.accessToken = "bad-token";
  const findUserByToken = jest.fn().mockResolvedValue(null);
  await checkAccessFactory(findUserByToken, jest.fn())(request, response, next);

  expect(findUserByToken.mock.calls.length).toBe(1);
  expect(status.mock.calls.length).toBe(1);
  expect(end.mock.calls.length).toBe(1);

  expect(findUserByToken.mock.calls[0][0]).toBe("bad-token");
  expect(status.mock.calls[0][0]).toBe(403);
  expect(end.mock.calls[0][0]).toBe(undefined);
  expect(next.mock.calls.length).toBe(0);
  done();
});

it("should store user in locals object", async done => {
  const { request, response, next } = getRequestReponse();
  const user = { _id: "2352", name: "hasta" };
  const findUserByToken = jest.fn().mockResolvedValue(user);
  await checkAccessFactory(findUserByToken, jest.fn())(request, response, next);
  expect(response.locals.user).toEqual(user);
  expect(next.mock.calls.length).toBe(1);
  done();
});

it("should update token cookie on success", async done => {
  const { request, response, next } = getRequestReponse();
  const accessToken = "some token";
  request.cookies.accessToken = accessToken;
  const user = { _id: "2352", name: "hasta", accessToken: "new token" };
  const findUserByToken = jest.fn().mockResolvedValue(user);
  const setTokenCookies = jest.fn();
  await checkAccessFactory(findUserByToken, setTokenCookies)(
    request,
    response,
    next
  );
  expect(setTokenCookies.mock.calls.length).toBe(1);
  expect(setTokenCookies.mock.calls[0][0]).toBe(response);
  done();
});
