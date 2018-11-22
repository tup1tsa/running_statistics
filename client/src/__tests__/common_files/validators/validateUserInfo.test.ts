import { RegularRegistrationInfo } from "../../../application/common_files/interfaces";
import { validateUserInfo } from "../../../application/common_files/validators/validateUserInfo";

const validInfo: RegularRegistrationInfo = {
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
