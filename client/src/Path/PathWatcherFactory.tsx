import * as React from 'react';
import { PathWatcher } from './PathWatcher';
import * as GeoLib from 'geolib';
import { PositionInTime } from '../common_files/interfaces';
import { isMiddlePointAccurate } from './pathUtils';

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