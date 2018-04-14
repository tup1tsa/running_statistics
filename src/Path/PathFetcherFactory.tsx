import * as React from 'react';
import { PathFetcher, PositionInTime } from './PathFetcher';
import * as GeoLib from 'geolib';
import { isMiddlePointAccurate } from './isMiddlePointAccurate';

interface Props {
  minimumDistanceDiff: number;
  minimumTimeBetweenCalls: number;
  sendPositions: (positions: PositionInTime[]) => void;
}

export const PathFetcherFactory = (props: Props) => (
  <PathFetcher
    {...props}
    geoLocation={navigator.geolocation}
    getDistance={GeoLib.getDistance}
    isMiddlePointAccurate={isMiddlePointAccurate}
  />
);