import { RequestHandler } from "express";
import { ValidateLoginInfo, validateLoginInfo } from "running_app_core";
import { FindUserByPassword, findUserByPassword } from "../findUserByPassword";
import { SetTokenCookies, setTokenCookies } from "../setTokenCookies";

type loginRouteFactory = (
  validateLoginInfo: ValidateLoginInfo,
  findUserByPassword: FindUserByPassword,
  setTokenCookies: SetTokenCookies
) => RequestHandler;

export const loginRouteFactory: loginRouteFactory = (
  validateLoginInfoFunc,
  findUserByPasswordFunc,
  setTokenCookiesFunc
) => async (req, res) => {
  if (!validateLoginInfoFunc(req.body)) {
    res.status(403).end("email or password is not valid");
    return;
  }
  const user = await findUserByPasswordFunc(req.body.email, req.body.password);
  if (user == null) {
    res.status(403).end("Email or password are incorrect");
    return;
  }
  res.locals.user = user;
  setTokenCookiesFunc(res);
  res.status(200).end();
};

const loginRoute: RequestHandler = (req, res, next) =>
  loginRouteFactory(validateLoginInfo, findUserByPassword, setTokenCookies)(
    req,
    res,
    next
  );

export default loginRoute;
