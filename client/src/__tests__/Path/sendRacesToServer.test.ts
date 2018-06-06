import { Race } from '../../common_files/interfaces';
import { sendRacesToServer, sendRacesToServerWithTimeout } from '../../Path/sendRacesToServer';

describe('saving races to the server', () => {

  const racesInStorage: Race[] = [
    {
      type: 'walking',
      path: [{
        time: 23,
        longitude: 44,
        latitude: 56
      }]
    }
  ];
  const fetchRacesFromStorage = jest.fn().mockReturnValue(racesInStorage);
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

  it('should try to send all races (if they exist) from the local storage to the server', async (done) => {
    fetchRacesFromStorage.mockReturnValueOnce([]);
    const axios = {
      get: jest.fn(),
      post: jest.fn().mockResolvedValueOnce(successResponse)
    };
    const emptyStorageResult = await sendRacesToServer(fetchRacesFromStorage, axios, jest.fn());
    expect(emptyStorageResult).toBe('There is nothing to save');
    expect(axios.post.mock.calls.length).toBe(0);
    const fullStorageResult = await sendRacesToServer(fetchRacesFromStorage, axios, jest.fn());
    expect(axios.post.mock.calls.length).toBe(1);
    const [url, data] = axios.post.mock.calls[0];
    expect(url).toBe('/saveRaces');
    expect(data).toEqual(racesInStorage);
    expect(fullStorageResult).toEqual('Races were successfully saved');
    done();
  });

  it('should delete races from local storage if they were successfully stored on server', async (done) => {
    const clearStorage = jest.fn();
    const axios = {
      get: jest.fn(),
      post: jest.fn()
    };
    axios.post.mockResolvedValueOnce(successResponse);
    axios.post.mockResolvedValueOnce(failResponse);
    axios.post.mockRejectedValueOnce(unexpectedResponse);
    await sendRacesToServer(fetchRacesFromStorage, axios, clearStorage);
    expect(clearStorage.mock.calls.length).toBe(1);
    const serverError = await sendRacesToServer(fetchRacesFromStorage, axios, clearStorage);
    const unexpectedError = await sendRacesToServer(fetchRacesFromStorage, axios, clearStorage);

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
    const timeoutSending = sendRacesToServerWithTimeout(sendPathsMock, 5);
    jest.runAllTimers();
    expect(await timeoutSending).toBe('Timeout');
    const normalSending = sendRacesToServerWithTimeout(sendPathsMock, 15);
    jest.runAllTimers();
    expect(await normalSending).toBe('success');
    done();
  });

});