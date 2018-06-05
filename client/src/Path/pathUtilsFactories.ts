import { PositionInTime } from '../common_files/interfaces';
import { SpeedLimits } from '../RunStartPreparation';
import { dividePath, getActiveParts, getActivePathData, getAverageSpeed } from './pathUtils';
import * as Geolib from 'geolib';

export interface GetActivePathDataFactory {
  (path: PositionInTime[], speedLimits: SpeedLimits, maxTimeBetweenPointsSecs: number):
    { timeSecs: number, distance: number, averageSpeed: number };
}

export const getActivePathDataFactory: GetActivePathDataFactory = (path, speedLimits, maxTimeBetweenPointsSecs) => {
  const divideConfig = {
    minSpeed: speedLimits.minSpeed,
    maxSpeed: speedLimits.maxSpeed,
    maxTimeBetweenPointsSecs,
    getAverageSpeed,
    getPath: Geolib.getPathLength
  };
  const dividedPath = dividePath(path, divideConfig);
  return getActivePathData(dividedPath, Geolib.getPathLength, getActiveParts);
};