import Ajv from "ajv";
import { RegularLoginInfo } from "../interfaces";

export type ValidateLoginInfo = (
  loginInfo: unknown
) => loginInfo is RegularLoginInfo;

export const validateLoginInfo: ValidateLoginInfo = (
  loginInfo
): loginInfo is RegularLoginInfo => {
  const schema = {
    type: "object",
    properties: {
      email: { type: "string", maxLength: 128, format: "email" },
      password: { type: "string", minLength: 5, maxLength: 128 }
    },
    additionalProperties: false
  };
  const validator = new Ajv();
  validator.validate(schema, loginInfo);
  return validator.errors === null;
};
