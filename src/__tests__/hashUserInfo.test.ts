import * as crypto from "crypto";
import { UserInfo } from "../../client/src/application/common_files/interfaces";
import { hashUserInfo } from "../application/hashUserInfo";

it("should hash info properly", async done => {
  const salt = jest.fn().mockReturnValue("super unique salt");
  const generateUniqueToekn = jest.fn().mockResolvedValue("unique token");
  const userInfo: UserInfo = {
    name: "Sasha",
    email: "any@gmail.com",
    password: "abcda"
  };
  const hashedInfo = await hashUserInfo(userInfo, salt, generateUniqueToekn);
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
