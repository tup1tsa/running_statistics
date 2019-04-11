import { RequestHandler } from "express";
import { ProcessEnv } from "mongo-wrappers";
import { MESSAGES, TotalUserInfo } from "running_app_core";
import { UpdateUser, updateUser } from "../database/queries/updateUser";
import { GenerateUniqueHash, generateUniqueHash } from "../generateUniqueHash";
import { SendMail, sendMail } from "../mail/sendMail";

type SendVerificationEmailRouteFactory = (
  generateUniqueHash: GenerateUniqueHash,
  updateUser: UpdateUser,
  sendMail: SendMail,
  processEnv: ProcessEnv
) => RequestHandler;

export const sendVerificationEmailRouteFactory: SendVerificationEmailRouteFactory = (
  generateUniqueHashFunc,
  updateUserFunc,
  sendMailFunc,
  processEnv
) => async (req, res) => {
  const user: TotalUserInfo = res.locals.user;
  try {
    const hash = await generateUniqueHashFunc();
    if (!user._id) {
      throw new Error("user id is not defined");
      // should not happen
      // it is placed here to satisfy ts
      // (_id can be undefined, but it should not be so after registration)
    }
    const updateResult = await updateUserFunc(
      { _id: user._id },
      {
        emailVerificationLink: hash
      }
    );
    if (updateResult.result.ok !== 1) {
      throw new Error("update has failed");
    }
    const siteUrl =
      processEnv.NODE_ENV === "production"
        ? "https://tup1tsa.herokuapp.com"
        : "http://localhost:3000";
    const mailBody = `
    <p>In order to verificate your email, click 
      <a href='${siteUrl}/verifyEmail/${hash}'>here</a>
    </p>`;
    await sendMailFunc("Running app email verification", mailBody, user.email);
  } catch (err) {
    res.status(500).end(MESSAGES.unexpectectedError);
    return;
  }
  res.status(200).end(`Verification instructions were send to ${user.email}`);
};

const sendVerificationEmailRoute: RequestHandler = (req, res, next) =>
  sendVerificationEmailRouteFactory(
    generateUniqueHash,
    updateUser,
    sendMail,
    process.env
  )(req, res, next);

export default sendVerificationEmailRoute;
