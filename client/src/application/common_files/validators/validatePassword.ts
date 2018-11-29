export type ValidatePassword = (password: string) => boolean;

export const validatePassword: ValidatePassword = password =>
  password.length > 4 && password.length <= 128;
