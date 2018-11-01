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
} from "../../application/logic/pathUtils";

export type GetRaceInfoContainer = (
  race: Race
) => {
  readonly timeSecs: number;
  readonly distance: number;
  readonly averageSpeed: number;
};

export type DivideRaceContainer = (
  race: Race
) => ReadonlyArray<DividedPathPart>;

export const divideRaceContainer: DivideRaceContainer = race =>
  divideRace(
    race,
    raceSettings,
    getAverageSpeed,
    // @ts-ignore
    // todo: fix
    Geolib.getPathLength,
    dividePath
  );

export const getRaceInfoContainer: GetRaceInfoContainer = race =>
  // @ts-ignore
  // todo: fix
  getRaceInfo(race, divideRaceContainer, Geolib.getPathLength, getActiveParts);
