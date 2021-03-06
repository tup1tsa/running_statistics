import { RequestHandler } from "express";
import {
  HashedUserInfo,
  MESSAGES,
  ValidateRegistrationInfo,
  validateRegistrationInfo
} from "running_app_core";
import { saveNewUser, SaveNewUser } from "../database/queries/saveNewUser";
import { HashUserInfo, hashUserInfo } from "../hashUserInfo";

type RegistrationRouteFactory = (
  validateUserInfo: ValidateRegistrationInfo,
  hashUserInfo: HashUserInfo,
  saveNewUser: SaveNewUser
) => RequestHandler;

export const registrationRouteFactory: RegistrationRouteFactory = (
  validateRegistrationInfoFunc,
  hashUserInfoFunc,
  saveNewUserFunc
) => async (req, res, next) => {
  if (!validateRegistrationInfoFunc(req.body)) {
    res.status(403).end("email, name or password are not valid");
    return;
  }
  let hashedInfo: HashedUserInfo;
  try {
    hashedInfo = await hashUserInfoFunc(req.body);
  } catch (e) {
    res.status(500).end(JSON.stringify(MESSAGES.unexpectectedError));
    return;
  }
  try {
    const { result, ops } = await saveNewUserFunc(hashedInfo);
    if (result.ok !== 1) {
      throw new Error("something went wrong");
    }
    res.locals.user = ops[0];
  } catch (e) {
    res.status(409).end(JSON.stringify(MESSAGES.userAlreadyExists));
    return;
  }
  next();
};

const registrationRoute: RequestHandler = (req, res, next) =>
  registrationRouteFactory(validateRegistrationInfo, hashUserInfo, saveNewUser)(
    req,
    res,
    next
  );

export default registrationRoute;
