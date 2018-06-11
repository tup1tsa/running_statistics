import * as React from 'react';
import { PathWatcherFactory } from './Path/PathWatcherFactory';
import { FinishRaceFactory } from './finishRaceFactory';

interface Props {
  minimumDistanceDiff: number;
  delaySecs: number;
  saveRace: FinishRaceFactory;
  setSaveResult: (message: string) => void;
}

interface State {
  raceTypeChosen?: string;
}

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
    return (
      <PathWatcherFactory
        raceType={this.state.raceTypeChosen}
        minimumDistanceDiff={this.props.minimumDistanceDiff}
        delaySecs={this.props.delaySecs}
        saveRace={this.props.saveRace}
        setSaveResult={this.props.setSaveResult}
      />
    );
  }
}