import * as React from 'react';
import { RunStartPreparationFactory } from './RunStartPreparationFactory';

interface Props {}

interface State {
  runInProgress: boolean;
  finishRunMessage: string;
}

export class Navigation extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      runInProgress: false,
      finishRunMessage: ''
    };

    this.startRun = this.startRun.bind(this);
    this.finishRun = this.finishRun.bind(this);
  }

  startRun() {
    this.setState({ runInProgress: true });
  }

  finishRun(message: string) {
    this.setState({ runInProgress: false, finishRunMessage: message });
  }

  render() {
    if (this.state.runInProgress) {
      return <div><RunStartPreparationFactory setSaveResult={this.finishRun} /></div>;
    }
    return (
      <div>
        <button className="blue" id="start_run" onClick={this.startRun}>Start run</button>
        <button className="blue" id="show_stats">Show stats</button>
        <p>{this.state.finishRunMessage}</p>
      </div>
    );
  }

}