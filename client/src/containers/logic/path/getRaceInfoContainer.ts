import * as Geolib from "geolib";
import { Race } from "../../../application/common_files/interfaces";
import { getActiveParts } from "../../../application/logic/path/getActiveParts";
import { getRaceInfo } from "../../../application/logic/path/getRaceInfo";
import { divideRaceContainer } from "./divideRaceContainer";

export type GetRaceInfoContainer = (
  race: Race
) => {
  readonly timeSecs: number;
  readonly distance: number;
  readonly averageSpeed: number;
};

export const getRaceInfoContainer: GetRaceInfoContainer = race =>
  // @ts-ignore
  // todo: fix
  getRaceInfo(race, divideRaceContainer, Geolib.getPathLength, getActiveParts);
