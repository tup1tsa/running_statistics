import { NextFunction, Request, Response } from "express";
import {
  FindUserByToken,
  findUserByToken
} from "../database/queries/findUserByToken";

type CheckAccess = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;
type CheckAccessFactory = (findUserByToken: FindUserByToken) => CheckAccess;

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

export const checkAccess: CheckAccess = (req, res, next) =>
  checkAccessFactory(findUserByToken)(req, res, next);
