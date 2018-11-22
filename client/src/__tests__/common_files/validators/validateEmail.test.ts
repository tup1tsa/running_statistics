import { validateEmail } from "../../../application/common_files/validators/validateEmail";

it("should validate email properly", () => {
  expect(validateEmail("non email")).toBe(false);
  expect(validateEmail("some@gmail.com")).toBe(true);
});

it("email should not be longer than 128 chars", () => {
  expect(validateEmail("s".repeat(140) + "@gmail.com")).toBe(false);
});
