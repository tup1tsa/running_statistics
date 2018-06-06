import * as React from 'react';
import { PathWatcher } from './PathWatcher';
import * as GeoLib from 'geolib';
import { isMiddlePointAccurate } from './pathUtils';
import { SaveRaceFactory } from '../saveRaceFactory';

interface Props {
  raceType: string;
  speedLimits: {
    minSpeed: number;
    maxSpeed: number;
  };
  maxTimeBetweenPointsSecs: number;
  minimumDistanceDiff: number;
  delaySecs: number;
  saveRace: SaveRaceFactory;
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