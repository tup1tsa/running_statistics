import { Response } from "express";

export type SetTokenCookies = (response: Response) => void;

interface User {
  readonly accessToken: string;
}

export const setTokenCookies: SetTokenCookies = response => {
  const user: User = response.locals.user;
  if (!user) {
    throw new Error("user should be set in locals already");
  }
  const cookie = response.cookie.bind(response);
  cookie("accessToken", user.accessToken, {
    maxAge: 30 * 24 * 60 * 60 * 1000
  });
};
