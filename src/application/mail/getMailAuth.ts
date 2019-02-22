import { ProcessEnv } from "mongo-wrappers";

interface MailAuth {
  readonly user: string;
  readonly pass: string;
}

type GetMailAuth = (proccessEnv: ProcessEnv) => MailAuth;

export const getMailAuth: GetMailAuth = processEnv => {
  const user = processEnv.gmailAccount;
  const pass = processEnv.gmailPassword;
  if (!user || !pass) {
    throw new Error("gmail password and account must be specified in .env");
  }
  return { user, pass };
};
