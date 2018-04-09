import { path, Position } from '../Path';

it.skip('should render correct path with mock getpath method', () => {
  const coordinates: Position[] = [
    { latitude: 0, longitude: 0 },
    { latitude: 0, longitude: 1 },
    { latitude: 2, longitude: 3 }
  ];
  const fakePath = (positions: Position[]) => 23;
  // it should render correctly and check it with enzyme
  expect(path(coordinates, fakePath)).toBe(true);
});