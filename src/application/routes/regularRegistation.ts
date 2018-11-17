import { Request, Response } from "express";
import { MESSAGES } from "../../../client/src/application/common_files/config";
import { ValidateUserInfo } from "../../../client/src/application/common_files/validateUserInfo";
import { SaveNewUserContainer } from "../../containers/database/queries/saveNewUserContainer";
import { HashUserInfoContainer } from "../../containers/hashUserInfoContainer";
import { UserInfoHashed } from "../database/queries/saveNewUser";

type RegularRegistration = (
  req: Request,
  res: Response,
  validateUserInfo: ValidateUserInfo,
  hashUserInfo: HashUserInfoContainer,
  saveNewUser: SaveNewUserContainer
) => Promise<void>;

export const regularRegistration: RegularRegistration = async (
  req,
  res,
  validateUserInfo,
  hashUserInfo,
  saveNewUser
) => {
  const userInfo = {
    name: req.body.name,
    password: req.body.password,
    email: req.body.email
  };
  if (!validateUserInfo(userInfo)) {
    res.status(403).end(JSON.stringify(MESSAGES[5]));
    return;
  }
  let hashedInfo: UserInfoHashed;
  try {
    hashedInfo = await hashUserInfo(userInfo);
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
