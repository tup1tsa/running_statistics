import { Request, Response } from "express";
import checkAccess from "../../application/routes/checkAccess";

export const getRequestReponse = () => {
  const request = {} as Request;
  const response = {} as Response;
  const end = jest.fn();
  const send = jest.fn();
  const cookie = jest.fn();
  const status = jest.fn().mockReturnValue(response);
  const next = jest.fn();

  request.cookies = {};
  request.body = {};
  response.locals = {};

  response.end = end;
  response.send = send;
  response.cookie = cookie;
  response.status = status;

  return {
    send,
    request,
    response,
    end,
    cookie,
    status,
    next
  };
};

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
