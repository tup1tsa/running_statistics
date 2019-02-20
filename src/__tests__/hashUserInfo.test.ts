import * as crypto from "crypto";
import { RegularRegistrationInfo } from "running_app_core";
import { hashUserInfoFactory } from "../application/hashUserInfo";

it("should hash info properly", async done => {
  const salt = jest.fn().mockReturnValue("super unique salt");
  const generateUniqueToken = jest.fn().mockResolvedValue("unique token");
  const userInfo: RegularRegistrationInfo = {
    name: "Sasha",
    email: "any@gmail.com",
    password: "abcda"
  };
  const hashedInfo = await hashUserInfoFactory(salt, generateUniqueToken)(
    userInfo
  );
  const hashedPassword = crypto
    .createHash("sha512")
    .update("super unique salt")
    .update("abcda")
    .digest("hex");
  expect(hashedInfo).toEqual({
    name: userInfo.name,
    email: userInfo.email,
    passwordHash: hashedPassword,
    salt: "super unique salt",
    accessToken: "unique token"
  });
  done();
});
