import { RequestHandler } from "express";
import { MESSAGES, ValidateUserInfo, validateUserInfo } from "running_app_core";
import {
  saveNewUser,
  SaveNewUser,
  UserInfoHashed
} from "../database/queries/saveNewUser";
import { HashUserInfo, hashUserInfo } from "../hashUserInfo";

type registrationRouteFactory = (
  validateUserInfo: ValidateUserInfo,
  hashUserInfo: HashUserInfo,
  saveNewUser: SaveNewUser
) => RequestHandler;

export const registrationRouteFactory: registrationRouteFactory = (
  validateUserInfoFunc,
  hashUserInfoFunc,
  saveNewUserFunc
) => async (req, res) => {
  if (!validateUserInfoFunc(req.body)) {
    res.status(403).end(JSON.stringify(MESSAGES.userInfoInvalid));
    return;
  }
  let hashedInfo: UserInfoHashed;
  try {
    hashedInfo = await hashUserInfoFunc(req.body);
  } catch (e) {
    res.status(500).end(JSON.stringify(MESSAGES.unexpectectedError));
    return;
  }
  try {
    await saveNewUserFunc(hashedInfo);
  } catch (e) {
    res.status(409).end(JSON.stringify(MESSAGES.userAlreadyExists));
    return;
  }
  res.cookie("accessToken", hashedInfo.accessToken, {
    maxAge: 30 * 24 * 60 * 60 * 1000
  });
  res.status(200).end();
};

export const registrationRoute: RequestHandler = (req, res, next) =>
  registrationRouteFactory(validateUserInfo, hashUserInfo, saveNewUser)(
    req,
    res,
    next
  );
