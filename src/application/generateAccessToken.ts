import * as crypto from "crypto";

export type GenerateAccessToken = () => string;

export const generateAccessToken: GenerateAccessToken = () =>
  crypto.randomBytes(16).toString("hex");
