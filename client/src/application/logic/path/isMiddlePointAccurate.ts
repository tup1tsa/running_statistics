import { GetDistance, Position } from "../../common_files/interfaces";

export type IsMiddlePointAccurate = (
  start: Position,
  middle: Position,
  end: Position,
  getPath: GetDistance
) => boolean;

export const isMiddlePointAccurate: IsMiddlePointAccurate = (
  start,
  middle,
  end,
  getPath
) => {
  const fromStartToEnd = getPath(start, end);
  const fromMiddleToEnd = getPath(middle, end);
  return fromStartToEnd > fromMiddleToEnd;
};
