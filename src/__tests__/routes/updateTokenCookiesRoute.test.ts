import { udpateTokenCookiesRouteFactory } from "../../application/routes/updateTokenCookiesRoute";
import { getRequestReponse } from "./registationRoute.test";

it("should create correct cookies", () => {
  const { request, next, response } = getRequestReponse();
  const setTokenCookies = jest.fn();
  udpateTokenCookiesRouteFactory(setTokenCookies)(request, response, next);
  expect(setTokenCookies.mock.calls.length).toBe(1);
  expect(setTokenCookies.mock.calls[0][0]).toBe(response);
  expect(next.mock.calls.length).toBe(1);
});
