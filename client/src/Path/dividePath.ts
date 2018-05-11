import { PositionInTime } from '../common_files/interfaces';

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