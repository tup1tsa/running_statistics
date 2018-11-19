import { RequestHandler } from "express";
import { MESSAGES } from "../../../client/src/application/common_files/config";
import {
  ValidateUserInfo,
  validateUserInfo
} from "../../../client/src/application/common_files/validators/validateUserInfo";
import { SaveNewUser, UserInfoHashed } from "../database/queries/saveNewUser";
import { HashUserInfo, hashUserInfo } from "../hashUserInfo";

type RegularRegistrationFactory = (
  validateUserInfo: ValidateUserInfo,
  hashUserInfo: HashUserInfo,
  saveNewUser: SaveNewUser
) => RequestHandler;

export const regularRegistrationFactory: RegularRegistrationFactory = (
  validateUserInfoFunc,
  hashUserInfoFunc,
  saveNewUser
) => async (req, res) => {
  if (!validateUserInfoFunc(req.body)) {
    res.status(403).end(JSON.stringify(MESSAGES[5]));
    return;
  }
  let hashedInfo: UserInfoHashed;
  try {
    hashedInfo = await hashUserInfoFunc(req.body);
  } catch (e) {
    res.status(500).end(JSON.stringify(MESSAGES[0]));
    return;
  }
  try {
    await saveNewUser(hashedInfo);
  } catch (e) {
    res.status(409).end(JSON.stringify(MESSAGES[6]));
    return;
  }
  res.cookie("accessToken", hashedInfo.accessToken, {
    maxAge: 30 * 24 * 60 * 60 * 1000
  });
  res.status(200).end();
};

export const regularRegistration: RequestHandler = (req, res, next) =>
  regularRegistrationFactory(validateUserInfo, hashUserInfo, SaveNewUser)(
    req,
    res,
    next
  );
