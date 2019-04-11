import { PositionInTime } from "running_app_core";
import { DividedPathPart } from "../../../application/logic/path/dividePath";
import { getActiveParts } from "../../../application/logic/path/getActiveParts";

it("should return correct array of active path parts", () => {
  const pathPart: ReadonlyArray<PositionInTime> = [
    { latitude: 22, longitude: 44, time: 23 },
    { latitude: 24, longitude: 45, time: 342434 }
  ];
  const path: ReadonlyArray<DividedPathPart> = [
    { active: true, path: pathPart },
    { active: false, path: pathPart },
    { active: true, path: pathPart }
  ];
  expect(getActiveParts(path)).toEqual([pathPart, pathPart]);
});
