import { checkAccessFactory } from "../../application/routes/checkAccess";
import { getRequestReponse } from "./regularRegistation.test";

it("should stop processing request if user token is invalid", async done => {
  const { request, response, end, status } = getRequestReponse();
  request.cookies.accessToken = "bad-token";
  const findUserByToken = jest.fn().mockResolvedValue(null);
  await checkAccessFactory(findUserByToken)(request, response);

  expect(findUserByToken.mock.calls.length).toBe(1);
  expect(status.mock.calls.length).toBe(1);
  expect(end.mock.calls.length).toBe(1);

  expect(findUserByToken.mock.calls[0][0]).toBe("bad-token");
  expect(status.mock.calls[0][0]).toBe(403);
  expect(end.mock.calls[0][0]).toBe(undefined);
  done();
});

it("should store user id in locals object", async done => {
  const { request, response } = getRequestReponse();
  const user = { _id: "2352", name: "hasta" };
  const findUserByToken = jest.fn().mockResolvedValue(user);
  await checkAccessFactory(findUserByToken)(request, response);
  expect(response.locals).toEqual({ userId: "2352" });
  done();
});
