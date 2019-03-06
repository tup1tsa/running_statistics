import { RequestHandler } from "express";
import {
  MESSAGES,
  ValidateLoginInfo,
  validateLoginInfo
} from "running_app_core";
import { FindUserByPassword, findUserByPassword } from "../findUserByPassword";

type RegularLoginFactory = (
  validateLoginInfo: ValidateLoginInfo,
  findUserByPassword: FindUserByPassword
) => RequestHandler;

export const regularLoginFactory: RegularLoginFactory = (
  validateLoginInfoFunc,
  findUserByPasswordFunc
) => async (req, res) => {
  if (!validateLoginInfoFunc(req.body)) {
    res.status(403).end(MESSAGES.userInfoInvalid);
    return;
  }
  const user = await findUserByPasswordFunc(req.body.email, req.body.password);
  if (user == null) {
    res.status(403).end(MESSAGES.emailPasswordIncorrect);
    return;
  }
  res.cookie("accessToken", user.accessToken, {
    maxAge: 30 * 24 * 60 * 60 * 1000
  });
  res.status(200).end();
};

export const regularLogin: RequestHandler = (req, res, next) =>
  regularLoginFactory(validateLoginInfo, findUserByPassword)(req, res, next);
