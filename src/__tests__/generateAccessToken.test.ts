import { generateAccessToken } from "../application/generateAccessToken";

it("should generate random string", () => {
  const firstToken = generateAccessToken();
  const secondToken = generateAccessToken();
  expect(firstToken.length).toBe(32);
  expect(secondToken.length).toBe(32);
  expect(firstToken).not.toBe(secondToken);
});
