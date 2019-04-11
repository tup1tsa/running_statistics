import { RequestHandler } from "express";
import { FindUser, findUser } from "../database/queries/findUser";
import { UpdateUser, updateUser } from "../database/queries/updateUser";
import { SetTokenCookies, setTokenCookies } from "../setTokenCookies";

type VerifyEmailRouteFactory = (
  updateUser: UpdateUser,
  setTokenCookies: SetTokenCookies,
  findUser: FindUser
) => RequestHandler;

export const verifyEmailRouteFactory: VerifyEmailRouteFactory = (
  updateUserFunc,
  setTokenCookiesFunc,
  findUserFunc
) => async (req, res) => {
  const emailVerificationLink: string | undefined =
    req.body.emailVerificationLink;
  if (!emailVerificationLink) {
    return res.status(403).end();
  }
  const user = await findUserFunc({ emailVerificationLink });
  if (!user) {
    return res.status(403).end("verification link is invalid");
  }
  res.locals.user = user;
  const { result } = await updateUserFunc(
    { emailVerificationLink },
    { isEmailVerified: true, emailVerificationLink: "" }
  );
  if (result.nModified === 0) {
    return res.status(403).end("verification link is invalid");
  }
  setTokenCookiesFunc(res);
  res.status(200).end();
};

const verifyEmailRoute: RequestHandler = (req, res, next) =>
  verifyEmailRouteFactory(updateUser, setTokenCookies, findUser)(
    req,
    res,
    next
  );

export default verifyEmailRoute;
