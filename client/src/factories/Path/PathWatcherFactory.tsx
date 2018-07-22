import * as React from 'react';
import { PathWatcher } from '../../application/Path/PathWatcher';
import * as GeoLib from 'geolib';
import { isMiddlePointAccurate } from '../../application/Path/pathUtils';
import { FinishRaceFactory } from '../finishRaceFactory';

interface Props {
  raceType: string;
  minimumDistanceDiff: number;
  delaySecs: number;
  saveRace: FinishRaceFactory;
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