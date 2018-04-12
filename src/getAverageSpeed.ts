import { PositionInTime } from './Path/PathFetcher';

interface GetPath {
  (positions: PositionInTime[]): number;
}

export const getAverageSpeed = (path: PositionInTime[], getPath: GetPath) => {
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