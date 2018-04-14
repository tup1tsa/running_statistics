import * as React from 'react';
import { PositionInTime } from './Path/PathFetcher';

interface Run {
  finishTime: number;
  positions: PositionInTime[];
}

interface Props {

}

interface State {
  runs: Run[];
}

export class RunsHistory extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.startNewHistory = this.startNewHistory.bind(this);
  }

  startNewHistory() {
    this.setState({runs: []});
  }

  render() {
    return <button onClick={this.startNewHistory}>start brand new history</button>;
  }

}