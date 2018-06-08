import { PositionInTime, Race } from '../common_files/interfaces';
import { SpeedLimits } from '../RaceStartPreparation';
import {
  DividedPathPart,
  dividePath,
  divideRace,
  getActiveParts,
  getActivePathData,
  getAverageSpeed
} from './pathUtils';
import * as Geolib from 'geolib';
import { raceSettings } from '../common_files/config';

export interface GetActivePathDataFactory {
  (path: PositionInTime[], speedLimits: SpeedLimits, maxTimeBetweenPointsSecs: number):
    { timeSecs: number, distance: number, averageSpeed: number };
}

export interface DivideRaceFactory {
  (race: Race): DividedPathPart[];
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

export const divideRaceFactory: DivideRaceFactory = (race) =>
  divideRace(race, raceSettings, getAverageSpeed, Geolib.getPathLength, dividePath);