import { PositionInTime } from '../common_files/interfaces';

interface FetchPathsFromStorage {
  (): PositionInTime[][];
}

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

export interface SendPathsToServer {
  (
    fetchPaths: FetchPathsFromStorage,
    axios: Axios,
    clearStorage: () => void
  ): Promise<string>;
}

interface SendPathsToServerFactory {
  (): Promise<string>;
}

interface SendPathsToServerWithTimeout {
  (sendPaths: SendPathsToServerFactory, timeoutSecs: number): Promise<string>;
}

export const sendPathsToServer: SendPathsToServer = async (fetchPaths, axios, clearStorage) => {
  const paths = fetchPaths();
  if (paths.length === 0) {
    return 'There is nothing to save';
  }
  let response: Response;
  try {
    response = await axios.post('/saveRuns', paths);
  } catch (e) {
    response = e.response;
  }
  if (response.status === 200 && response.data && response.data.saved === true) {
    clearStorage();
    return 'Runs were successfully saved';
  }
  if (response.data && response.data.saved === false) {
    return 'There were some problems on server. Saving unsuccessful';
  }
  return 'Unexpected error during saving';
};

export const sendPathsToServerWithTimeout: SendPathsToServerWithTimeout = (sendPaths, timeoutSecs) => {
  const timeOut = (): Promise<string> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve('Timeout'), timeoutSecs * 1000);
    });
  };
  return Promise.race([sendPaths(), timeOut()]);
};