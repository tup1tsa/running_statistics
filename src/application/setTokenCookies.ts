import { Response } from "express";

export type SetTokenCookies = (response: Response) => void;

interface User {
  readonly accessToken: string;
}

export const setTokenCookies: SetTokenCookies = ({ locals, cookie }) => {
  const user: User = locals.user;
  if (!user) {
    throw new Error("user should be set in locals already");
  }
  cookie("accessToken", user.accessToken, {
    maxAge: 30 * 24 * 60 * 60 * 1000
  });
};
