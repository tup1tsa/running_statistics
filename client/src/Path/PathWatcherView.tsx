import { PositionInTime } from '../common_files/interfaces';
import * as React from 'react';
import { PathInformation } from './PathInformation';
import { Position } from '../common_files/interfaces';

interface GetPath {
  (path: Position[]): number;
}

interface Props {
  runningType: string;
  path: PositionInTime[];
  stopWatcher: () => Promise<{}>;
  getPath: GetPath;
  getAverageSpeed: (path: PositionInTime[], getPath: GetPath) => number;
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
  const lastPosition = props.path[props.path.length - 1];
  if (props.path.length > 1) {
    totalDistance = props.getPath(props.path);
    averageSpeed = props.getAverageSpeed(props.path, props.getPath);
  }
  return (
    <div>
      <PathInformation
        runningType={props.runningType}
        time={lastPosition.time}
        toLocaleTime={props.toLocaleTime}
        totalDistance={totalDistance}
        avgSpeed={averageSpeed}
      />
      {stopButton}
    </div>
  );
};