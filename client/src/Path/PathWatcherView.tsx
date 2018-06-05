import { PositionInTime } from '../common_files/interfaces';
import * as React from 'react';
import { PathInformation } from './PathInformation';
import { GetActivePathDataFactory } from './pathUtilsFactories';
import { SpeedLimits } from '../RunStartPreparation';

interface Props {
  runningType: string;
  speedLimits: SpeedLimits;
  maxTimeBetweenPointsSecs: number;
  getActivePathData: GetActivePathDataFactory;
  path: PositionInTime[];
  stopWatcher: () => Promise<{}>;
  toLocaleTime: (time: number) => string;
}

export const PathWatcherView = (props: Props) => {
  const stopButton =  <button className="blue" onClick={props.stopWatcher}>Finish</button>;
  if (props.path.length === 0) {
    return (
      <div>
        <div>geo location is initializing</div>
        {stopButton}
      </div>
    );
  }
  let totalDistance = 0;
  let averageSpeed = 0;
  let totalTimeSecs = 0;
  const lastPosition = props.path[props.path.length - 1];
  if (props.path.length > 1) {
    const data = props.getActivePathData(props.path, props.speedLimits, props.maxTimeBetweenPointsSecs);
    totalDistance = data.distance;
    averageSpeed = data.averageSpeed;
    totalTimeSecs = data.timeSecs;
  }
  return (
    <div>
      <PathInformation
        runningType={props.runningType}
        lastTimeCheck={lastPosition.time}
        toLocaleTime={props.toLocaleTime}
        totalDistance={totalDistance}
        totalTimeSecs={totalTimeSecs}
        avgSpeed={averageSpeed}
      />
      {stopButton}
    </div>
  );
};