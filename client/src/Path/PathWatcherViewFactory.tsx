import { PositionInTime } from './PathWatcher';
import * as GeoLib from 'geolib';
import { getAverageSpeed } from './getAverageSpeed';
import { PathWatcherView } from './PathWatcherView';
import * as React from 'react';

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