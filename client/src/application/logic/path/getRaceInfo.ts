import { DivideRaceContainer } from "../../../containers/logic/path/divideRaceContainer";
import { GetPath, Race } from "../../common_files/interfaces";
import { GetActiveParts } from "./getActiveParts";

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
