import { validatePath } from '../../common_files/validatePath';
import { PositionInTime } from '../../Path/PathWatcher';

describe('path validation logic', () => {

  it('path should be an array', () => {
    expect(validatePath('asd')).toBe(false);
  });

  it('path should have at least two points', () => {
    const emptyPath: PositionInTime[] = [];
    const onePointPath: PositionInTime[] = [{ latitude: 23, longitude: 44, time: 22 }];
    const twoPointsPath: PositionInTime[] = [
      { latitude: 44, longitude: 17, time: 232 },
      { latitude: 22, longitude: 55, time: 3424 }
    ];
    expect(validatePath(emptyPath)).toBe(false);
    expect(validatePath(onePointPath)).toBe(false);
    expect(validatePath(twoPointsPath)).toBe(true);
  });

  it('every point should have lat, lng and time props -> all numbers', () => {
    const wrongProps = [
      { latit: 23, asd: 23},
      {}
    ];
    const wrongValues = [
      { latitude: '23', longitude: 44, time: 23 },
      { latitude: 23, longitude: 63, time: '24' }
    ];
    expect(validatePath(wrongProps)).toBe(false);
    expect(validatePath(wrongValues)).toBe(false);
  });

});