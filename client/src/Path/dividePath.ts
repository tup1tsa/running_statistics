import { PositionInTime } from '../common_files/interfaces';

interface Config {
  minSpeed: number;
  maxSpeed: number;
  maxTimeBetweenPointsMs: number;
  getAverageSpeed: (path: PositionInTime[]) => number;
}

interface DividedPathPart {
  path: PositionInTime[];
  active: boolean;
}

export const dividePath = (path: PositionInTime[], config: Config): DividedPathPart[] => {
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