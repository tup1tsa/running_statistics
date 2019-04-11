import * as crypto from "crypto";
import { findUserByPasswordFactory } from "../application/findUserByPassword";

it("should return null if email is incorrect", async done => {
  const email = "any@gmail.com";
  const password = "someHash";
  const findUserByEmail = jest.fn().mockResolvedValue(null);
  const result = await findUserByPasswordFactory(findUserByEmail)(
    email,
    password
  );
  expect(result).toBe(null);
  done();
});

it("should return null is password hash is incorrect", async done => {
  const email = "some@gmail.com";
  const purePassword = "ab bas";
  const salt = "salt for hash";
  const user = {
    name: "doesn`t matter",
    email,
    passwordHash: "differentHash",
    salt
  };
  const findUserByEmail = jest.fn().mockResolvedValue(user);
  const result = await findUserByPasswordFactory(findUserByEmail)(
    email,
    purePassword
  );
  expect(result).toBe(null);
  done();
});

it("should return user if password and email are correct", async done => {
  const email = "correct@gmail.com";
  const purePassword = "abs ba";
  const salt = "some salt";
  const hash = crypto
    .createHash("sha512")
    .update(salt)
    .update(purePassword)
    .digest("hex");
  const user = { name: "some name", email, salt, passwordHash: hash };
  const findUser = jest.fn().mockResolvedValue(user);
  const result = await findUserByPasswordFactory(findUser)(email, purePassword);
  expect(result).toEqual(user);
  expect(findUser.mock.calls[0][0]).toEqual({ email });
  done();
});
