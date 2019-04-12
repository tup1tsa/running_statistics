import { ClientResponse } from "@sendgrid/client/src/response";
import { MailData } from "@sendgrid/helpers/classes/mail";
import * as sgMail from "@sendgrid/mail";
import { ProcessEnv } from "mongo-wrappers";

interface MailService {
  setApiKey: (key: string) => void;
  send: (data: MailData) => Promise<[ClientResponse, {}]>;
}

export type SendMail = (
  title: string,
  text: string,
  email: string
) => Promise<[ClientResponse, {}]>;

type SendMailFactory = (
  processEnv: ProcessEnv,
  mailService: MailService
) => SendMail;

export const sendMailFactory: SendMailFactory = (
  processEnv,
  mailService
) => async (title, text, email) => {
  const key = processEnv.SEND_GRID_API_KEY;
  if (!key) {
    throw new Error("send grid api key is not defined");
  }
  mailService.setApiKey(key);
  return mailService.send({
    to: email,
    from: "natorvano@gmail.com",
    subject: title,
    html: text
  });
};

export const sendMail: SendMail = sendMailFactory(process.env, sgMail);
