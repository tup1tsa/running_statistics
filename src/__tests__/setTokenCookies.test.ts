import { setTokenCookies } from "../application/setTokenCookies";
import { getRequestReponse } from "./routes/registationRoute.test";

it("should create correct cookies", () => {
  const { response, cookie } = getRequestReponse();
  const accessToken = "some token";
  const user = { name: "masha", accessToken };
  response.locals.user = user;
  setTokenCookies(response);
  expect(cookie.mock.calls.length).toBe(1);
  expect(cookie.mock.calls[0][0]).toBe("accessToken");
  expect(cookie.mock.calls[0][1]).toBe(accessToken);
  expect(cookie.mock.calls[0][2]).toEqual({ maxAge: 30 * 24 * 60 * 60 * 1000 });
});

it("should throw if user is not set in res.locals", () => {
  const { response } = getRequestReponse();
  expect(() => setTokenCookies(response)).toThrow();
});
