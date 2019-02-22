import { getMailAuth } from "../../application/mail/getMailAuth";

it("should return correct auth info", () => {
  const email = "sasha@gmail.com";
  const password = "secret password";

  const processEnv = {
    gmailAccount: email,
    gmailPassword: password
  };

  expect(getMailAuth(processEnv)).toEqual({
    user: email,
    pass: password
  });
});

it("should throw if gmail account is not specified", () => {
  const processEnv = {
    password: ""
  };
  expect(() => getMailAuth(processEnv)).toThrow();
});

it("should throw if gmail password is not specified", () => {
  const processEnv = {
    email: ""
  };
  expect(() => getMailAuth(processEnv)).toThrow();
});
