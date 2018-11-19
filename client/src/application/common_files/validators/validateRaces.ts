import { Race } from "../interfaces";
import { validatePath, ValidatePath } from "./validatePath";

export type ValidateRaces = (races: unknown) => races is ReadonlyArray<Race>;
type ValidateRacesFactory = (validatePath: ValidatePath) => ValidateRaces;

export const validateRacesFactory: ValidateRacesFactory = validatePathFunc => (
  races
): races is ReadonlyArray<Race> => {
  if (!Array.isArray(races)) {
    return false;
  }
  if (races.length === 0) {
    return false;
  }
  return races.every(race => {
    if (!race.type || !race.path) {
      return false;
    }
    const types = ["running", "walking", "driving", "cycling"];
    if (!types.includes(race.type)) {
      return false;
    }
    return validatePathFunc(race.path);
  });
};

export const validateRaces: ValidateRaces = (
  races
): races is ReadonlyArray<Race> => validateRacesFactory(validatePath)(races);
