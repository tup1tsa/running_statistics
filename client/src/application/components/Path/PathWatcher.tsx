import * as React from "react";
import { PathWatcherViewFactory } from "../../../containers/components/Path/PathWatcherViewFactory";
import { FinishRaceContainer } from "../../../containers/logic/finishRaceContainer";
import {
  GetDistance,
  Position,
  PositionInTime,
  Race
} from "../../common_files/interfaces";
import { IsMiddlePointAccurate } from "../../logic/path/isMiddlePointAccurate";

export interface PositionResponse {
  // date is used instead of number is UC Mini browser
  readonly timestamp: number | Date;
  readonly coords: Position;
}

export type SuccessWatchCallback = (position: PositionResponse) => void;

export interface ErrorPosition {
  readonly code: number;
  readonly message: string;
}

export type ErrorWatchCallback = (error: PositionError) => void;

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

interface Props {
  readonly raceType: string;
  readonly minimumDistanceDiff: number;
  readonly delaySecs: number;
  readonly saveRace: FinishRaceContainer;
  readonly setSaveResult: (message: string) => void;
  readonly geoLocation: GeoLocation;
  readonly getDistance: GetDistance;
  readonly isMiddlePointAccurate: IsMiddlePointAccurate;
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
  }

  public componentWillMount() {
    this.initWatcher();
  }

  public initWatcher() {
    if (this.state.watcherId !== null) {
      return;
    }
    const watcherId = this.props.geoLocation.watchPosition(
      () => null,
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
