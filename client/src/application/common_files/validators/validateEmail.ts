import * as Ajv from "ajv";

type ValidateEmail = (email: string) => boolean;

// ajv is used directly here without mocking because there is no much sense in
// mocking it. This validation depends strongly on ajv
export const validateEmail: ValidateEmail = email => {
  const ajv = new Ajv();
  const schema = {
    type: "string",
    maxLength: 128,
    format: "email"
  };
  ajv.validate(schema, email);
  return ajv.errors === null;
};
