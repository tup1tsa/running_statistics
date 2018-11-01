import { PositionInTime } from "../../common_files/interfaces";
import { DividedPathPart } from "./dividePath";

export type UnitePath = (
  path: ReadonlyArray<DividedPathPart>
) => ReadonlyArray<PositionInTime>;

export const unitePath: UnitePath = path => {
  return path
    .map(dividedPart => {
      return dividedPart.path;
    })
    .reduce((totalPath, currentPath) => {
      return totalPath.concat(currentPath);
    }, []);
};
