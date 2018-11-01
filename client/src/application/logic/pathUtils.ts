import { DivideRaceContainer } from "../../containers/logic/pathUtilsContainers";
import {
  Position,
  PositionInTime,
  Race,
  RaceSettings
} from "../common_files/interfaces";

export type GetPath = (positions: ReadonlyArray<PositionInTime>) => number;

export interface DividePathConfig {
  readonly minSpeed: number;
  readonly maxSpeed: number;
  readonly maxTimeBetweenPointsSecs: number;
  getAverageSpeed: (
    path: ReadonlyArray<PositionInTime>,
    getPath: GetPath
  ) => number;
  getPath: GetPath;
}

export interface DividedPathPart {
  readonly path: ReadonlyArray<PositionInTime>;
  readonly active: boolean;
}

export type GetAverageSpeed = (
  path: ReadonlyArray<PositionInTime>,
  getPath: GetPath
) => number;

export type GetActiveParts = (
  path: ReadonlyArray<DividedPathPart>
) => ReadonlyArray<ReadonlyArray<PositionInTime>>;

export type GetRaceInfo = (
  race: Race,
  divideRace: DivideRaceContainer,
  getPath: GetPath,
  getActiveParts: GetActiveParts
) => {
  readonly distance: number;
  readonly averageSpeed: number;
  readonly timeSecs: number;
};

type GetDistance = (start: Position, end: Position) => number;

export type DividePath = (
  path: ReadonlyArray<PositionInTime>,
  config: DividePathConfig
) => ReadonlyArray<DividedPathPart>;

export type DivideRace = (
  race: Race,
  raceSettings: RaceSettings,
  getSpeed: GetAverageSpeed,
  getPath: GetPath,
  dividePathFunc: DividePath
) => ReadonlyArray<DividedPathPart>;

export type GetRacePart = (
  race: Race,
  startPercent: number,
  finishPercent: number
) => Race;

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

export const divideRace: DivideRace = (
  race,
  raceSettings,
  getSpeed,
  getPath,
  dividePathFunc
) => {
  let dividedPathConfig: DividePathConfig = {
    minSpeed: raceSettings.running.minSpeed,
    maxSpeed: raceSettings.running.maxSpeed,
    maxTimeBetweenPointsSecs: raceSettings.running.maximumTimeBetweenPointsSecs,
    getPath,
    getAverageSpeed: getSpeed
  };
  if (race.type === "walking") {
    dividedPathConfig = {
      ...dividedPathConfig,
      minSpeed: raceSettings.walking.minSpeed,
      maxSpeed: raceSettings.walking.maxSpeed,
      maxTimeBetweenPointsSecs:
        raceSettings.walking.maximumTimeBetweenPointsSecs
    };
  }
  if (race.type === "cycling") {
    dividedPathConfig = {
      ...dividedPathConfig,
      minSpeed: raceSettings.cycling.minSpeed,
      maxSpeed: raceSettings.cycling.maxSpeed,
      maxTimeBetweenPointsSecs:
        raceSettings.cycling.maximumTimeBetweenPointsSecs
    };
  }
  return dividePathFunc(race.path, dividedPathConfig);
};

export const unitePath = (
  path: ReadonlyArray<DividedPathPart>
): ReadonlyArray<PositionInTime> => {
  return path
    .map(dividedPart => {
      return dividedPart.path;
    })
    .reduce((totalPath, currentPath) => {
      return totalPath.concat(currentPath);
    }, []);
};

export const findCenter = (path: ReadonlyArray<Position>): Position => {
  const error = "path should contain at least one point";
  if (path.length === 0) {
    throw new Error(error);
  }
  const latitudes = path.map(position => position.latitude);
  const longitudes = path.map(position => position.longitude);
  const minLatitude = Math.min(...latitudes);
  const maxLatitude = Math.max(...latitudes);
  const minLongitude = Math.min(...longitudes);
  const maxLongitude = Math.max(...longitudes);
  return {
    latitude: (minLatitude + maxLatitude) / 2,
    longitude: (minLongitude + maxLongitude) / 2
  };
};

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

export const getActiveParts: GetActiveParts = path => {
  return path
    .filter(pathPart => pathPart.active)
    .map(activePathPart => activePathPart.path);
};

export const getRaceInfo: GetRaceInfo = (
  race,
  divideRaceFunc,
  getPath,
  getParts
) => {
  const dividedPath = divideRaceFunc(race);
  const activeParts = getParts(dividedPath).filter(
    activePath => activePath.length > 1
  );
  if (activeParts.length === 0) {
    return {
      averageSpeed: 0,
      distance: 0,
      timeSecs: 0
    };
  }
  const data = activeParts
    .map(activePathPart => {
      const lastPosition = activePathPart[activePathPart.length - 1];
      const firstPosition = activePathPart[0];
      return {
        timeSecs: (lastPosition.time - firstPosition.time) / 1000,
        distance: getPath(activePathPart)
      };
    })
    .reduce((total, current) => {
      return {
        timeSecs: total.timeSecs + current.timeSecs,
        distance: total.distance + current.distance
      };
    });
  const totalDistanceKms = data.distance / 1000;
  const timeDiffHours = data.timeSecs / 60 / 60;
  return {
    timeSecs: data.timeSecs,
    distance: data.distance,
    averageSpeed: totalDistanceKms / timeDiffHours
  };
};

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

export const getRacePart: GetRacePart = (race, startPercent, finishPercent) => {
  if (
    startPercent > 100 ||
    startPercent < 0 ||
    finishPercent > 100 ||
    finishPercent < 0 ||
    startPercent > finishPercent
  ) {
    throw new Error("percentage is not correct");
  }
  const startPoint = Math.floor((race.path.length * startPercent) / 100);
  const finishPoint = Math.round((race.path.length * finishPercent) / 100);
  let path = race.path.slice(startPoint, finishPoint);
  if (path.length === 0) {
    path = [race.path[startPoint]];
  }
  return {
    type: race.type,
    path
  };
};
