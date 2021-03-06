import { MESSAGES } from "running_app_core";
import { sendVerificationEmailRouteFactory } from "../../application/routes/sendVerificationEmailRoute";
import { getRequestReponse } from "./registationRoute.test";

const generateUniqueHashMock = jest.fn().mockResolvedValue("");
const updateUserMock = jest.fn().mockResolvedValue({ result: { ok: 1 } });
const sendMailMock = jest.fn().mockResolvedValue({});

it("should notify if email sending has failed", async done => {
  const { request, response, next, end, status } = getRequestReponse();
  response.locals.user = { _id: "some id" };
  const failedEmail = jest.fn().mockRejectedValue(new Error("does not matter"));
  await sendVerificationEmailRouteFactory(
    generateUniqueHashMock,
    updateUserMock,
    failedEmail,
    {}
  )(request, response, next);
  expect(status.mock.calls.length).toBe(1);
  expect(status.mock.calls[0][0]).toBe(500);
  expect(end.mock.calls.length).toBe(1);
  expect(end.mock.calls[0][0]).toBe(
    "Provided email is possibly incorrect. Verification link was not send"
  );
  done();
});

it("should send 200 and set cookies if everything is fine", async done => {
  const { request, response, next, end, status } = getRequestReponse();
  const accessToken = "bast";
  const user = { _id: "some id", accessToken, email: "gimma@gmail.com" };
  response.locals.user = user;
  await sendVerificationEmailRouteFactory(
    generateUniqueHashMock,
    updateUserMock,
    sendMailMock,
    {}
  )(request, response, next);
  expect(status.mock.calls.length).toBe(1);
  expect(status.mock.calls[0][0]).toBe(200);
  expect(end.mock.calls.length).toBe(1);
  expect(end.mock.calls[0][0]).toBe(
    "Verification instructions were send to gimma@gmail.com"
  );
  expect(response.locals.user).toEqual(user);
  done();
});

it("should send 500 unexpected error if update user failed", async done => {
  const { request, response, next, end, status } = getRequestReponse();
  response.locals = { user: { _id: "id" } };
  const updateUser = jest.fn().mockResolvedValue({ result: { ok: 0 } });
  await sendVerificationEmailRouteFactory(
    generateUniqueHashMock,
    updateUser,
    sendMailMock,
    {}
  )(request, response, next);
  expect(status.mock.calls.length).toBe(1);
  expect(status.mock.calls[0][0]).toBe(500);
  expect(end.mock.calls.length).toBe(1);
  expect(end.mock.calls[0][0]).toBe(MESSAGES.unexpectectedError);
  done();
});

it("should send 500 unexpected error if generate hash function throws", async done => {
  const { request, response, next, end, status } = getRequestReponse();
  response.locals = { user: { _id: "id" } };
  const generateUniquieHash = jest.fn().mockRejectedValue("any");
  await sendVerificationEmailRouteFactory(
    generateUniquieHash,
    updateUserMock,
    sendMailMock,
    {}
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
  const processEnv = { NODE_ENV: "production" };
  await sendVerificationEmailRouteFactory(
    generateUniqueHash,
    updateUser,
    sendMail,
    processEnv
  )(request, response, next);
  expect(generateUniqueHash.mock.calls.length).toBe(1);
  expect(updateUser.mock.calls.length).toBe(1);
  expect(updateUser.mock.calls[0][0]).toEqual({ _id: user._id });
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

it("should send link in email to localhost on non-production server", async done => {
  const { request, response, next } = getRequestReponse();
  const user = { _id: "somma", email: "any@gmail.com" };
  response.locals.user = user;
  const uniqueHash = "4526";
  const generateUniqueHash = jest.fn().mockResolvedValue(uniqueHash);
  const sendMail = jest.fn().mockResolvedValue({});
  const processEnv = {};
  await sendVerificationEmailRouteFactory(
    generateUniqueHash,
    updateUserMock,
    sendMail,
    processEnv
  )(request, response, next);
  expect(sendMail.mock.calls.length).toBe(1);
  expect(sendMail.mock.calls[0][0]).toEqual("Running app email verification");
  expect(sendMail.mock.calls[0][1]).toMatch(
    `http://localhost:3000/verifyEmail/${uniqueHash}`
  );
  expect(sendMail.mock.calls[0][2]).toEqual(user.email);
  done();
});
