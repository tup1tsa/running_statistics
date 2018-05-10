import { PositionInTime } from './PathFetcher';

interface Config {
  minSpeed: number;
  maxSpeed: number;
  minPoints?: number;
  minDistance?: number;
}

export const dividePath = (path: PositionInTime[], config: Config): PositionInTime[][] => {
  // todo: finish it. Divided path would be used in sparse polyline
  return [];
};