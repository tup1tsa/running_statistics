import { PositionInTime } from "../../../application/common_files/interfaces";
import { validateRacesFactory } from "../../../application/common_files/validators/validateRaces";

const successPathValidator = (
  path: unknown
): path is ReadonlyArray<PositionInTime> => true;

it("should be an array with one or more races", () => {
  expect(validateRacesFactory(successPathValidator)("string")).toBe(false);
  expect(validateRacesFactory(successPathValidator)([])).toBe(false);
  expect(
    validateRacesFactory(successPathValidator)([{ type: "running", path: [] }])
  ).toBe(true);
});

it("should fail if any race path is invalid", () => {
  const races = [
    { type: "running", path: ["fine"] },
    { type: "walking", path: ["invalid value"] }
  ];
  const validator = jest
    .fn()
    .mockReturnValueOnce(true)
    .mockReturnValueOnce(false);
  // @ts-ignore
  expect(validateRacesFactory(validator)(races)).toBe(false);
});

it("should fail if  race path or type is not included", () => {
  const withoutPath = [{ type: "running" }];
  const withoutType = [{ path: [] }];
  expect(validateRacesFactory(successPathValidator)(withoutPath)).toBe(false);
  expect(validateRacesFactory(successPathValidator)(withoutType)).toBe(false);
});
it("should fail if race type is ivalid", () => {
  const races = [
    { type: "running", path: [] },
    { type: "walking", path: [] },
    { type: "driving", path: [] },
    { type: "cycling", path: [] }
  ];
  const invalidRace = [{ type: "laughing", path: [] }];
  expect(validateRacesFactory(successPathValidator)(races)).toBe(true);
  expect(validateRacesFactory(successPathValidator)(invalidRace)).toBe(false);
});
