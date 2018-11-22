import { validateLogin } from "../../../application/common_files/validators/validateLogin";

it("login should be longer than 1 char and shorter than 128", () => {
  expect(validateLogin("a")).toBe(false);
  expect(validateLogin("ab")).toBe(true);
  expect(validateLogin("a".repeat(140))).toBe(false);
});
