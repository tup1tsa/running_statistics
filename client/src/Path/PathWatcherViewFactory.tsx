import { PositionInTime } from '../common_files/interfaces';
import { PathWatcherView } from './PathWatcherView';
import * as React from 'react';
import { getActivePathDataFactory } from './pathUtilsFactories';
import { SpeedLimits } from '../RaceStartPreparation';

interface Props {
  path: PositionInTime[];
  raceType: string;
  speedLimits: SpeedLimits;
  maxTimeBetweenPointsSecs: number;
  stopWatcher: () => Promise<{}>;
}

const toLocaleTime = (time: number) => new Date(time).toLocaleTimeString();

export const PathWatcherViewFactory = (props: Props) => {
  return (
    <PathWatcherView
      raceType={props.raceType}
      path={props.path}
      stopWatcher={props.stopWatcher}
      toLocaleTime={toLocaleTime}
      getActivePathData={getActivePathDataFactory}
      speedLimits={props.speedLimits}
      maxTimeBetweenPointsSecs={props.maxTimeBetweenPointsSecs}
    />
  );
};