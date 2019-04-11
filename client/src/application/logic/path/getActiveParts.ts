import { PositionInTime } from "running_app_core";
import { DividedPathPart } from "./dividePath";

export type GetActiveParts = (
  path: ReadonlyArray<DividedPathPart>
) => ReadonlyArray<ReadonlyArray<PositionInTime>>;

export const getActiveParts: GetActiveParts = path => {
  return path
    .filter(pathPart => pathPart.active)
    .map(activePathPart => activePathPart.path);
};
