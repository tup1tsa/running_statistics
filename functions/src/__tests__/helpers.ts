import { Request, Response } from "express";

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
