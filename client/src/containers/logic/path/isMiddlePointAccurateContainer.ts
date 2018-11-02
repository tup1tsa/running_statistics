import * as GeoLib from "geolib";
import { Position } from "../../../application/common_files/interfaces";
import { isMiddlePointAccurate } from "../../../application/logic/path/isMiddlePointAccurate";

export type IsMiddlePointAccurateContainer = (
  start: Position,
  middle: Position,
  end: Position
) => boolean;

export const isMiddlePointAccurateContainer: IsMiddlePointAccurateContainer = (
  start,
  middle,
  end
) => isMiddlePointAccurate(start, middle, end, GeoLib.getDistance);
