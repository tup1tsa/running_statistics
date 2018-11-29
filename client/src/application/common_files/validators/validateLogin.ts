export type ValidateLogin = (login: string) => boolean;

export const validateLogin: ValidateLogin = login =>
  login.length > 1 && login.length <= 128;
