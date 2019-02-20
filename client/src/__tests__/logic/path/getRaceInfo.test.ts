import {
  PositionInTime,
  Race
} from "running_app_core";
import { getActiveParts } from "../../../application/logic/path/getActiveParts";
import { getRaceInfoFactory } from "../../../application/logic/path/getRaceInfo";

it("should return zeroes if path is empty", () => {
  const speed = {
    averageSpeed: 0,
    currentSpeed: 0,
    distance: 0,
    timeSecs: 0
  };
  const path: ReadonlyArray<PositionInTime> = [
    { latitude: 11, longitude: 11, time: 22 }
  ];
  const emptyRace: Race = { type: "running", path: [] };
  const almostEmptyRace: Race = { type: "walking", path };
  const divideRaceMock = jest
    .fn()
    .mockReturnValueOnce([{ active: true, path: [] }])
    .mockReturnValueOnce([{ active: true, path }]);
  expect(
    getRaceInfoFactory(divideRaceMock, jest.fn(), getActiveParts, jest.fn())(
      emptyRace
    )
  ).toEqual(speed);
  expect(
    getRaceInfoFactory(divideRaceMock, jest.fn(), getActiveParts, jest.fn())(
      almostEmptyRace
    )
  ).toEqual(speed);
});

it("should calculate all data correctly", () => {
  const firstPart: ReadonlyArray<PositionInTime> = [
    { latitude: 11, longitude: 11, time: 1000 },
    { latitude: 11, longitude: 11, time: 2000 }
  ];
  const secondPart: ReadonlyArray<PositionInTime> = [
    { latitude: 12, longitude: 52, time: 7000 },
    { latitude: 44, longitude: 52, time: 8000 }
  ];
  const race: Race = {
    type: "running",
    path: [firstPart[0], firstPart[1], secondPart[0], secondPart[1]]
  };
  const dividedRace = [
    { active: true, path: firstPart },
    { active: true, path: secondPart }
  ];
  const divideRaceMock = jest.fn().mockReturnValue(dividedRace);
  const getSpeed = jest.fn().mockReturnValue(24);
  const getPath = jest
    .fn()
    .mockReturnValueOnce(10)
    .mockReturnValueOnce(10);
  // 20 metres per 2 secs = 10m/s or 36 km/h
  expect(
    getRaceInfoFactory(divideRaceMock, getPath, getActiveParts, getSpeed)(race)
  ).toEqual({
    averageSpeed: 36,
    distance: 20,
    timeSecs: 2,
    currentSpeed: 24
  });
  expect(getPath.mock.calls.length).toBe(2);
  expect(getSpeed.mock.calls.length).toBe(1);
  expect(getSpeed.mock.calls[0]).toEqual(secondPart);
});
