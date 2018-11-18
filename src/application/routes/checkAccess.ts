import { Request, Response } from "express";
import {
  FindUserByToken,
  findUserByToken
} from "../database/queries/findUserByToken";

type CheckAccess = (req: Request, res: Response) => Promise<void>;
type CheckAccessFactory = (findUserByToken: FindUserByToken) => CheckAccess;

export const checkAccessFactory: CheckAccessFactory = findUserByTokenFunc => async (
  req,
  res
) => {
  const user = await findUserByTokenFunc(req.cookies.accessToken);
  if (user === null) {
    res.status(403).end();
    return;
  }
  res.locals.userId = user._id;
};

export const checkAccess: CheckAccess = (req, res) =>
  checkAccessFactory(findUserByToken)(req, res);
