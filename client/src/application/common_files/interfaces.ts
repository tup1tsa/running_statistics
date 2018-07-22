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

interface RaceLimits {
  minSpeed: number;
  maxSpeed: number;
  maximumTimeBetweenPointsSecs: number;
}

export interface RaceSettings {
  walking: RaceLimits;
  running: RaceLimits;
  cycling: RaceLimits;
}

export interface LocalStorage {
  getItem(item: string): string | null;
  setItem(item: string, data: string): void;
}

export interface Response {
  // tslint:disable-next-line no-any
  data?: any;
  status: number;
}

export interface Axios {
  get(url: string): Promise<Response>;
  // tslint:disable-next-line no-any
  post(url: string, data?: any): Promise<Response>;
}