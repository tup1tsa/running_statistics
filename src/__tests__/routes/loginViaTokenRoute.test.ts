import { TotalUserInfo } from "running_app_core";
import { loginViaTokenRouteFactory } from "../../application/routes/loginViaTokenRoute";
import { getRequestReponse } from "./registationRoute.test";

it("should send non private user data", async done => {
  const { request, response, next, send, status } = getRequestReponse();
  const user: TotalUserInfo = {
    name: "meema",
    email: "sbom@gmail.com",
    passwordHash: "any",
    passwordResetLink: "any",
    isEmailVerified: true,
    emailVerificationLink: "any",
    salt: "any",
    accessToken: "any"
  };
  response.locals.user = user;
  await loginViaTokenRouteFactory()(request, response, next);
  expect(send.mock.calls.length).toBe(1);
  expect(send.mock.calls[0][0]).toEqual({
    name: user.name,
    email: user.email,
    isEmailVerified: user.isEmailVerified
  });
  expect(status.mock.calls.length).toBe(1);
  expect(status.mock.calls[0][0]).toBe(200);
  done();
});
