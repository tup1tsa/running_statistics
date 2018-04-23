import * as React from 'react';
import { PositionInTime } from './Path/PathFetcher';
import { PathFetcherFactory } from './Path/PathFetcherFactory';

export interface Response {
  // tslint:disable-next-line no-any
  data?: any;
  status: number;
}

interface Axios {
  get(url: string): Promise<Response>;
  // tslint:disable-next-line no-any
  post(url: string, data?: any): Promise<Response>;
}

interface LocalStorage {
  getItem(item: string): string | null;
  setItem(item: string, data: string): void;
}

interface Run {
  finishTime: number;
  positions: PositionInTime[];
}

interface Props {
  axios: Axios;
  localStorage: LocalStorage;
}

interface State {
  runs: Run[];
}

export class Running extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.saveRun = this.saveRun.bind(this);
    this.sendRunToSever = this.sendRunToSever.bind(this);
    this.sendAllRunsToSever = this.sendAllRunsToSever.bind(this);
    this.clearLocalStorage = this.clearLocalStorage.bind(this);
  }

  async componentDidMount() {
    const runs = this.getRunsFromLocalStorage();
    if (runs.length === 0) {
      return;
    }
    let response: Response;
    try {
      response = await this.sendAllRunsToSever(runs);
    } catch (e) {
      response = e.response;
    }
    if (response.status === 200 && response.data.saved === true) {
      this.clearLocalStorage();
    }
  }

  async saveRun(run: PositionInTime[]): Promise<void> {
    let response: Response;
    try {
      response = await this.sendRunToSever(run);
    } catch (e) {
      response = e.response;
    }
    if (response.status !== 200 || response.data.saved !== true) {
      this.saveRunToLocalStorage(run);
    }
  }

  async sendRunToSever(run: PositionInTime[]): Promise<Response> {
    return this.props.axios.post('/saveRun', run);
  }

  async sendAllRunsToSever(runs: PositionInTime[][]): Promise<Response> {
    return this.props.axios.post('/saveRuns', runs);
  }

  getRunsFromLocalStorage(): PositionInTime[][] {
    const runs = this.props.localStorage.getItem('runs');
    if (runs === null) {
      return [];
    }
    // todo: possible failure part. There should be validation
    return JSON.parse(runs) as Array<Array<PositionInTime>>;
  }

  saveRunToLocalStorage(run: PositionInTime[]) {
    const previousRuns = this.getRunsFromLocalStorage();
    previousRuns.push(run);
    this.props.localStorage.setItem('runs', JSON.stringify(previousRuns));
  }

  clearLocalStorage() {
    this.props.localStorage.setItem('runs', JSON.stringify([]));
  }

  render() {
    return (
      <PathFetcherFactory
        minimumDistanceDiff={10}
        minimumTimeBetweenCalls={10000}
        saveRun={this.saveRun}
      />
    );
  }

}
