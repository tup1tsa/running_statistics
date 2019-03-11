import { RequestHandler } from "express";
import { TotalUserInfo } from "running_app_core";

const checkAccess: RequestHandler = (req, res, next) => {
  const user: TotalUserInfo = res.locals.user;
  if (!user.isEmailVerified) {
    res.status(403).end();
    return;
  }
  next();
};

export default checkAccess;
