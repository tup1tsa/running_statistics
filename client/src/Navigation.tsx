import * as React from 'react';
import { RaceStartPreparationFactory } from './RaceStartPreparationFactory';

interface Props {}

interface State {
  raceInProgess: boolean;
  finishRaceMessage: string;
}

export class Navigation extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      raceInProgess: false,
      finishRaceMessage: ''
    };

    this.startRace = this.startRace.bind(this);
    this.finishRace = this.finishRace.bind(this);
  }

  startRace() {
    this.setState({ raceInProgess: true });
  }

  finishRace(message: string) {
    this.setState({ raceInProgess: false, finishRaceMessage: message });
  }

  render() {
    if (this.state.raceInProgess) {
      return <div><RaceStartPreparationFactory setSaveResult={this.finishRace} /></div>;
    }
    return (
      <div>
        <button className="blue" id="start_race" onClick={this.startRace}>Start race</button>
        <button className="blue" id="show_stats">Show stats</button>
        <p>{this.state.finishRaceMessage}</p>
      </div>
    );
  }

}