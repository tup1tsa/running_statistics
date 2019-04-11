import checkAccess from "../../application/routes/checkAccess";
import { getRequestReponse } from "./registationRoute.test";

it("should reject request if user email is not verified", () => {
  const { request, response, next, status, end } = getRequestReponse();
  response.locals.user = { isEmailVerified: false };
  checkAccess(request, response, next);
  expect(status.mock.calls.length).toBe(1);
  expect(end.mock.calls.length).toBe(1);
  expect(next.mock.calls.length).toBe(0);
  expect(status.mock.calls[0][0]).toBe(403);
});

it("should call next if user email is verified", () => {
  const { request, response, next } = getRequestReponse();
  response.locals.user = { isEmailVerified: true };
  checkAccess(request, response, next);
  expect(next.mock.calls.length).toBe(1);
});
