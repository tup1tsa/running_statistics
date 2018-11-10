import { PositionInTime } from "./interfaces";

export const validatePath = (
  path: unknown
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
