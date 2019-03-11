import { RequestHandler } from "express";
import {
  FindUserByToken,
  findUserByToken
} from "../database/queries/findUserByToken";

type LoadUserRouteFactory = (
  findUserByToken: FindUserByToken
) => RequestHandler;

export const loadUserRouteFactory: LoadUserRouteFactory = findUserByTokenFunc => async (
  req,
  res,
  next
) => {
  const { accessToken } = req.cookies;
  if (!accessToken) {
    res.status(403).end();
    return;
  }
  const user = await findUserByTokenFunc(accessToken);
  if (user === null) {
    res.status(403).end();
    return;
  }
  res.locals.user = user;
  next();
};

const loadUserRoute: RequestHandler = (req, res, next) =>
  loadUserRouteFactory(findUserByToken)(req, res, next);

export default loadUserRoute;
