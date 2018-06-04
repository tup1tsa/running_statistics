import * as React from 'react';
import { PathWatcher } from './PathWatcher';
import * as GeoLib from 'geolib';
import { PositionInTime } from '../common_files/interfaces';
import { isMiddlePointAccurate } from './pathUtils';

interface Props {
  runningType: string;
  speedLimits: {
    minSpeed: number;
    maxSpeed: number;
  };
  minimumDistanceDiff: number;
  delaySecs: number;
  saveRun: (positions: PositionInTime[]) => Promise<string>;
  setSaveResult: (message: string) => void;
}

export const PathWatcherFactory = (props: Props) => (
  <PathWatcher
    {...props}
    geoLocation={navigator.geolocation}
    getDistance={GeoLib.getDistance}
    isMiddlePointAccurate={isMiddlePointAccurate}
    setSaveResult={props.setSaveResult}
  />
);