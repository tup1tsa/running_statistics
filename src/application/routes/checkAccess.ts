import { RequestHandler } from "express";
import {
  FindUserByToken,
  findUserByToken
} from "../database/queries/findUserByToken";

type CheckAccessFactory = (findUserByToken: FindUserByToken) => RequestHandler;

export const checkAccessFactory: CheckAccessFactory = findUserByTokenFunc => async (
  req,
  res,
  next
) => {
  const { accessToken } = req.cookies;
  const user = await findUserByTokenFunc(accessToken);
  if (user === null) {
    res.status(403).end();
    return;
  }
  res.locals.user = user;
  res.cookie("accessToken", accessToken, {
    maxAge: 30 * 24 * 60 * 60 * 1000
  });
  next();
};

export const checkAccess: RequestHandler = (req, res, next) =>
  checkAccessFactory(findUserByToken)(req, res, next);
