import { GetPath, PositionInTime } from "../../common_files/interfaces";

export type GetAverageSpeed = (
  path: ReadonlyArray<PositionInTime>,
  getPath: GetPath
) => number;

export const getAverageSpeed: GetAverageSpeed = (path, getPath) => {
  if (path.length === 0 || path.length === 1) {
    return 0;
  }
  const totalDistanceKms = getPath(path) / 1000;
  const firstPosition = path[0];
  const lastPosition = path[path.length - 1];
  const timeDiffMs = lastPosition.time - firstPosition.time;
  const timeDiffHours = timeDiffMs / 60 / 60 / 1000;
  return totalDistanceKms / timeDiffHours;
};
