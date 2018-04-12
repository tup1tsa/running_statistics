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

interface Props {
  geoLocation: GeoLocation;
  getPath: (positions: PositionInTime[]) => number;
}

interface State {
  positions: PositionInTime[];
  watcherId: number | null;
}

export class PathFetcher extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      positions: [],
      watcherId: null
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
    const currentPosition: PositionInTime = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      time: position.timestamp
    };
    let positions = this.state.positions;
    const savedPositionsNumber = positions.length;
    if (savedPositionsNumber > 0) {
      const lastSavedPosition = positions[savedPositionsNumber - 1];
      const differenceInMetres = this.props.getPath([lastSavedPosition, currentPosition]);
      if (differenceInMetres < 3) {
        return;
      }
    }
    positions.push(currentPosition);
    this.setState({positions});
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
      </div>
    );
  }
}
