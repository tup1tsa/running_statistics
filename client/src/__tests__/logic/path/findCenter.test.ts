import { Coordinates } from "running_app_core";
import { findCenter } from "../../../application/logic/path/findCenter";

it("should throw an error if the path length is 0", () => {
  expect(() => findCenter([])).toThrow();
});

it("should return the only point it the path length is 1", () => {
  const path = [{ latitude: 44, longitude: 23 }];
  expect(findCenter(path)).toEqual(path[0]);
});

it("should calculate center correctly for 3 points", () => {
  const path: ReadonlyArray<Coordinates> = [
    { latitude: 0, longitude: 0 },
    { latitude: 0, longitude: 0 },
    { latitude: 30, longitude: 40 }
  ];
  expect(findCenter(path)).toEqual({ latitude: 15, longitude: 20 });
});
