import { RequestHandler } from "express";
import { FindUser, findUser } from "../database/queries/findUser";

type LoadUserRouteFactory = (findUser: FindUser) => RequestHandler;

export const loadUserRouteFactory: LoadUserRouteFactory = findUserFunc => async (
  req,
  res,
  next
) => {
  const accessToken: string | undefined = req.cookies.accessToken;
  if (!accessToken) {
    res.status(403).end();
    return;
  }
  const user = await findUserFunc({ accessToken });
  if (user === null) {
    res.status(403).end();
    return;
  }
  res.locals.user = user;
  next();
};

const loadUserRoute: RequestHandler = (req, res, next) =>
  loadUserRouteFactory(findUser)(req, res, next);

export default loadUserRoute;
