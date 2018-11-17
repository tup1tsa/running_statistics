import { generateUniqueAccessToken } from "../application/generateUniqueAccessToken";

it("should generate unique access token", async done => {
  const isAccessTokenUnique = jest
    .fn()
    .mockResolvedValueOnce(false)
    .mockResolvedValueOnce(true);
  const createSalt = jest
    .fn()
    .mockReturnValueOnce("hey")
    .mockReturnValueOnce("way");
  const token = await generateUniqueAccessToken(
    createSalt,
    isAccessTokenUnique
  );
  expect(token).toBe("way");
  done();
});
