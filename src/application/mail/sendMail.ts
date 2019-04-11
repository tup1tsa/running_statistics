import { createTransport, Transporter } from "nodemailer";
import { GetMailAuth, getMailAuth, MailAuth } from "./getMailAuth";

interface TransportOptions {
  readonly auth: MailAuth;
  readonly service: string;
}

type CreateTransport = (transportOptions: TransportOptions) => Transporter;

export type SendMail = (
  title: string,
  text: string,
  email: string
) => Promise<object>;

type SendMailFactory = (
  getMailAuth: GetMailAuth,
  createTransport: CreateTransport
) => SendMail;

export const sendMailFactory: SendMailFactory = (
  getMailAuthFunc,
  createTransportFunc
) => async (title, text, email) => {
  const { user, pass } = getMailAuthFunc();
  const transport = createTransportFunc({
    service: "gmail",
    auth: { user, pass }
  });
  const mailOptions = {
    from: user,
    to: email,
    subject: title,
    html: text
  };
  return transport.sendMail(mailOptions);
};

export const sendMail: SendMail = sendMailFactory(getMailAuth, createTransport);
