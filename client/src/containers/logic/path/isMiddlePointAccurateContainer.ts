import * as GeoLib from "geolib";
import { Coordinates } from "../../../application/common_files/interfaces";
import { isMiddlePointAccurate } from "../../../application/logic/path/isMiddlePointAccurate";

export type IsMiddlePointAccurateContainer = (
  start: Coordinates,
  middle: Coordinates,
  end: Coordinates
) => boolean;

export const isMiddlePointAccurateContainer: IsMiddlePointAccurateContainer = (
  start,
  middle,
  end
) => isMiddlePointAccurate(start, middle, end, GeoLib.getDistance);
