import { Coordinates, GetDistance } from "running_app_core";
import { getDistance } from "../geoLibHelpers";

export type IsMiddlePointAccurate = (
  start: Coordinates,
  middle: Coordinates,
  end: Coordinates
) => boolean;
type IsMiddlePointAccurateFactory = (
  getDistance: GetDistance
) => IsMiddlePointAccurate;

export const isMiddlePointAccurateFactory: IsMiddlePointAccurateFactory = getDistanceFunc => (
  start,
  middle,
  end
) => {
  const fromStartToEnd = getDistanceFunc(start, end);
  const fromMiddleToEnd = getDistanceFunc(middle, end);
  return fromStartToEnd > fromMiddleToEnd;
};

export const isMiddlePointAccurate: IsMiddlePointAccurate = (
  start,
  middle,
  end
) => isMiddlePointAccurateFactory(getDistance)(start, middle, end);
