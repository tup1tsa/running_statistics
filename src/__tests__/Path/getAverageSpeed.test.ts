import { getAverageSpeed } from '../../Path/getAverageSpeed';
import { PositionInTime } from '../../Path/PathFetcher';

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