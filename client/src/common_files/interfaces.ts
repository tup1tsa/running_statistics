export interface Position {
  latitude: number;
  longitude: number;
}

export interface PositionInTime extends Position {
  time: number;
}

export interface Race {
  type: string;
  path: PositionInTime[];
}