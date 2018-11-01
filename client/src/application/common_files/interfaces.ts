export interface Position {
  readonly latitude: number;
  readonly longitude: number;
}

export interface PositionInTime extends Position {
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
  // tslint:disable-next-line no-any
  readonly data?: any;
  readonly status: number;
}

export interface Axios {
  get(url: string): Promise<Response>;
  // tslint:disable-next-line no-any
  post(url: string, data?: any): Promise<Response>;
}

export type GetPath = (positions: ReadonlyArray<PositionInTime>) => number;

export type GetDistance = (start: Position, end: Position) => number;
