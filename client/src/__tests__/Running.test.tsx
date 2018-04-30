import { Running, Response } from '../Running';
import { shallow } from 'enzyme';
import * as React from 'react';
import { PathFetcherFactory } from '../Path/PathFetcherFactory';
import { PositionInTime } from '../Path/PathFetcher';

describe('Running logic test', () => {
  let defaultProps = {
    axios: {
      get: jest.fn(),
      post: jest.fn()
    },
    localStorage: {
      getItem: jest.fn().mockReturnValue(null),
      setItem: jest.fn()
    },
    validatePath: jest.fn().mockReturnValue(true)
  };

  it('should render path fetcher factory with correct props', () => {
    const wrapper = shallow(<Running {...defaultProps}/>);
    const runningInstance = wrapper.instance() as Running;
    const pathFetcher = (
      <PathFetcherFactory
        minimumDistanceDiff={10}
        minimumTimeBetweenCalls={10000}
        saveRun={runningInstance.saveRun}
      />
    );
    expect(wrapper.contains(pathFetcher)).toBe(true);
  });

  it('should send final run to correct api endpoint', async () => {
    const axios = {
      get: jest.fn(),
      post: jest.fn().mockRejectedValueOnce({ response: { status: 500 } })
    };
    const wrapper = shallow(<Running {...defaultProps} axios={axios} />);
    const runningInstance = wrapper.instance() as Running;
    await runningInstance.saveRun([]);
    expect(axios.post.mock.calls.length).toBe(1);
    const [url, data] = axios.post.mock.calls[0];
    expect(url).toBe('/saveRun');
    expect(data).toEqual([]);
  });

  it('should clear local storage correctly', () => {
    const localStorage = {
      getItem: jest.fn(),
      setItem: jest.fn()
    };
    const wrapper = shallow(
      <Running {...defaultProps} localStorage={localStorage}/>,
      { disableLifecycleMethods: true }
    );
    const instance = wrapper.instance() as Running;
    instance.clearLocalStorage();
    expect(localStorage.setItem.mock.calls.length).toBe(1);
    const [key, data] = localStorage.setItem.mock.calls[0];
    expect(key).toBe('runs');
    expect(data).toBe(JSON.stringify([]));
  });

  it('should get all runs from local storage correctly', () => {
    const localStorage = {
      getItem: jest.fn(),
      setItem: jest.fn()
    };
    localStorage.getItem.mockReturnValueOnce(null);
    localStorage.getItem.mockReturnValueOnce(JSON.stringify([]));
    const runs: PositionInTime[][] = [[{
      time: 23,
      longitude: 44,
      latitude: 21
    }]];
    localStorage.getItem.mockReturnValueOnce(JSON.stringify(runs));
    const wrapper = shallow(
      <Running {...defaultProps} localStorage={localStorage}/>,
      { disableLifecycleMethods: true }
    );
    const instance = wrapper.instance() as Running;
    expect(instance.getRunsFromLocalStorage()).toEqual([]);
    expect(localStorage.getItem.mock.calls[0][0]).toBe('runs');
    expect(instance.getRunsFromLocalStorage()).toEqual([]);
    expect(instance.getRunsFromLocalStorage()).toEqual(runs);
    expect(localStorage.getItem.mock.calls.length).toBe(3);
  });

  it('should return only valid runs from local storage', () => {
    const localStorage = {
      getItem: jest.fn(),
      setItem: jest.fn()
    };
    const incorrectRun = [
      { ba: 23}
    ];
    const correctRun: PositionInTime[] = [
      { latitude: 44, longitude: 12, time: 52 }
    ];
    localStorage.getItem.mockReturnValue(JSON.stringify([incorrectRun, correctRun]));
    const validatePath = jest.fn()
      .mockReturnValueOnce(false)
      .mockReturnValue(true);
    const wrapper = shallow(
      <Running {...defaultProps} localStorage={localStorage} validatePath={validatePath}/>,
      { disableLifecycleMethods: true }
    );
    const instance = wrapper.instance() as Running;
    expect(instance.getRunsFromLocalStorage()).toEqual([correctRun]);
  });

  it('should return empty array if none of the races in storage are valid', () => {
    const localStorage = {
      getItem: jest.fn(),
      setItem: jest.fn()
    };
    const validatePath = jest.fn().mockReturnValue(false);
    localStorage.getItem.mockReturnValue(JSON.stringify(['incorrect data']));
    localStorage.getItem.mockReturnValueOnce('incorrect json');
    const wrapper = shallow(
      <Running {...defaultProps} localStorage={localStorage} validatePath={validatePath}/>,
      { disableLifecycleMethods: true }
    );
    const instance = wrapper.instance() as Running;
    expect(instance.getRunsFromLocalStorage()).toEqual([]);
    expect(instance.getRunsFromLocalStorage()).toEqual([]);
  });

  it('should save correctly to local storage new run', () => {
    const localStorage = {
      getItem: jest.fn(),
      setItem: jest.fn()
    };
    let runsInStorage: PositionInTime[][] = [[{
      time: 23,
      latitude: 44,
      longitude: 62
    }]];
    localStorage.getItem.mockReturnValueOnce(JSON.stringify(runsInStorage));
    const runToSave: PositionInTime[] = [{
      time: 66,
      latitude: 22,
      longitude: 84
    }];

    const wrapper = shallow(
      <Running {...defaultProps} localStorage={localStorage}/>,
      { disableLifecycleMethods: true }
    );
    const instance = wrapper.instance() as Running;
    instance.saveRunToLocalStorage(runToSave);

    expect(localStorage.setItem.mock.calls.length).toBe(1);
    expect(localStorage.setItem.mock.calls[0][0]).toBe('runs');
    runsInStorage.push(runToSave);
    expect(localStorage.setItem.mock.calls[0][1]).toBe(JSON.stringify(runsInStorage));
  });

  it('should call save to local storage method only if server response was unsuccessful', async () => {
    const axios = {
      get: jest.fn(),
      post: jest.fn()
    };
    const savingErrorResponse: Response = {
      data: { saved: false },
      status: 200
    };
    const successResponse: Response = {
      status: 200,
      data: { saved: true }
    };
    const run: PositionInTime[] = [{ time: 23, longitude: 23, latitude: 44 }];

    const wrapper = shallow(<Running {...defaultProps} axios={axios} />);
    let instance = wrapper.instance() as Running;
    const saveToStorageMock = jest.fn();
    instance.saveRunToLocalStorage = saveToStorageMock;

    axios.post.mockRejectedValueOnce({
      response: {
        status: 500
      },
      message: 'server error'
    });
    await instance.saveRun(run);
    expect(saveToStorageMock.mock.calls.length).toBe(1);
    expect(saveToStorageMock.mock.calls[0][0]).toBe(run);

    axios.post.mockResolvedValueOnce(savingErrorResponse);
    await instance.saveRun(run);
    expect(saveToStorageMock.mock.calls.length).toBe(2);
    expect(saveToStorageMock.mock.calls[1][0]).toBe(run);

    axios.post.mockResolvedValueOnce(successResponse);
    await instance.saveRun(run);
    expect(saveToStorageMock.mock.calls.length).toBe(2);
  });

  it('should try to send all runs (if they exist) from the local storage to the server on mount', () => {
    const localStorage = {
      getItem: jest.fn(),
      setItem: jest.fn()
    };
    localStorage.getItem.mockReturnValueOnce(null);
    const runsInStorage: PositionInTime[][] = [[{
      time: 23,
      longitude: 44,
      latitude: 22
    }]];
    localStorage.getItem.mockReturnValueOnce(JSON.stringify(runsInStorage));
    const successResponse: Response = {
      status: 200,
      data: { saved: true }
    };
    const axios = {
      get: jest.fn(),
      post: jest.fn().mockResolvedValueOnce(successResponse)
    };

    shallow(<Running {...defaultProps} axios={axios} localStorage={localStorage}/>);
    expect(axios.post.mock.calls.length).toBe(0);
    shallow(<Running {...defaultProps} axios={axios} localStorage={localStorage}/>);
    expect(axios.post.mock.calls.length).toBe(1);
    const [url, data] = axios.post.mock.calls[0];
    expect(url).toBe('/saveRuns');
    expect(data).toEqual(runsInStorage);
  });

  it('should delete runs from local storage if they were successfully stored on server', async (done) => {
    const localStorage = {
      getItem: jest.fn(),
      setItem: jest.fn()
    };
    const runsInStorage: PositionInTime[][] = [[{
      time: 23,
      longitude: 44,
      latitude: 56
    }]];
    localStorage.getItem.mockReturnValue(JSON.stringify(runsInStorage));
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

    shallow(<Running {...defaultProps} axios={axios} localStorage={localStorage}/>);
    shallow(<Running {...defaultProps} axios={axios} localStorage={localStorage}/>);
    shallow(<Running {...defaultProps} axios={axios} localStorage={localStorage}/>);
    // weird workaround for async componentDidUpdate method
    return new Promise(() => {
      process.nextTick(() => {
        expect(axios.post.mock.calls.length).toBe(3);
        expect(localStorage.setItem.mock.calls.length).toBe(1);
        const [key, data] = localStorage.setItem.mock.calls[0];
        expect(key).toBe('runs');
        expect(data).toBe(JSON.stringify([]));
        done();
      });
    });
  });
});
