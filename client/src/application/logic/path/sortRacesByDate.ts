import _ from "lodash";
import { Race } from "../../common_files/interfaces";

export type SortRacesByDate = (
  races: ReadonlyArray<Race>
) => ReadonlyArray<Race>;

export const sortRacesByDate: SortRacesByDate = races =>
  _.orderBy(races, ["path.0.time"], "asc");
