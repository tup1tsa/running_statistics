import { PositionInTime } from './interfaces';

// tslint:disable-next-line no-any
export const validatePath = (path: any): path is PositionInTime[] => {
  if (!Array.isArray(path)) {
    return false;
  }
  if (path.length <= 1) {
    return false;
  }
  return path.every(position => {
    if (typeof position !== 'object') {
      return false;
    }
    const values = [position.latitude, position.longitude, position.time];
    return values.every((value) => typeof value === 'number');
  });
};