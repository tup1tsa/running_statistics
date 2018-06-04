import * as React from 'react';
import { PathWatcherViewFactory } from './PathWatcherViewFactory';
import { Position, PositionInTime } from '../common_files/interfaces';

// todo: add somewhere hint that data is saving on the server currently or was successfully saved

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
  runningType: string;
  speedLimits: {
    minSpeed: number;
    maxSpeed: number;
  };
  minimumDistanceDiff: number;
  delaySecs: number;
  saveRun: (positions: PositionInTime[]) => Promise<string>;
  setSaveResult: (message: string) => void;
  geoLocation: GeoLocation;
  getDistance: GetDistance;
  isMiddlePointAccurate: (start: Position, middle: Position, end: Position, getDistance: GetDistance) => boolean;
}

interface State {
  positions: PositionInTime[];
  watcherId: number | null;
  lastTimeCheck: number | null;
  savingInProgress: boolean;
}

export class PathWatcher extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      positions: [],
      watcherId: null,
      lastTimeCheck: null,
      savingInProgress: false
    };
    this.initWatcher = this.initWatcher.bind(this);
    this.stopWatcher = this.stopWatcher.bind(this);
    this.savePosition = this.savePosition.bind(this);
  }

  initWatcher() {
    // todo: run this immediately. Start run button in watcher view factory is obsolete -> remove it
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

  async stopWatcher() {
    return new Promise((resolve) => {
      if (this.state.watcherId === null) {
        return resolve();
      }
      this.props.geoLocation.clearWatch(this.state.watcherId);
      this.setState({watcherId: null, savingInProgress: true });
      // there is no try catch in sending data to the server. Save run should not throw at all.
      // todo: path watcher view should also show that saving run is in progress
      this.props.saveRun(this.state.positions)
        .then(result => {
          this.props.setSaveResult(result);
          resolve();
        });
    });
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
    if ((currentPosition.time - this.state.lastTimeCheck) < this.props.delaySecs * 1000) {
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
    if (this.state.savingInProgress) {
      return <div>Saving in progress</div>;
    }
    return (
      <div>
        <PathWatcherViewFactory
          runningType={this.props.runningType}
          path={this.state.positions}
          initWatcher={this.initWatcher}
          stopWatcher={this.stopWatcher}
          geoLocationStarted={this.state.watcherId !== null}
        />
      </div>
    );
  }
}
