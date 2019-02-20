import { Race } from "running_app_core";
import { getRacePart } from "../../../application/logic/path/getRacePart";

it("should throw if start or finish params are incorrect", () => {
  const race: Race = { type: "running", path: [] };
  expect(() => getRacePart(race, -5, 23)).toThrow();
  expect(() => getRacePart(race, 125, 52)).toThrow();
  expect(() => getRacePart(race, 58, 23)).toThrow();
});
it("should get part of the race properly", () => {
  const race: Race = {
    type: "running",
    path: [
      { latitude: 10, longitude: 15, time: 12 },
      { latitude: 11, longitude: 15, time: 12 },
      { latitude: 12, longitude: 15, time: 12 },
      { latitude: 13, longitude: 15, time: 12 },
      { latitude: 14, longitude: 15, time: 12 },
      { latitude: 15, longitude: 15, time: 12 },
      { latitude: 16, longitude: 15, time: 12 },
      { latitude: 17, longitude: 15, time: 12 },
      { latitude: 18, longitude: 15, time: 12 },
      { latitude: 19, longitude: 15, time: 12 }
    ]
  };
  const firstPart: Race = {
    type: "running",
    path: [race.path[0], race.path[1], race.path[2], race.path[3], race.path[4]]
  };
  const lastThree: Race = {
    type: "running",
    path: [race.path[7], race.path[8], race.path[9]]
  };
  const fiveAndSix: Race = {
    type: "running",
    path: [race.path[5], race.path[6]]
  };
  expect(getRacePart(race, 0, 47)).toEqual(firstPart);
  expect(getRacePart(race, 72, 95)).toEqual(lastThree);
  expect(getRacePart(race, 52, 66)).toEqual(fiveAndSix);
});
it("should return at least one value from the path", () => {
  const race: Race = {
    type: "running",
    path: [
      { latitude: 23, longitude: 55, time: 23 },
      { latitude: 66, longitude: 66, time: 666 }
    ]
  };
  expect(getRacePart(race, 0, 2).path).toEqual([race.path[0]]);
  expect(getRacePart(race, 97, 98).path).toEqual([race.path[1]]);
});
