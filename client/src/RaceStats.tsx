import * as React from 'react';
import { Race } from './common_files/interfaces';
import { RacesOnMapFactory } from './RacesOnMapFactory';
import { DivideRaceFactory } from './Path/pathUtilsFactories';

interface Props {
  downloadRaces: () => Promise<Race[]>;
  divideRace: DivideRaceFactory;
}

interface State {
  races: Race[];
  fetchingErrorMessage?: string;
}

export class RaceStats extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      races: []
    };
  }

  async componentDidMount() {
    let races: Race[];
    try {
      races = await this.props.downloadRaces();
      this.setState({races});
    } catch (e) {
      this.setState({fetchingErrorMessage: e.message});
      return;
    }
  }

  render() {
    if (this.state.fetchingErrorMessage) {
      return <p>{this.state.fetchingErrorMessage}</p>;
    }
    if (this.state.races.length === 0) {
      return <p>No races are available</p>;
    }
    const dividedRaces = this.state.races.map(race => this.props.divideRace(race));
    return <RacesOnMapFactory races={dividedRaces} size={{ width: 1000, height: 1000 }} />;
  }
}