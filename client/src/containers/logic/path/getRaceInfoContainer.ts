import { Race } from "../../../application/common_files/interfaces";
import { getActiveParts } from "../../../application/logic/path/getActiveParts";
import { getRaceInfo } from "../../../application/logic/path/getRaceInfo";
import { getPath, getSpeed } from "../../geoLibHelpers";
import { divideRaceContainer } from "./divideRaceContainer";

export type GetRaceInfoContainer = (
  race: Race
) => {
  readonly timeSecs: number;
  readonly distance: number;
  readonly averageSpeed: number;
  readonly currentSpeed: number;
};

export const getRaceInfoContainer: GetRaceInfoContainer = race =>
  getRaceInfo(race, divideRaceContainer, getPath, getActiveParts, getSpeed);
