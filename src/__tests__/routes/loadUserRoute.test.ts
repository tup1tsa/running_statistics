import { loadUserRouteFactory } from "../../application/routes/loadUserRoute";
import { getRequestReponse } from "./registationRoute.test";

it("should return 403 if token is not provided via cookie", async done => {
  const { request, response, next, status, end } = getRequestReponse();
  const findUserByToken = jest.fn();
  await loadUserRouteFactory(findUserByToken)(request, response, next);

  expect(findUserByToken.mock.calls.length).toBe(0);
  expect(status.mock.calls.length).toBe(1);
  expect(end.mock.calls.length).toBe(1);
  expect(status.mock.calls[0][0]).toBe(403);
  done();
});

it("should return 403 if token is not correct", async done => {
  const { request, response, next, status, end } = getRequestReponse();
  const findUserByToken = jest.fn().mockResolvedValue(null);
  request.cookies.accessToken = "some";
  await loadUserRouteFactory(findUserByToken)(request, response, next);

  expect(findUserByToken.mock.calls.length).toBe(1);
  expect(status.mock.calls.length).toBe(1);
  expect(end.mock.calls.length).toBe(1);
  expect(status.mock.calls[0][0]).toBe(403);
  done();
});

it("should store user in locals object", async done => {
  const { request, response, next } = getRequestReponse();
  request.cookies.accessToken = "any";
  const user = { _id: "some", name: "bama" };
  const findUserByToken = jest.fn().mockResolvedValue(user);
  await loadUserRouteFactory(findUserByToken)(request, response, next);
  expect(next.mock.calls.length).toBe(1);
  expect(response.locals.user).toEqual(user);
  done();
});
