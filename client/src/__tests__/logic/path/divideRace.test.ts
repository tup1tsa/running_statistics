import { raceSettings } from "../../../application/common_files/config";
import { Race } from "../../../application/common_files/interfaces";
import { divideRace } from "../../../application/logic/path/divideRace";

it("should pass correct config to divide path func", () => {
  const running: Race = {
    type: "running",
    path: []
  };
  const walking: Race = {
    type: "walking",
    path: []
  };
  const cycling: Race = {
    type: "cycling",
    path: []
  };
  const getSpeed = jest.fn();
  const getPath = jest.fn();
  const dividePathMock = jest.fn().mockReturnValue("divided race");
  divideRace(running, raceSettings, getSpeed, getPath, dividePathMock);
  expect(dividePathMock.mock.calls.length).toBe(1);
  expect(dividePathMock.mock.calls[0][1]).toEqual({
    minSpeed: raceSettings.running.minSpeed,
    maxSpeed: raceSettings.running.maxSpeed,
    maxTimeBetweenPointsSecs: raceSettings.running.maximumTimeBetweenPointsSecs,
    getAverageSpeed: getSpeed,
    getPath
  });
  divideRace(walking, raceSettings, getSpeed, getPath, dividePathMock);
  expect(dividePathMock.mock.calls.length).toBe(2);
  expect(dividePathMock.mock.calls[1][1]).toEqual({
    minSpeed: raceSettings.walking.minSpeed,
    maxSpeed: raceSettings.walking.maxSpeed,
    maxTimeBetweenPointsSecs: raceSettings.walking.maximumTimeBetweenPointsSecs,
    getAverageSpeed: getSpeed,
    getPath
  });
  divideRace(cycling, raceSettings, getSpeed, getPath, dividePathMock);
  expect(dividePathMock.mock.calls.length).toBe(3);
  expect(dividePathMock.mock.calls[2][1]).toEqual({
    minSpeed: raceSettings.cycling.minSpeed,
    maxSpeed: raceSettings.cycling.maxSpeed,
    maxTimeBetweenPointsSecs: raceSettings.cycling.maximumTimeBetweenPointsSecs,
    getAverageSpeed: getSpeed,
    getPath
  });
});

it("should pass correct path to dividePathFunc and return correct divided path", () => {
  const race: Race = {
    type: "walking",
    path: [{ latitude: 23, longitude: 32, time: 3424234 }]
  };
  const dividePathMock = jest.fn().mockReturnValue("divided race");
  const dividedRace = divideRace(
    race,
    raceSettings,
    jest.fn(),
    jest.fn(),
    dividePathMock
  );
  expect(dividedRace).toEqual("divided race");
  expect(dividePathMock.mock.calls[0][0]).toEqual(race.path);
});
