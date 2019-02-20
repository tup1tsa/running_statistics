import { validateLoginInfo } from "running_app_core";

const defaultLoginInfo = {
  email: "some@gmail.com",
  password: "abgasb"
};

it("should be object", () => {
  expect(validateLoginInfo("")).toBe(false);
});

it("should not validate non-string fields", () => {
  expect(validateLoginInfo({ ...defaultLoginInfo, email: 23 })).toBe(false);
  expect(validateLoginInfo({ ...defaultLoginInfo, password: [] })).toBe(false);
});

it("email should be valid", () => {
  expect(validateLoginInfo({ ...defaultLoginInfo, email: "not email" })).toBe(
    false
  );
});

it("password should be in 5-128 range", () => {
  expect(validateLoginInfo({ ...defaultLoginInfo, password: "232" })).toBe(
    false
  );
  expect(
    validateLoginInfo({ ...defaultLoginInfo, password: "a".repeat(140) })
  ).toBe(false);
});

it("should validate correct  info", () => {
  expect(validateLoginInfo(defaultLoginInfo)).toBe(true);
});
