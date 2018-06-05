import { PositionInTime } from '../common_files/interfaces';
import * as GeoLib from 'geolib';
import { PathWatcherView } from './PathWatcherView';
import * as React from 'react';
import { getAverageSpeed } from './pathUtils';

interface Props {
  path: PositionInTime[];
  runningType: string;
  stopWatcher: () => Promise<{}>;
}

const toLocaleTime = (time: number) => new Date(time).toLocaleTimeString();

export const PathWatcherViewFactory = (props: Props) => {
  return (
    <PathWatcherView
      runningType={props.runningType}
      path={props.path}
      stopWatcher={props.stopWatcher}
      getPath={GeoLib.getPathLength}
      getAverageSpeed={getAverageSpeed}
      toLocaleTime={toLocaleTime}
    />
  );
};