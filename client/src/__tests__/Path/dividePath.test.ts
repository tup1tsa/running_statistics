import { dividePath } from '../../Path/dividePath';
import { PositionInTime } from '../../common_files/interfaces';

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
    maxTimeBetweenPointsMs: 1000,
    getAverageSpeed: jest.fn().mockReturnValue(3)
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
    const config = {...defaultConfig, maxTimeBetweenPointsMs: 100};
    const dividedPath = dividePath(defaultPath, config);
    expect(dividedPath.length).toBe(5);
    expect(dividedPath[0]).toEqual({active: true, path: [defaultPath[0], defaultPath[1]]});
    expect(dividedPath[1]).toEqual({active: false, path: [defaultPath[1], defaultPath[2]]});
    expect(dividedPath[2]).toEqual({active: true, path: [defaultPath[2], defaultPath[3]]});
    expect(dividedPath[3]).toEqual({active: false, path: [defaultPath[3], defaultPath[4]]});
    expect(dividedPath[4]).toEqual({active: true, path: [defaultPath[4], defaultPath[5]]});
  });

});