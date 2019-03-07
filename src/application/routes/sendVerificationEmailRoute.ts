import { RequestHandler } from "express";
import { MESSAGES, TotalUserInfo } from "running_app_core";
import { UpdateUser, updateUser } from "../database/queries/updateUser";
import { GenerateUniqueHash, generateUniqueHash } from "../generateUniqueHash";
import { SendMail, sendMail } from "../mail/sendMail";

type SendVerificationEmailRouteFactory = (
  generateUniqueHash: GenerateUniqueHash,
  updateUser: UpdateUser,
  sendMail: SendMail
) => RequestHandler;

export const sendVerificationEmailRouteFactory: SendVerificationEmailRouteFactory = (
  generateUniqueHashFunc,
  updateUserFunc,
  sendMailFunc
) => async (req, res) => {
  try {
    const hash = await generateUniqueHashFunc();
    const user: TotalUserInfo = res.locals.user;
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
    // todo: here and in reset password flow get server url from heroku programmaticaly
    const mailBody = `
    <p>In order to verificate your email, click 
      <a href='https://tup1tsa.herokuapp.com/verifyEmail/${hash}'>here</a>
    </p>`;
    await sendMailFunc("Running app email verification", mailBody, user.email);
  } catch (err) {
    res.status(500).end(MESSAGES.unexpectectedError);
    return;
  }
  res.status(200).end();
};

const sendVerificationEmailRoute: RequestHandler = (req, res, next) =>
  sendVerificationEmailRouteFactory(generateUniqueHash, updateUser, sendMail)(
    req,
    res,
    next
  );

export default sendVerificationEmailRoute;
