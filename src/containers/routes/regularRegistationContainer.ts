import { Request, Response } from "express";
import { validateUserInfo } from "../../../client/src/application/common_files/validateUserInfo";
import { regularRegistration } from "../../application/routes/regularRegistation";
import { saveNewUserContainer } from "../database/queries/saveNewUserContainer";
import { hashUserInfoContainer } from "../hashUserInfoContainer";

type RegularRegistrationContainer = (
  req: Request,
  res: Response
) => Promise<void>;

export const regularRegistrationContainer: RegularRegistrationContainer = (
  req,
  res
) =>
  regularRegistration(
    req,
    res,
    validateUserInfo,
    hashUserInfoContainer,
    saveNewUserContainer
  );
