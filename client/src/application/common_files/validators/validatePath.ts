import { PositionInTime } from "../interfaces";

export type ValidatePath = (
  path: unknown
) => path is ReadonlyArray<PositionInTime>;

export const validatePath: ValidatePath = (
  path
): path is ReadonlyArray<PositionInTime> => {
  if (!Array.isArray(path)) {
    return false;
  }
  if (path.length <= 1) {
    return false;
  }
  return path.every(position => {
    if (typeof position !== "object") {
      return false;
    }
    const values = [position.latitude, position.longitude, position.time];
    return values.every(value => typeof value === "number");
  });
};
