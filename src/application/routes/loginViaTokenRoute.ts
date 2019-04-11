import { RequestHandler } from "express";
import { TotalUserInfo } from "running_app_core";

type LoginViaTokenRouteFactory = () => RequestHandler;

export const loginViaTokenRouteFactory: LoginViaTokenRouteFactory = () => async (
  req,
  res,
  next
) => {
  const user: TotalUserInfo = res.locals.user;
  const nonPrivateFields = {
    name: user.name,
    email: user.email,
    isEmailVerified: user.isEmailVerified
  };
  res.status(200).send(nonPrivateFields);
};

const loginViaTokenRoute: RequestHandler = (req, res, next) =>
  loginViaTokenRouteFactory()(req, res, next);

export default loginViaTokenRoute;
