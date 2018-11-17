import { createSalt } from "../application/createSalt";

it("should generate random string", () => {
  const firstSalt = createSalt();
  const secondSalt = createSalt();
  expect(firstSalt.length).toBe(128);
  expect(firstSalt.length).toBe(secondSalt.length);
  expect(firstSalt).not.toBe(secondSalt);
});
