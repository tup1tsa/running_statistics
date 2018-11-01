import { DividedPathPart } from "../../../application/logic/path/dividePath";
import { unitePath } from "../../../application/logic/path/unitePath";

it("should unite path properly", () => {
  const dividedPath: ReadonlyArray<DividedPathPart> = [
    { active: true, path: [{ latitude: 22, longitude: 44, time: 117 }] },
    {
      active: false,
      path: [
        { latitude: 55, longitude: 19, time: 222 },
        { latitude: 22, longitude: 20, time: 113 }
      ]
    }
  ];
  const unitedPath = [
    dividedPath[0].path[0],
    dividedPath[1].path[0],
    dividedPath[1].path[1]
  ];
  expect(unitePath(dividedPath)).toEqual(unitedPath);
});
