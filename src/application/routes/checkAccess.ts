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
  const user = await findUserByTokenFunc(req.cookies.accessToken);
  if (user === null) {
    res.status(403).end();
    return;
  }
  res.locals.userId = user._id;
  next();
};

export const checkAccess: RequestHandler = (req, res, next) =>
  checkAccessFactory(findUserByToken)(req, res, next);
