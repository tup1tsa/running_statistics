import { PositionInTime } from '../../common_files/interfaces';
import { sendPathsToServer, sendPathsToServerWithTimeout } from '../../Path/sendPathsToServer';

describe('saving runs to the server', () => {

  const runsInStorage: PositionInTime[][] = [[{
    time: 23,
    longitude: 44,
    latitude: 56
  }]];
  const fetchPaths = jest.fn().mockReturnValue(runsInStorage);
  const successResponse = {
    status: 200,
    data: { saved: true }
  };
  const failResponse = {
    status: 200,
    data: { saved: false }
  };
  const unexpectedResponse = {
    response: {
      status: 404
    }
  };

  it('should try to send all runs (if they exist) from the local storage to the server', async (done) => {
    fetchPaths.mockReturnValueOnce([]);
    const axios = {
      get: jest.fn(),
      post: jest.fn().mockResolvedValueOnce(successResponse)
    };
    const emptyStorageResult = await sendPathsToServer(fetchPaths, axios, jest.fn());
    expect(emptyStorageResult).toBe('There is nothing to save');
    expect(axios.post.mock.calls.length).toBe(0);
    const fullStorageResult = await sendPathsToServer(fetchPaths, axios, jest.fn());
    expect(axios.post.mock.calls.length).toBe(1);
    const [url, data] = axios.post.mock.calls[0];
    expect(url).toBe('/saveRuns');
    expect(data).toEqual(runsInStorage);
    expect(fullStorageResult).toEqual('Runs were successfully saved');
    done();
  });

  it('should delete runs from local storage if they were successfully stored on server', async (done) => {
    const clearStorage = jest.fn();
    const axios = {
      get: jest.fn(),
      post: jest.fn()
    };
    axios.post.mockResolvedValueOnce(successResponse);
    axios.post.mockResolvedValueOnce(failResponse);
    axios.post.mockRejectedValueOnce(unexpectedResponse);
    await sendPathsToServer(fetchPaths, axios, clearStorage);
    expect(clearStorage.mock.calls.length).toBe(1);
    const serverError = await sendPathsToServer(fetchPaths, axios, clearStorage);
    const unexpectedError = await sendPathsToServer(fetchPaths, axios, clearStorage);

    expect(serverError).toBe('There were some problems on server. Saving unsuccessful');
    expect(unexpectedError).toBe('Unexpected error during saving');

    expect(axios.post.mock.calls.length).toBe(3);
    // clear storage calls check is duplicated to make sure that it wasn't invoked again
    expect(clearStorage.mock.calls.length).toBe(1);
    done();
  });

  it('should use timeout properly', async (done) => {
    jest.useFakeTimers();
    const getPromise = () => {
      return new Promise(resolve => {
        setTimeout(() => resolve('success'), 10000);
      });
    };
    const sendPathsMock = jest.fn().mockReturnValue(getPromise());
    const timeoutSending = sendPathsToServerWithTimeout(sendPathsMock, 5);
    jest.runAllTimers();
    expect(await timeoutSending).toBe('Timeout');
    const normalSending = sendPathsToServerWithTimeout(sendPathsMock, 15);
    jest.runAllTimers();
    expect(await normalSending).toBe('success');
    done();
  });

});