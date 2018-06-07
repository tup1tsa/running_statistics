import * as React from 'react';
import { PathWatcherFactory } from './Path/PathWatcherFactory';
import { FinishRaceFactory } from './finishRaceFactory';

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
  maxTimeBetweenPointsSecs: number;
  delaySecs: number;
  saveRace: FinishRaceFactory;
  setSaveResult: (message: string) => void;
}

interface State {
  raceTypeChosen?: string;
}

// todo: redo save run in order to save running type too (and redo backend)

export class RaceStartPreparation extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};

    this.startWatcher = this.startWatcher.bind(this);
  }

  startWatcher(type: string) {
    this.setState({raceTypeChosen: type});
  }

  render() {
    if (!this.state.raceTypeChosen) {
      return (
        <div>
          <button className="blue" id="start_running" onClick={() => this.startWatcher('running')}>Running</button>
          <button className="blue" id="start_walking" onClick={() => this.startWatcher('walking')}>Walking</button>
          <button className="blue" id="start_cycling" onClick={() => this.startWatcher('cycling')}>Cycling</button>
          <button className="green back" onClick={() => this.props.setSaveResult('')}>Back</button>
        </div>
      );
    }
    let speedLimits = this.props.speedLimits.running;
    if (this.state.raceTypeChosen === 'walking') {
      speedLimits = this.props.speedLimits.walking;
    }
    if (this.state.raceTypeChosen === 'cycling') {
      speedLimits = this.props.speedLimits.cycling;
    }
    return (
      <PathWatcherFactory
        raceType={this.state.raceTypeChosen}
        speedLimits={speedLimits}
        maxTimeBetweenPointsSecs={this.props.maxTimeBetweenPointsSecs}
        minimumDistanceDiff={this.props.minimumDistanceDiff}
        delaySecs={this.props.delaySecs}
        saveRace={this.props.saveRace}
        setSaveResult={this.props.setSaveResult}
      />
    );
  }
}