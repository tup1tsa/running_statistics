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
    res.status(403).end("access token should be present in cookies");
    return;
  }
  const user = await findUserFunc({ accessToken });
  if (user === null) {
    res.status(403).end("access token is invalid");
    return;
  }
  res.locals.user = user;
  next();
};

const loadUserRoute: RequestHandler = (req, res, next) =>
  loadUserRouteFactory(findUser)(req, res, next);

export default loadUserRoute;
