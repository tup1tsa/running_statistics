import { PositionInTime } from './PathFetcher';

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
  ): Promise<void>;
}

export const sendPathsToServer: SendPathsToServer = async (fetchPaths, axios, clearStorage) => {
  const paths = fetchPaths();
  if (paths.length === 0) {
    return;
  }
  let response: Response;
  try {
    response = await axios.post('/saveRuns', paths);
  } catch (e) {
    response = e.response;
  }
  if (response.status === 200 && response.data.saved === true) {
    clearStorage();
  }
};