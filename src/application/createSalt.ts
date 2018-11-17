import * as crypto from "crypto";

export type CreateSalt = () => string;

export const createSalt: CreateSalt = () =>
  crypto.randomBytes(64).toString("hex");
