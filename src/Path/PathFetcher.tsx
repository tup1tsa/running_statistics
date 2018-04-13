import * as React from 'react';
import { PathFetcherViewFactory } from './PathFetcherViewFactory';

export interface Position {
  latitude: number;
  longitude: number;
}

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
  options: {
    minimumDistanceDiff: number;
    minimumTimeBetweenCalls: number;
  };
  geoLocation: GeoLocation;
  getDistance: GetDistance;
  isMiddlePointAccurate: (start: Position, middle: Position, end: Position, getDistance: GetDistance) => boolean;
}

interface State {
  positions: PositionInTime[];
  watcherId: number | null;
  lastTimeCheck: number | null;
  debug: {
    all: number;
    close: number;
    inAccurate: number;
    veryRecent: number;
  };
}

export class PathFetcher extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      positions: [],
      watcherId: null,
      lastTimeCheck: null,
      debug: {
        all: 0,
        close: 0,
        inAccurate: 0,
        veryRecent: 0
      }
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
  }

  savePosition(position: PositionResponse) {
    // todo: refactor this messy method. It's doing to much
    const currentState = this.state;
    const newState = {...currentState};
    newState.debug.all++;
    const currentPosition: PositionInTime = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      time: position.timestamp
    };
    // it's first position. Save it anyways
    if (currentState.lastTimeCheck === null) {
      newState.lastTimeCheck = currentPosition.time;
      newState.debug.all++;
      newState.positions.push(currentPosition);
      this.setState(newState);
      return;
    }
    const isRecent =
      (currentPosition.time - currentState.lastTimeCheck) < this.props.options.minimumTimeBetweenCalls;
    if (isRecent) {
      newState.debug.veryRecent++;
      this.setState(newState);
      return;
    }
    newState.lastTimeCheck = currentPosition.time;
    let positions = currentState.positions;
    const savedPositionsNumber = positions.length;
    const lastSavedPosition = positions[savedPositionsNumber - 1];
    const beforeLastSavedPosition = positions[savedPositionsNumber - 2];
    if (savedPositionsNumber > 0) {
      const differenceInMetres = this.props.getDistance(lastSavedPosition, currentPosition);
      if (differenceInMetres <= this.props.options.minimumDistanceDiff) {
        newState.debug.close++;
        this.setState(newState);
        return;
      }
    }
    if (savedPositionsNumber > 1) {
      const arePositionsAccurate = this.props.isMiddlePointAccurate(
        beforeLastSavedPosition,
        lastSavedPosition,
        currentPosition,
        this.props.getDistance
      );
      if (!arePositionsAccurate) {
        newState.debug.inAccurate++;
        positions.splice(savedPositionsNumber - 1, 1);
      }
    }
    positions.push(currentPosition);
    this.setState(newState);
  }

  render() {
    return (
      <div>
        <PathFetcherViewFactory
          path={this.state.positions}
          initWatcher={this.initWatcher}
          stopWatcher={this.stopWatcher}
          geoLocationStarted={!!this.state.watcherId}
        />
        <ul>
          <li>debug menu</li>
          <li>all: {this.state.debug.all}</li>
          <li>close: {this.state.debug.close}</li>
          <li>far away: {this.state.debug.inAccurate}</li>
          <li>very recent: {this.state.debug.veryRecent}</li>
        </ul>
      </div>
    );
  }
}
