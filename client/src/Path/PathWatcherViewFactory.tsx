import { PositionInTime } from '../common_files/interfaces';
import * as GeoLib from 'geolib';
import { PathWatcherView } from './PathWatcherView';
import * as React from 'react';
import { getAverageSpeed } from './pathUtils';

interface Props {
  path: PositionInTime[];
  initWatcher: () => void;
  stopWatcher: () => void;
  geoLocationStarted: boolean;
}

const toLocaleTime = (time: number) => new Date(time).toLocaleTimeString();

export const PathWatcherViewFactory = (props: Props) => {
  return (
    <PathWatcherView
      path={props.path}
      initWatcher={props.initWatcher}
      stopWatcher={props.stopWatcher}
      getPath={GeoLib.getPathLength}
      getAverageSpeed={getAverageSpeed}
      geoLocationStarted={props.geoLocationStarted}
      toLocaleTime={toLocaleTime}
    />
  );
};