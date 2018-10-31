import * as Geolib from "geolib";
import { raceSettings } from "../../application/common_files/config";
import { Race } from "../../application/common_files/interfaces";
import {
  DividedPathPart,
  dividePath,
  divideRace,
  getActiveParts,
  getAverageSpeed,
  getRaceInfo
} from "../../application/Path/pathUtils";

export type GetRaceInfoFactory = (
  race: Race
) => {
  readonly timeSecs: number;
  readonly distance: number;
  readonly averageSpeed: number;
};

export type DivideRaceFactory = (race: Race) => ReadonlyArray<DividedPathPart>;

export const divideRaceFactory: DivideRaceFactory = race =>
  divideRace(
    race,
    raceSettings,
    getAverageSpeed,
    // @ts-ignore
    // todo: fix
    Geolib.getPathLength,
    dividePath
  );

export const getRaceInfoFactory: GetRaceInfoFactory = race =>
  // @ts-ignore
  // todo: fix
  getRaceInfo(race, divideRaceFactory, Geolib.getPathLength, getActiveParts);
