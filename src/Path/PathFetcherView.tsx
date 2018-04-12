import { Position, PositionInTime } from './PathFetcher';
import * as React from 'react';
import { PathInformation } from './PathInformation';

interface GetPath {
  (path: Position[]): number;
}

interface Props {
  path: PositionInTime[];
  initWatcher: () => void;
  stopWatcher: () => void;
  getPath: GetPath;
  getAverageSpeed: (path: PositionInTime[], getPath: GetPath) => number;
  geoLocationStarted: boolean;
  toLocaleTime: (time: number) => string;
}

export const PathFetcherView = (props: Props) => {
  const startButton = <button onClick={props.initWatcher}>init geo location</button>;
  const stopButton =  <button onClick={props.stopWatcher}>stop geo location</button>;
  if (!props.geoLocationStarted) {
    return <div>{startButton}</div>;
  }
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
        latitude={lastPosition.latitude}
        longitude={lastPosition.longitude}
        time={lastPosition.time}
        toLocaleTime={props.toLocaleTime}
        totalDistance={totalDistance}
        avgSpeed={averageSpeed}
      />
      {stopButton}
    </div>
  );
};