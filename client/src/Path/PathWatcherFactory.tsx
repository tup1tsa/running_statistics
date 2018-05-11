import * as React from 'react';
import { PathWatcher } from './PathWatcher';
import * as GeoLib from 'geolib';
import { isMiddlePointAccurate } from './isMiddlePointAccurate';
import { PositionInTime } from '../common_files/interfaces';

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