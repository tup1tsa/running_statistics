import * as React from "react";
import { FinishRaceFactory } from "../../factories/finishRaceFactory";
import { PathWatcherViewFactory } from "../../factories/Path/PathWatcherViewFactory";
import { Position, PositionInTime, Race } from "../common_files/interfaces";

export interface PositionResponse {
  // date is used instead of number is UC Mini browser
  readonly timestamp: number | Date;
  readonly coords: Position;
}

export type SuccessWatchCallback = (position: PositionResponse) => void;

interface ErrorPosition {
  readonly code: number;
  readonly message: string;
}

export type ErrorWatchCallback = (error: ErrorPosition) => void;

export interface Options {
  readonly enableHighAccuracy: boolean;
}

export interface GeoLocation {
  clearWatch(watchId: number): void;
  watchPosition(
    successCallback: SuccessWatchCallback,
    errorCallback?: ErrorWatchCallback,
    options?: Options
  ): number;
}

type GetDistance = (start: Position, end: Position) => number;

interface Props {
  readonly raceType: string;
  readonly minimumDistanceDiff: number;
  readonly delaySecs: number;
  readonly saveRace: FinishRaceFactory;
  readonly setSaveResult: (message: string) => void;
  readonly geoLocation: GeoLocation;
  readonly getDistance: GetDistance;
  isMiddlePointAccurate: (
    start: Position,
    middle: Position,
    end: Position,
    getDistance: GetDistance
  ) => boolean;
}

interface State {
  readonly positions: ReadonlyArray<PositionInTime>;
  readonly watcherId: number | null;
  readonly lastTimeCheck: number | null;
  readonly savingInProgress: boolean;
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

  public componentWillMount() {
    this.initWatcher();
  }

  public initWatcher() {
    if (this.state.watcherId !== null) {
      return;
    }
    const watcherId = this.props.geoLocation.watchPosition(
      this.savePosition,
      () => undefined,
      { enableHighAccuracy: true }
    );
    this.setState({ watcherId });
  }

  public async stopWatcher() {
    return new Promise(resolve => {
      if (this.state.watcherId === null) {
        return resolve();
      }
      this.props.geoLocation.clearWatch(this.state.watcherId);
      this.setState({ watcherId: null, savingInProgress: true });
      // there is no try catch in sending data to the server. Save run should not throw at all.
      const race: Race = {
        type: this.props.raceType,
        path: this.state.positions
      };
      this.props.saveRace(race).then(result => {
        this.props.setSaveResult(result);
        resolve();
      });
    });
  }

  public savePosition(position: PositionResponse) {
    const timeStamp =
      typeof position.timestamp === "number"
        ? position.timestamp
        : position.timestamp.getTime();
    const currentPosition: PositionInTime = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      time: timeStamp
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
    if (
      currentPosition.time - this.state.lastTimeCheck <
      this.props.delaySecs * 1000
    ) {
      return;
    }
    const positions = this.state.positions.slice(0);
    const savedPositionsNumber = positions.length;
    const lastSavedPosition = positions[savedPositionsNumber - 1];
    const beforeLastSavedPosition = positions[savedPositionsNumber - 2];
    const differenceInMetres = this.props.getDistance(
      lastSavedPosition,
      currentPosition
    );
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

  public render() {
    if (this.state.savingInProgress) {
      return <div>Saving in progress</div>;
    }
    const race = { type: this.props.raceType, path: this.state.positions };
    return (
      <div>
        <PathWatcherViewFactory race={race} stopWatcher={this.stopWatcher} />
      </div>
    );
  }
}
