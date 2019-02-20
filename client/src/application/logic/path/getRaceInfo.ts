import { GetPath, GetSpeed, Race } from "running_app_core";
import { getPath, getSpeed } from "../geoLibHelpers";
import { DivideRace, divideRace } from "./divideRace";
import { GetActiveParts, getActiveParts } from "./getActiveParts";

export type GetRaceInfo = (
  race: Race
) => {
  readonly distance: number;
  readonly averageSpeed: number;
  readonly timeSecs: number;
  readonly currentSpeed: number;
};
type GetRaceInfoFactory = (
  divideRace: DivideRace,
  getPath: GetPath,
  getActiveParts: GetActiveParts,
  getSpeed: GetSpeed
) => GetRaceInfo;

export const getRaceInfoFactory: GetRaceInfoFactory = (
  divideRaceFunc,
  getPathFunc,
  getParts,
  getSpeedFunc
) => race => {
  const dividedPath = divideRaceFunc(race);
  const activeParts = getParts(dividedPath).filter(
    activePath => activePath.length > 1
  );
  if (activeParts.length === 0) {
    return {
      averageSpeed: 0,
      distance: 0,
      timeSecs: 0,
      currentSpeed: 0
    };
  }
  const data = activeParts
    .map(activePathPart => {
      const lastPosition = activePathPart[activePathPart.length - 1];
      const firstPosition = activePathPart[0];
      return {
        timeSecs: (lastPosition.time - firstPosition.time) / 1000,
        distance: getPathFunc(activePathPart)
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
  let currentSpeed = 0;
  if (race.path.length > 1) {
    const length = race.path.length;
    const lastPosition = race.path[length - 1];
    const beforeLastPosition = race.path[length - 2];
    currentSpeed = getSpeedFunc(beforeLastPosition, lastPosition);
  }
  return {
    timeSecs: data.timeSecs,
    distance: data.distance,
    averageSpeed: totalDistanceKms / timeDiffHours,
    currentSpeed
  };
};

export const getRaceInfo: GetRaceInfo = race =>
  getRaceInfoFactory(divideRace, getPath, getActiveParts, getSpeed)(race);
