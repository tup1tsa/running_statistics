import * as React from 'react';
import { PathWatcherViewFactory } from './PathWatcherViewFactory';

export interface Position {
  latitude: number;
  longitude: number;
}
// todo: move position in time from here to common files (it's used on the server)
// todo: probably move folder common files to the server src directory? (it creates weird structure in server/dist)
export interface PositionInTime extends Position {
  time: number;
}

export interface PositionResponse {
  timestamp: number;
  coords: Position;
}

export interface SuccessWatchCallback {
  (position: PositionResponse): void;
}

interface ErrorPosition {
  code: number;
  message: string;
}

export interface ErrorWatchCallback {
  (error: ErrorPosition): void;
}

export interface Options {
  enableHighAccuracy: boolean;
}

export interface GeoLocation {
  clearWatch(watchId: number): void;
  watchPosition(
    successCallback: SuccessWatchCallback,
    errorCallback?: ErrorWatchCallback,
    options?: Options
  ): number;
}

interface GetDistance {
  (start: Position, end: Position): number;
}

interface Props {
  minimumDistanceDiff: number;
  minimumTimeBetweenCalls: number;
  saveRun: (positions: PositionInTime[]) => void;
  geoLocation: GeoLocation;
  getDistance: GetDistance;
  isMiddlePointAccurate: (start: Position, middle: Position, end: Position, getDistance: GetDistance) => boolean;
}

interface State {
  positions: PositionInTime[];
  watcherId: number | null;
  lastTimeCheck: number | null;
}

export class PathWatcher extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      positions: [],
      watcherId: null,
      lastTimeCheck: null,
    };
    this.initWatcher = this.initWatcher.bind(this);
    this.stopWatcher = this.stopWatcher.bind(this);
    this.savePosition = this.savePosition.bind(this);
  }

  initWatcher() {
    if (this.state.watcherId !== null) {
      return;
    }
    const watcherId = this.props.geoLocation.watchPosition(
      this.savePosition,
      () => undefined,
      {enableHighAccuracy: true}
      );
    this.setState({watcherId});
  }

  stopWatcher() {
    if (this.state.watcherId === null) {
      return;
    }
    this.props.geoLocation.clearWatch(this.state.watcherId);
    this.setState({watcherId: null});
    this.props.saveRun(this.state.positions);
  }

  savePosition(position: PositionResponse) {
    const currentPosition: PositionInTime = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      time: position.timestamp
    };
    // it's first position. Save it anyways
    if (this.state.lastTimeCheck === null) {
      this.setState({
        lastTimeCheck: currentPosition.time,
        positions: this.state.positions.concat([currentPosition])
      });
      return;
    }
    // this position is too recent -> ignore it
    if ((currentPosition.time - this.state.lastTimeCheck) < this.props.minimumTimeBetweenCalls) {
      return;
    }
    let positions = this.state.positions.slice(0);
    const savedPositionsNumber = positions.length;
    const lastSavedPosition = positions[savedPositionsNumber - 1];
    const beforeLastSavedPosition = positions[savedPositionsNumber - 2];
    const differenceInMetres = this.props.getDistance(lastSavedPosition, currentPosition);
    // this position is very close to the last saved -> ignore it
    if (differenceInMetres <= this.props.minimumDistanceDiff) {
      this.setState({ lastTimeCheck: currentPosition.time });
      return;
    }
    if (savedPositionsNumber > 1) {
      const arePositionsAccurate = this.props.isMiddlePointAccurate(
        beforeLastSavedPosition,
        lastSavedPosition,
        currentPosition,
        this.props.getDistance
      );
      // beforeLast position was geo location error and was corrected by current position. Remove it
      if (!arePositionsAccurate) {
        positions.splice(savedPositionsNumber - 1, 1);
      }
    }
    positions.push(currentPosition);
    this.setState({
      positions,
      lastTimeCheck: currentPosition.time
    });
  }

  render() {
    return (
      <div>
        <PathWatcherViewFactory
          path={this.state.positions}
          initWatcher={this.initWatcher}
          stopWatcher={this.stopWatcher}
          geoLocationStarted={this.state.watcherId !== null}
        />
      </div>
    );
  }
}
