import { raceSettings } from "../../common_files/config";
import { GetPath, Race, RaceSettings } from "../../common_files/interfaces";
import { getPath } from "../geoLibHelpers";
import {
  DividedPathPart,
  DividePath,
  dividePath,
  DividePathConfig
} from "./dividePath";
import { GetAverageSpeed, getAverageSpeed } from "./getAverageSpeed";

export type DivideRace = (race: Race) => ReadonlyArray<DividedPathPart>;
type DivideRaceFactory = (
  raceSettings: RaceSettings,
  getSpeed: GetAverageSpeed,
  getPath: GetPath,
  dividePathFunc: DividePath
) => DivideRace;

export const divideRaceFactory: DivideRaceFactory = (
  settings,
  getSpeed,
  getPathFunc,
  dividePathFunc
) => race => {
  let dividedPathConfig: DividePathConfig = {
    minSpeed: settings.running.minSpeed,
    maxSpeed: settings.running.maxSpeed,
    maxTimeBetweenPointsSecs: settings.running.maximumTimeBetweenPointsSecs,
    getPath: getPathFunc,
    getAverageSpeed: getSpeed
  };
  if (race.type === "walking") {
    dividedPathConfig = {
      ...dividedPathConfig,
      minSpeed: settings.walking.minSpeed,
      maxSpeed: settings.walking.maxSpeed,
      maxTimeBetweenPointsSecs: settings.walking.maximumTimeBetweenPointsSecs
    };
  }
  if (race.type === "cycling") {
    dividedPathConfig = {
      ...dividedPathConfig,
      minSpeed: settings.cycling.minSpeed,
      maxSpeed: settings.cycling.maxSpeed,
      maxTimeBetweenPointsSecs: settings.cycling.maximumTimeBetweenPointsSecs
    };
  }
  return dividePathFunc(race.path, dividedPathConfig);
};

export const divideRace: DivideRace = race =>
  divideRaceFactory(raceSettings, getAverageSpeed, getPath, dividePath)(race);
