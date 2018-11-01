import { PositionInTime } from "../../common_files/interfaces";
import { DividedPathPart } from "./dividePath";

export type GetActiveParts = (
  path: ReadonlyArray<DividedPathPart>
) => ReadonlyArray<ReadonlyArray<PositionInTime>>;

export const getActiveParts: GetActiveParts = path => {
  return path
    .filter(pathPart => pathPart.active)
    .map(activePathPart => activePathPart.path);
};
