import * as React from 'react';

export interface Position {
  latitude: number;
  longitude: number;
}

export interface PositionInTime extends Position{
  time: number;
}

interface GetPath {
  (positions: Position[]): number;
}

interface GetSpeed {
  (positions: PositionInTime[]): number;
}

export const path = (coords: Position[], getPath: GetPath, getSpeed: GetSpeed) => {
  return <div>total path would be here</div>;
};