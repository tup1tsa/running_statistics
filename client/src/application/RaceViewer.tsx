import * as React from 'react';
import { Race } from './common_files/interfaces';
import { RacesOnMapFactory } from '../factories/RacesOnMapFactory';

interface Props {
  downloadRaces: () => Promise<Race[]>;
}

interface State {
  races: Race[];
  downloadInProgress: boolean;
  fetchingErrorMessage?: string;
}

export class RaceViewer extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      races: [],
      downloadInProgress: false
    };
  }

  async componentDidMount() {
    let races: Race[];
    this.setState({ downloadInProgress: true });
    try {
      races = await this.props.downloadRaces();
      this.setState({races, downloadInProgress: false });
    } catch (e) {
      this.setState({fetchingErrorMessage: e.message, downloadInProgress: false });
      return;
    }
  }

  render() {
    if (this.state.fetchingErrorMessage) {
      return <p>{this.state.fetchingErrorMessage}</p>;
    }
    if (this.state.downloadInProgress) {
      return <p>Races are being downloaded at the moment</p>;
    }
    if (this.state.races.length === 0) {
      return <p>No races are available</p>;
    }
    return <RacesOnMapFactory races={this.state.races} size={{ width: 1000, height: 1000 }} />;
  }
}