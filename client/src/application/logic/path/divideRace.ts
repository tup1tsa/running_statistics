import { GetPath, Race, RaceSettings } from "../../common_files/interfaces";
import { DividedPathPart, DividePath, DividePathConfig } from "./dividePath";
import { GetAverageSpeed } from "./getAverageSpeed";

export type DivideRace = (
  race: Race,
  raceSettings: RaceSettings,
  getSpeed: GetAverageSpeed,
  getPath: GetPath,
  dividePathFunc: DividePath
) => ReadonlyArray<DividedPathPart>;

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
