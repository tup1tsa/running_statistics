import { Position } from '../../Path/PathWatcher';
import { isMiddlePointAccurate } from '../../Path/isMiddlePointAccurate';
import * as GeoLib from 'geolib';

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