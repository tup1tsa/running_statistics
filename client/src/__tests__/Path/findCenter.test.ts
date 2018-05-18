import { findCenter } from '../../Path/findCenter';
import { Position } from '../../common_files/interfaces';

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
      { latitude: 20, longitude: 20 },
      { latitude: 25, longitude: 30 },
      { latitude: 30, longitude: 40 }
    ];
    expect(findCenter(path)).toEqual({ latitude: 25, longitude: 30 });
  });
});