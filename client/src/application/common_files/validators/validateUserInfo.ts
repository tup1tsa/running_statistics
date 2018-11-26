import Ajv from "ajv";
import { RegularRegistrationInfo } from "../interfaces";

export type ValidateUserInfo = (
  userInfo: unknown
) => userInfo is RegularRegistrationInfo;

export const validateUserInfo: ValidateUserInfo = (
  userInfo
): userInfo is RegularRegistrationInfo => {
  const validator = new Ajv();
  const schema = {
    type: "object",
    properties: {
      name: { type: "string", minLength: 2, maxLength: 128 },
      email: { type: "string", format: "email", maxLength: 128 },
      password: { type: "string", minLength: 5, maxLength: 128 }
    },
    additionalProperties: false
  };
  validator.validate(schema, userInfo);
  return validator.errors === null;
};
