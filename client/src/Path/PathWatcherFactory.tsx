import * as React from 'react';
import { PathWatcher, PositionInTime } from './PathWatcher';
import * as GeoLib from 'geolib';
import { isMiddlePointAccurate } from './isMiddlePointAccurate';

interface Props {
  minimumDistanceDiff: number;
  minimumTimeBetweenCalls: number;
  saveRun: (positions: PositionInTime[]) => void;
}

export const PathWatcherFactory = (props: Props) => (
  <PathWatcher
    {...props}
    geoLocation={navigator.geolocation}
    getDistance={GeoLib.getDistance}
    isMiddlePointAccurate={isMiddlePointAccurate}
  />
);