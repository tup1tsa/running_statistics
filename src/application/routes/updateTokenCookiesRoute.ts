import { RequestHandler } from "express";
import { SetTokenCookies, setTokenCookies } from "../setTokenCookies";

type UpdateTokenCookiesRouteFactory = (
  setTokenCookies: SetTokenCookies
) => RequestHandler;

export const udpateTokenCookiesRouteFactory: UpdateTokenCookiesRouteFactory = setTokenCookiesFunc => (
  req,
  res,
  next
) => {
  setTokenCookiesFunc(res);
  next();
};

const updateTokenCookiesRoute: RequestHandler = (req, res, next) =>
  udpateTokenCookiesRouteFactory(setTokenCookies)(req, res, next);

export default updateTokenCookiesRoute;
