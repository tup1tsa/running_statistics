import * as Geolib from "geolib";
import { raceSettings } from "../../../application/common_files/config";
import { Race } from "../../../application/common_files/interfaces";
import {
  DividedPathPart,
  dividePath
} from "../../../application/logic/path/dividePath";
import { divideRace } from "../../../application/logic/path/divideRace";
import { getAverageSpeed } from "../../../application/logic/path/getAverageSpeed";

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
