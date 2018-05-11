import { PositionInTime } from '../../common_files/interfaces';
import { sendPathsToServer, Response } from '../../Path/sendPathsToServer';

describe('saving runs to the server', () => {

  it('should try to send all runs (if they exist) from the local storage to the server', async (done) => {
    const runsInStorage: PositionInTime[][] = [[{
      time: 23,
      longitude: 44,
      latitude: 22
    }]];
    const fetchPaths = jest.fn()
      .mockReturnValueOnce([])
      .mockReturnValue(runsInStorage);
    const successResponse: Response = {
      status: 200,
      data: { saved: true }
    };
    const axios = {
      get: jest.fn(),
      post: jest.fn().mockResolvedValueOnce(successResponse)
    };
    await sendPathsToServer(fetchPaths, axios, jest.fn());
    expect(axios.post.mock.calls.length).toBe(0);
    await sendPathsToServer(fetchPaths, axios, jest.fn());
    expect(axios.post.mock.calls.length).toBe(1);
    const [url, data] = axios.post.mock.calls[0];
    expect(url).toBe('/saveRuns');
    expect(data).toEqual(runsInStorage);
    done();
  });

  it('should delete runs from local storage if they were successfully stored on server', async (done) => {
    const runsInStorage: PositionInTime[][] = [[{
      time: 23,
      longitude: 44,
      latitude: 56
    }]];
    const fetchPaths = jest.fn().mockReturnValue(runsInStorage);
    const clearStorage = jest.fn();
    const axios = {
      get: jest.fn(),
      post: jest.fn()
    };
    axios.post.mockResolvedValueOnce({
      status: 200,
      data: { saved: true }
    });
    axios.post.mockResolvedValueOnce({
      status: 200,
      data: { saved: false }
    });
    axios.post.mockRejectedValueOnce({
      response: {
        status: 404
      }
    });

    await sendPathsToServer(fetchPaths, axios, clearStorage);
    expect(clearStorage.mock.calls.length).toBe(1);
    await sendPathsToServer(fetchPaths, axios, clearStorage);
    await sendPathsToServer(fetchPaths, axios, clearStorage);

    expect(axios.post.mock.calls.length).toBe(3);
    // mock calls length check is duplicated to make sure that it wasn't invoked again
    expect(clearStorage.mock.calls.length).toBe(1);
    done();
  });

});