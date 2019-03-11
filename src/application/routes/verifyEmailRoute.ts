import { RequestHandler } from "express";
import { UpdateUser, updateUser } from "../database/queries/updateUser";
import { SetTokenCookies, setTokenCookies } from "../setTokenCookies";

type VerifyEmailRouteFactory = (
  updateUser: UpdateUser,
  setTokenCookies: SetTokenCookies
) => RequestHandler;

export const verifyEmailRouteFactory: VerifyEmailRouteFactory = (
  updateUserFunc,
  setTokenCookiesFunc
) => async (req, res) => {
  res.status(200).end();
};

const verifyEmailRoute: RequestHandler = (req, res, next) =>
  verifyEmailRouteFactory(updateUser, setTokenCookies)(req, res, next);

export default verifyEmailRoute;
