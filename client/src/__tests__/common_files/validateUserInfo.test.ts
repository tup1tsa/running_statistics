import { UserInfo } from "../../application/common_files/interfaces";
import { validateUserInfo } from "../../application/common_files/validateUserInfo";

const validInfo: UserInfo = {
  name: "some name",
  email: "some@gmail.com",
  password: "bacad"
};

it("should validate valid info", () => {
  expect(validateUserInfo(validInfo)).toBe(true);
});

it("should not validate non objects", () => {
  const info = "";
  expect(validateUserInfo(info)).toBe(false);
});

it("should not validate if any propery is not string", () => {
  expect(validateUserInfo({ ...validInfo, name: 1 })).toBe(false);
  expect(validateUserInfo({ ...validInfo, email: [] })).toBe(false);
  expect(validateUserInfo({ ...validInfo, password: {} })).toBe(false);
});

it("name should be longer than 1 char and shorter than 128", () => {
  expect(validateUserInfo({ ...validInfo, name: "a" })).toBe(false);
  expect(validateUserInfo({ ...validInfo, name: "a".repeat(140) })).toBe(false);
});

it("email should be an email", () => {
  expect(validateUserInfo({ ...validInfo, email: "not email" })).toBe(false);
});

it("password should be longer than 4 chars and shorter than 128", () => {
  expect(validateUserInfo({ ...validInfo, password: "abas" })).toBe(false);
  expect(validateUserInfo({ ...validInfo, name: "a".repeat(140) })).toBe(false);
});
