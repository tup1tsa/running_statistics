import { PositionInTime, Position } from '../common_files/interfaces';

interface DividePathConfig {
  minSpeed: number;
  maxSpeed: number;
  maxTimeBetweenPointsMs: number;
  getAverageSpeed: (path: PositionInTime[]) => number;
}

export interface DividedPathPart {
  path: PositionInTime[];
  active: boolean;
}

export const dividePath = (path: PositionInTime[], config: DividePathConfig): DividedPathPart[] => {
  if (path.length < 2) {
    return [{ active: false, path }];
  }
  let dividedPath: DividedPathPart[] = [];
  for (let i = 0; i < path.length - 1; i++) {
    const currentPoint = path[i];
    const nextPoint = path[i + 1];
    const speed = config.getAverageSpeed([currentPoint, nextPoint]);
    const active =
      speed <= config.maxSpeed &&
      speed >= config.minSpeed &&
      (nextPoint.time - currentPoint.time) <= config.maxTimeBetweenPointsMs;
    if (dividedPath.length === 0) {
      dividedPath.push({active, path: [currentPoint, nextPoint]});
      continue;
    }
    let currentPath = dividedPath[dividedPath.length - 1];
    if (currentPath.active === active) {
      currentPath.path.push(nextPoint);
      continue;
    }
    dividedPath.push({active: active, path: [currentPoint, nextPoint]});
  }
  return dividedPath;
};

export const findCenter = (path: Position[]): Position => {
  const error = 'path should contain at least one point';
  if (path.length === 0) {
    throw new Error(error);
  }
  const findTotalLatLng = (total: Position, current: Position) => {
    return {
      latitude: total.latitude + current.latitude,
      longitude: total.longitude + current.longitude
    };
  };
  const totalLatLng = path.reduce(findTotalLatLng);
  return {
    latitude: totalLatLng.latitude / path.length,
    longitude: totalLatLng.longitude / path.length
  };
};

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

interface GetDistance {
  (start: Position, end: Position): number;
}

export const isMiddlePointAccurate = (
  start: Position,
  middle: Position,
  end: Position,
  getPath: GetDistance
) => {
  const fromStartToEnd = getPath(start, end);
  const fromMiddleToEnd = getPath(middle, end);
  return fromStartToEnd > fromMiddleToEnd;
};