import { IsAccessTokenUnique } from "../application/database/queries/isAccessTokenUnique";
import { generateUniqueAccessTokenFactory } from "../application/generateUniqueAccessToken";

it("should generate unique access token", async done => {
  // there is weird bug with ts types
  // .mockResolveValueOnce(true) throws an error
  // todo: investigate it later
  const isAccessTokenUnique: IsAccessTokenUnique = jest
    .fn()
    .mockReturnValueOnce(Promise.resolve(false))
    .mockReturnValueOnce(Promise.resolve(false))
    .mockReturnValueOnce(Promise.resolve(true));
  const createSalt = jest
    .fn()
    .mockReturnValueOnce("hey")
    .mockReturnValueOnce("smin")
    .mockReturnValue("way");
  const token = await generateUniqueAccessTokenFactory(
    createSalt,
    isAccessTokenUnique
  )();
  expect(token).toBe("way");
  done();
});
