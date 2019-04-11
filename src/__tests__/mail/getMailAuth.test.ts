import { getMailAuthFactory } from "../../application/mail/getMailAuth";

it("should return correct auth info", () => {
  const email = "sasha@gmail.com";
  const password = "secret password";

  const processEnv = {
    gmailAccount: email,
    gmailPassword: password
  };

  expect(getMailAuthFactory(processEnv)()).toEqual({
    user: email,
    pass: password
  });
});

it("should throw if gmail account is not specified", () => {
  const processEnv = {
    password: ""
  };
  expect(() => getMailAuthFactory(processEnv)()).toThrow();
});

it("should throw if gmail password is not specified", () => {
  const processEnv = {
    email: ""
  };
  expect(() => getMailAuthFactory(processEnv)()).toThrow();
});
