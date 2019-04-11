import { GetPath, PositionInTime } from "running_app_core";
import { GetAverageSpeed } from "./getAverageSpeed";

export interface DividePathConfig {
  readonly minSpeed: number;
  readonly maxSpeed: number;
  readonly maxTimeBetweenPointsSecs: number;
  readonly getAverageSpeed: GetAverageSpeed;
  readonly getPath: GetPath;
}

export interface DividedPathPart {
  readonly path: ReadonlyArray<PositionInTime>;
  readonly active: boolean;
}

export type DividePath = (
  path: ReadonlyArray<PositionInTime>,
  config: DividePathConfig
) => ReadonlyArray<DividedPathPart>;

export const dividePath: DividePath = (path, config) => {
  if (path.length < 2) {
    return [{ active: false, path }];
  }
  let dividedPath: ReadonlyArray<DividedPathPart> = [];
  for (let i = 0; i < path.length - 1; i++) {
    const currentPoint = path[i];
    const nextPoint = path[i + 1];
    const speed = config.getAverageSpeed(
      [currentPoint, nextPoint],
      config.getPath
    );
    const active =
      speed <= config.maxSpeed &&
      speed >= config.minSpeed &&
      nextPoint.time - currentPoint.time <=
        config.maxTimeBetweenPointsSecs * 1000;
    if (dividedPath.length === 0) {
      dividedPath = [
        ...dividedPath,
        { active, path: [currentPoint, nextPoint] }
      ];
      continue;
    }
    const currentPath = dividedPath[dividedPath.length - 1];
    if (currentPath.active === active) {
      // @ts-ignore
      // todo: fix it somehow
      currentPath.path.push(nextPoint);
      continue;
    }
    dividedPath = [...dividedPath, { active, path: [currentPoint, nextPoint] }];
  }
  return dividedPath;
};
