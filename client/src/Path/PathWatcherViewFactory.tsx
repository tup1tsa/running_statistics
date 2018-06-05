import { PositionInTime } from '../common_files/interfaces';
import { PathWatcherView } from './PathWatcherView';
import * as React from 'react';
import { getActivePathDataFactory } from './pathUtilsFactories';
import { SpeedLimits } from '../RunStartPreparation';

interface Props {
  path: PositionInTime[];
  runningType: string;
  speedLimits: SpeedLimits;
  maxTimeBetweenPointsSecs: number;
  stopWatcher: () => Promise<{}>;
}

const toLocaleTime = (time: number) => new Date(time).toLocaleTimeString();

export const PathWatcherViewFactory = (props: Props) => {
  return (
    <PathWatcherView
      runningType={props.runningType}
      path={props.path}
      stopWatcher={props.stopWatcher}
      toLocaleTime={toLocaleTime}
      getActivePathData={getActivePathDataFactory}
      speedLimits={props.speedLimits}
      maxTimeBetweenPointsSecs={props.maxTimeBetweenPointsSecs}
    />
  );
};