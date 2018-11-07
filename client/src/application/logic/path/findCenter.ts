import { Coordinates } from "../../common_files/interfaces";

export type FindCenter = (path: ReadonlyArray<Coordinates>) => Coordinates;

export const findCenter: FindCenter = path => {
  const error = "path should contain at least one point";
  if (path.length === 0) {
    throw new Error(error);
  }
  const latitudes = path.map(position => position.latitude);
  const longitudes = path.map(position => position.longitude);
  const minLatitude = Math.min(...latitudes);
  const maxLatitude = Math.max(...latitudes);
  const minLongitude = Math.min(...longitudes);
  const maxLongitude = Math.max(...longitudes);
  return {
    latitude: (minLatitude + maxLatitude) / 2,
    longitude: (minLongitude + maxLongitude) / 2
  };
};
