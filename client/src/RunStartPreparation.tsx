import * as React from 'react';
import { PositionInTime } from './common_files/interfaces';
import { PathWatcherFactory } from './Path/PathWatcherFactory';

export interface SpeedLimits {
  minSpeed: number;
  maxSpeed: number;
}

interface Props {
  speedLimits: {
    walking: SpeedLimits;
    running: SpeedLimits;
    cycling: SpeedLimits;
  };
  minimumDistanceDiff: number;
  delaySecs: number;
  saveRun: (positions: PositionInTime[]) => Promise<string>;
  setSaveResult: (message: string) => void;
}

interface State {
  runTypeChosen?: string;
}

// todo: redo save run in order to save running type too (and redo backend)

export class RunStartPreparation extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};

    this.startWatcher = this.startWatcher.bind(this);
  }

  startWatcher(type: string) {
    this.setState({runTypeChosen: type});
  }

  render() {
    if (!this.state.runTypeChosen) {
      return (
        <div>
          <button className="blue" id="start_running" onClick={() => this.startWatcher('running')}>Running</button>
          <button className="blue" id="start_walking" onClick={() => this.startWatcher('walking')}>Walking</button>
          <button className="blue" id="start_cycling" onClick={() => this.startWatcher('cycling')}>Cycling</button>
          <button className="blue back" onClick={() => this.props.setSaveResult('')}>Back</button>
        </div>
      );
    }
    let speedLimits = this.props.speedLimits.running;
    if (this.state.runTypeChosen === 'walking') {
      speedLimits = this.props.speedLimits.walking;
    }
    if (this.state.runTypeChosen === 'cycling') {
      speedLimits = this.props.speedLimits.cycling;
    }
    return (
      <PathWatcherFactory
        runningType={this.state.runTypeChosen}
        speedLimits={speedLimits}
        minimumDistanceDiff={this.props.minimumDistanceDiff}
        delaySecs={this.props.delaySecs}
        saveRun={this.props.saveRun}
        setSaveResult={this.props.setSaveResult}
      />
    );
  }
}