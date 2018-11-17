export interface Coordinates {
  readonly latitude: number;
  readonly longitude: number;
}

export interface PositionInTime extends Coordinates {
  readonly time: number;
}

export interface Race {
  readonly type: string;
  readonly path: ReadonlyArray<PositionInTime>;
}

interface RaceLimits {
  readonly minSpeed: number;
  readonly maxSpeed: number;
  readonly maximumTimeBetweenPointsSecs: number;
}

export interface RaceSettings {
  readonly walking: RaceLimits;
  readonly running: RaceLimits;
  readonly cycling: RaceLimits;
}

export interface LocalStorage {
  getItem(item: string): string | null;
  setItem(item: string, data: string): void;
}

export interface Response {
  readonly data?: any;
  readonly status: number;
}

export interface Axios {
  get(url: string): Promise<Response>;
  post(url: string, data?: any): Promise<Response>;
}

export interface UserInfo {
  readonly name: string;
  readonly email: string;
  readonly password: string;
}

export type GetPath = (positions: ReadonlyArray<PositionInTime>) => number;

export type GetDistance = (start: Coordinates, end: Coordinates) => number;

export type GetSpeed = (start: Coordinates, end: Coordinates) => number;
