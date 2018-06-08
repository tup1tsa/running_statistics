import * as React from 'react';
import { RaceStartPreparationFactory } from './RaceStartPreparationFactory';
import { RaceStatsFactory } from './RaceStatsFactory';

interface Props {}

interface State {
  activeBlock: string;
  finishRaceMessage: string;
}

export class Navigation extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      activeBlock: '',
      finishRaceMessage: ''
    };

    this.startRace = this.startRace.bind(this);
    this.finishRace = this.finishRace.bind(this);
    this.showStatsBlock = this.showStatsBlock.bind(this);
  }

  startRace() {
    this.setState({ activeBlock: 'race' });
  }

  finishRace(message: string) {
    this.setState({ activeBlock: '', finishRaceMessage: message });
  }

  showStatsBlock() {
    this.setState({ activeBlock: 'stats'});
  }

  render() {
    if (this.state.activeBlock === 'race') {
      return <div><RaceStartPreparationFactory setSaveResult={this.finishRace} /></div>;
    }
    return (
      <div>
        <button className="blue" id="start_race" onClick={this.startRace}>Start race</button>
        <button className="blue" id="show_stats" onClick={this.showStatsBlock}>Show stats</button>
        {this.state.activeBlock === 'stats' ? <RaceStatsFactory /> : <p>{this.state.finishRaceMessage}</p>}
      </div>
    );
  }

}