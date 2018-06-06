import { Race } from '../common_files/interfaces';

interface FetchRacesFromStorage {
  (): Race[];
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

export interface SendRacesToServer {
  (
    fetchPaths: FetchRacesFromStorage,
    axios: Axios,
    clearStorage: () => void
  ): Promise<string>;
}

interface SendRacesToServerFactory {
  (): Promise<string>;
}

interface SendRacesToServerWithTimeout {
  (sendPaths: SendRacesToServerFactory, timeoutSecs: number): Promise<string>;
}

export const sendRacesToServer: SendRacesToServer = async (fetchPaths, axios, clearStorage) => {
  const paths = fetchPaths();
  if (paths.length === 0) {
    return 'There is nothing to save';
  }
  let response: Response;
  try {
    response = await axios.post('/saveRaces', paths);
  } catch (e) {
    response = e.response;
  }
  if (response.status === 200 && response.data && response.data.saved === true) {
    clearStorage();
    return 'Races were successfully saved';
  }
  if (response.data && response.data.saved === false) {
    return 'There were some problems on server. Saving unsuccessful';
  }
  return 'Unexpected error during saving';
};

export const sendRacesToServerWithTimeout: SendRacesToServerWithTimeout = (sendsRaces, timeoutSecs) => {
  const timeOut = (): Promise<string> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve('Timeout'), timeoutSecs * 1000);
    });
  };
  return Promise.race([sendsRaces(), timeOut()]);
};