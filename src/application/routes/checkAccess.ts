import { RequestHandler } from "express";
import {
  FindUserByToken,
  findUserByToken
} from "../database/queries/findUserByToken";
import { SetTokenCookies, setTokenCookies } from "../setTokenCookies";

type CheckAccessFactory = (
  findUserByToken: FindUserByToken,
  setTokenCookies: SetTokenCookies
) => RequestHandler;

export const checkAccessFactory: CheckAccessFactory = (
  findUserByTokenFunc,
  setTokenCookiesFunc
) => async (req, res, next) => {
  const { accessToken } = req.cookies;
  const user = await findUserByTokenFunc(accessToken);
  if (user === null) {
    res.status(403).end();
    return;
  }
  res.locals.user = user;
  setTokenCookiesFunc(res);
  next();
};

export const checkAccess: RequestHandler = (req, res, next) =>
  checkAccessFactory(findUserByToken, setTokenCookies)(req, res, next);
