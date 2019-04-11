import { ProcessEnv } from "mongo-wrappers";

export interface MailAuth {
  readonly user: string;
  readonly pass: string;
}

export type GetMailAuth = () => MailAuth;
type GetMailAuthFactory = (proccessEnv: ProcessEnv) => GetMailAuth;

export const getMailAuthFactory: GetMailAuthFactory = processEnv => () => {
  const user = processEnv.gmailAccount;
  const pass = processEnv.gmailPassword;
  if (!user || !pass) {
    throw new Error("gmail password and account must be specified in .env");
  }
  // tslint:disable-next-line
  console.log(`user is ${user}  and pass is ${pass}`);
  return { user, pass };
};

export const getMailAuth: GetMailAuth = getMailAuthFactory(process.env);
