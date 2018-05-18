import { Position } from '../common_files/interfaces';

export const findCenter = (path: Position[]): Position => {
  const error = 'path should contain at least one point';
  if (path.length === 0) {
    throw new Error(error);
  }
  const findTotalLatLng = (total: Position, current: Position) => {
    return {
      latitude: total.latitude + current.latitude,
      longitude: total.longitude + current.longitude
    };
  };
  const totalLatLng = path.reduce(findTotalLatLng);
  return {
    latitude: totalLatLng.latitude / path.length,
    longitude: totalLatLng.longitude / path.length
  };
};