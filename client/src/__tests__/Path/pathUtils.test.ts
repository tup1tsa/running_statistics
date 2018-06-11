import { PositionInTime, Position, Race } from '../../common_files/interfaces';
import { raceSettings } from '../../common_files/config';
import {
  DividedPathPart,
  dividePath,
  divideRace,
  findCenter,
  getActiveParts,
  getRaceInfo,
  getAverageSpeed,
  isMiddlePointAccurate,
  unitePath
} from '../../Path/pathUtils';
import * as GeoLib from 'geolib';

describe('divide path', () => {

  const defaultPath: PositionInTime[] = [
    { latitude: 17, longitude: 23, time: 100 },
    { latitude: 18, longitude: 23, time: 150 },
    { latitude: 19, longitude: 23, time: 300 },
    { latitude: 24, longitude: 23, time: 350 },
    { latitude: 26, longitude: 23, time: 700 },
    { latitude: 47, longitude: 23, time: 750 },
  ];

  const defaultConfig = {
    minSpeed: 2,
    maxSpeed: 5,
    maxTimeBetweenPointsSecs: 1,
    getAverageSpeed: jest.fn().mockReturnValue(3),
    getPath: jest.fn()
  };

  it('should return inactive path if path array length is 1 or 0', () => {
    const path = [defaultPath[0]];
    expect(dividePath(path, defaultConfig)).toEqual([{active: false, path: path}]);
    expect(dividePath([], defaultConfig)).toEqual([{active: false, path: []}]);
  });

  it('should divide path depending on speed', () => {
    const getAverageSpeedBetweenTwoPoints = (path: PositionInTime[]) => path[1].latitude - path[0].latitude;
    const config = {...defaultConfig, getAverageSpeed: getAverageSpeedBetweenTwoPoints};
    const firstInactivePart = [defaultPath[0], defaultPath[1], defaultPath[2]];
    const activePart = [defaultPath[2], defaultPath[3], defaultPath[4]];
    const secondInactivePart = [defaultPath[4], defaultPath[5]];
    const dividedPaths = dividePath(defaultPath, config);
    expect(dividedPaths.length).toBe(3);
    expect(dividedPaths[0]).toEqual({active: false, path: firstInactivePart});
    expect(dividedPaths[1]).toEqual({active: true, path: activePart});
    expect(dividedPaths[2]).toEqual({active: false, path: secondInactivePart});
  });

  it('should divide path depending on time between points', () => {
    const config = {...defaultConfig, maxTimeBetweenPointsSecs: 0.1};
    const dividedPath = dividePath(defaultPath, config);
    expect(dividedPath.length).toBe(5);
    expect(dividedPath[0]).toEqual({active: true, path: [defaultPath[0], defaultPath[1]]});
    expect(dividedPath[1]).toEqual({active: false, path: [defaultPath[1], defaultPath[2]]});
    expect(dividedPath[2]).toEqual({active: true, path: [defaultPath[2], defaultPath[3]]});
    expect(dividedPath[3]).toEqual({active: false, path: [defaultPath[3], defaultPath[4]]});
    expect(dividedPath[4]).toEqual({active: true, path: [defaultPath[4], defaultPath[5]]});
  });
});

describe('divide race', () => {

  it('should pass correct config to divide path func', () => {
    const running: Race = {
      type: 'running',
      path: []
    };
    const walking: Race = {
      type: 'walking',
      path: []
    };
    const cycling: Race = {
      type: 'cycling',
      path: []
    };
    const getSpeed = jest.fn();
    const getPath = jest.fn();
    const dividePathMock = jest.fn().mockReturnValue('divided race');
    divideRace(running, raceSettings, getSpeed, getPath, dividePathMock);
    expect(dividePathMock.mock.calls.length).toBe(1);
    expect(dividePathMock.mock.calls[0][1]).toEqual({
      minSpeed: raceSettings.running.minSpeed,
      maxSpeed: raceSettings.running.maxSpeed,
      maxTimeBetweenPointsSecs: raceSettings.running.maximumTimeBetweenPointsSecs,
      getAverageSpeed: getSpeed,
      getPath: getPath
    });
    divideRace(walking, raceSettings, getSpeed, getPath, dividePathMock);
    expect(dividePathMock.mock.calls.length).toBe(2);
    expect(dividePathMock.mock.calls[1][1]).toEqual({
      minSpeed: raceSettings.walking.minSpeed,
      maxSpeed: raceSettings.walking.maxSpeed,
      maxTimeBetweenPointsSecs: raceSettings.walking.maximumTimeBetweenPointsSecs,
      getAverageSpeed: getSpeed,
      getPath: getPath
    });
    divideRace(cycling, raceSettings, getSpeed, getPath, dividePathMock);
    expect(dividePathMock.mock.calls.length).toBe(3);
    expect(dividePathMock.mock.calls[2][1]).toEqual({
      minSpeed: raceSettings.cycling.minSpeed,
      maxSpeed: raceSettings.cycling.maxSpeed,
      maxTimeBetweenPointsSecs: raceSettings.cycling.maximumTimeBetweenPointsSecs,
      getAverageSpeed: getSpeed,
      getPath: getPath
    });
  });

  it('should pass correct path to dividePathFunc and return correct divided path', () => {
    const race: Race = {
      type: 'walking',
      path: [{ latitude: 23, longitude: 32, time: 3424234 }]
    };
    const dividePathMock = jest.fn().mockReturnValue('divided race');
    const dividedRace = divideRace(race, raceSettings, jest.fn(), jest.fn(), dividePathMock);
    expect(dividedRace).toEqual('divided race');
    expect(dividePathMock.mock.calls[0][0]).toEqual(race.path);
  });

});

describe('unite path', () => {
  const dividedPath: DividedPathPart[] = [
    {active:  true, path: [{ latitude: 22, longitude: 44, time: 117 }]},
    {active: false, path: [
      { latitude: 55, longitude: 19, time: 222 },
      { latitude: 22, longitude: 20, time: 113 }
    ]}
  ];
  const unitedPath = [dividedPath[0].path[0], dividedPath[1].path[0], dividedPath[1].path[1]];
  expect(unitePath(dividedPath)).toEqual(unitedPath);
});

describe('find center of the path', () => {
  it('should throw an error if the path length is 0', () => {
    expect(() => findCenter([])).toThrow();
  });

  it('should return the only point it the path length is 1', () => {
    const path = [{ latitude: 44, longitude: 23 }];
    expect(findCenter(path)).toEqual(path[0]);
  });

  it('should calculate center correctly for 3 points', () => {
    const path: Position[] = [
      { latitude: 0, longitude: 0 },
      { latitude: 0, longitude: 0 },
      { latitude: 30, longitude: 40 }
    ];
    expect(findCenter(path)).toEqual({ latitude: 15, longitude: 20 });
  });
});

describe('get average speed', () => {

  it('should calculate speed correctly in kmh', () => {
    const path: PositionInTime[] =
      [
        { latitude: 23, longitude: 44, time: 1000 },
        { latitude: 25, longitude: 42, time: 1700 },
        { latitude: 28, longitude: 16, time: 2000 }
      ];
    const getPathMock = jest.fn();
    getPathMock.mockReturnValue(44);
    // path length is 44 metres, time difference is 1 sec
    expect(getAverageSpeed(path, getPathMock)).toBeCloseTo(44 * 3.6);
    // 3.6 is coefficient to convert m/s to km/h
  });

  it('should return 0 if path is empty or consists from one point', () => {
    expect(getAverageSpeed([], jest.fn())).toBe(0);
    const position = {
      latitude: 42,
      longitude: 42,
      time: 24344
    };
    expect(getAverageSpeed([position], jest.fn())).toBe(0);
  });

});

describe('get active parts', () => {

  it('should return correct array of active path parts', () => {
    const pathPart: PositionInTime[] = [
      { latitude: 22, longitude: 44, time: 23 },
      { latitude: 24, longitude: 45, time: 342434 }
    ];
    const path: DividedPathPart[] = [
      { active: true, path: pathPart },
      { active: false, path: pathPart },
      { active: true, path: pathPart }
    ];
    expect(getActiveParts(path)).toEqual([pathPart, pathPart]);
  });

});

describe('get race information', () => {

  it('should return zeroes if path is empty', () => {
    const path: PositionInTime[] = [
      { latitude: 11, longitude: 11, time: 22 }
    ];
    const emptyRace: Race = { type: 'running', path: []};
    const almostEmptyRace: Race = { type: 'walking', path };
    const divideRaceMock = jest.fn()
      .mockReturnValueOnce([{ active: true, path: []}])
      .mockReturnValueOnce([{ active: true, path }]);
    const getPath = jest.fn();
    expect(getRaceInfo(emptyRace, divideRaceMock, getPath, getActiveParts)).toEqual({
      averageSpeed: 0,
      distance: 0,
      timeSecs: 0
    });
    expect(getPath.mock.calls.length).toBe(0);
    expect(getRaceInfo(almostEmptyRace, divideRaceMock, getPath, getActiveParts)).toEqual({
      averageSpeed: 0,
      distance: 0,
      timeSecs: 0
    });
    expect(getPath.mock.calls.length).toBe(0);
  });

  it('should calculate all data correctly', () => {
    const firstPart: PositionInTime[] = [
      { latitude: 11, longitude: 11, time: 1000 },
      { latitude: 11, longitude: 11, time: 2000 }
    ];
    const secondPart: PositionInTime[] = [
      { latitude: 12, longitude: 52, time: 7000 },
      { latitude: 44, longitude: 52, time: 8000 }
    ];
    const race: Race = { type: 'running', path: [firstPart[0], firstPart[1], secondPart[0], secondPart[1]] };
    const dividedRace = [
      { active: true, path: firstPart },
      { active: true, path: secondPart }
    ];
    const divideRaceMock = jest.fn().mockReturnValue(dividedRace);
    const getPath = jest.fn()
      .mockReturnValueOnce(10)
      .mockReturnValueOnce(10);
    // 20 metres per 2 secs = 10m/s or 36 km/h
    expect(getRaceInfo(race, divideRaceMock, getPath, getActiveParts)).toEqual({
      averageSpeed: 36,
      distance: 20,
      timeSecs: 2
    });
    expect(getPath.mock.calls.length).toBe(2);
  });

});

describe('is middle point accurate', () => {

  it('should return true if third point further away from 1-st than second', () => {
    const start: Position = { longitude: 0, latitude: 44 };
    const middle: Position = { longitude: 0, latitude: 45 };
    const end: Position = { longitude: 0, latitude: 60 };
    expect(isMiddlePointAccurate(start, middle, end, GeoLib.getDistance)).toBe(true);
  });

  it('should return false if third point near the first point. Second point is very far away', () => {
    const start: Position = { longitude: 0, latitude: 24 };
    const middle: Position = { longitude: 24, latitude: 24 };
    const end: Position = { longitude: 3, latitude: 24 };
    expect(isMiddlePointAccurate(start, middle, end, GeoLib.getDistance)).toBe(false);
  });

});
