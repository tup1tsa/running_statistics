import { MESSAGES } from "running_app_core";
import { sendVerificationEmailRouteFactory } from "../../application/routes/sendVerificationEmailRoute";
import { getRequestReponse } from "./registationRoute.test";

const generateUniqueHashMock = jest.fn().mockResolvedValue("");
const updateUserMock = jest.fn().mockResolvedValue({ result: { ok: 1 } });
const sendMailMock = jest.fn().mockResolvedValue({});

it("if any of the functions throws, it should send unexpected error ", async done => {
  const { request, response, next, end, status } = getRequestReponse();
  const failedEmail = jest.fn().mockRejectedValue(new Error("does not matter"));
  await sendVerificationEmailRouteFactory(
    generateUniqueHashMock,
    updateUserMock,
    failedEmail
  )(request, response, next);
  expect(status.mock.calls.length).toBe(1);
  expect(status.mock.calls[0][0]).toBe(500);
  expect(end.mock.calls.length).toBe(1);
  expect(end.mock.calls[0][0]).toBe(MESSAGES.unexpectectedError);
  done();
});

it("should send 200 if everything is fine", async done => {
  const { request, response, next, end, status } = getRequestReponse();
  response.locals = { user: { _id: "id" } };
  await sendVerificationEmailRouteFactory(
    generateUniqueHashMock,
    updateUserMock,
    sendMailMock
  )(request, response, next);
  expect(status.mock.calls.length).toBe(1);
  expect(status.mock.calls[0][0]).toBe(200);
  expect(end.mock.calls.length).toBe(1);
  done();
});

it("should send 500 unexpected error if update user failed", async done => {
  const { request, response, next, end, status } = getRequestReponse();
  response.locals = { user: { _id: "id" } };
  const updateUser = jest.fn().mockResolvedValue({ result: { ok: 0 } });
  await sendVerificationEmailRouteFactory(
    generateUniqueHashMock,
    updateUser,
    sendMailMock
  )(request, response, next);
  expect(status.mock.calls.length).toBe(1);
  expect(status.mock.calls[0][0]).toBe(500);
  expect(end.mock.calls.length).toBe(1);
  expect(end.mock.calls[0][0]).toBe(MESSAGES.unexpectectedError);
  done();
});

it("verification flow should be correct", async done => {
  const { request, response, next } = getRequestReponse();
  const uniqueHash = "abba21";
  const user = { _id: "somma", email: "any@gmail.com" };
  response.locals.user = user;
  const generateUniqueHash = jest.fn().mockResolvedValue(uniqueHash);
  const updateUser = jest.fn().mockResolvedValue({ result: { ok: 1 } });
  const sendMail = jest.fn().mockResolvedValue({});
  await sendVerificationEmailRouteFactory(
    generateUniqueHash,
    updateUser,
    sendMail
  )(request, response, next);
  expect(generateUniqueHash.mock.calls.length).toBe(1);
  expect(updateUser.mock.calls.length).toBe(1);
  expect(updateUser.mock.calls[0][0]).toEqual(user._id);
  expect(updateUser.mock.calls[0][1]).toEqual({
    emailVerificationLink: uniqueHash
  });
  expect(sendMail.mock.calls.length).toBe(1);
  expect(sendMail.mock.calls[0][0]).toEqual("Running app email verification");
  expect(sendMail.mock.calls[0][1]).toMatch(
    `https://tup1tsa.herokuapp.com/verifyEmail/${uniqueHash}`
  );
  expect(sendMail.mock.calls[0][2]).toEqual(user.email);
  done();
});
