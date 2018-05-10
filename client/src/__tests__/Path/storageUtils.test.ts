import { PositionInTime } from '../../Path/PathFetcher';
import { fetchPathsFromStorage, savePathToStorage, clearPathsFromStorage } from '../../Path/storageUtils';

describe('saving to local storage', () => {
  it('should save correctly to the local storage new run', () => {
    const localStorage = {
      getItem: jest.fn(),
      setItem: jest.fn()
    };
    let runsInStorage: PositionInTime[][] = [[{
      time: 23,
      latitude: 44,
      longitude: 62
    }]];
    const runToSave: PositionInTime[] = [{
      time: 66,
      latitude: 22,
      longitude: 84
    }];

    savePathToStorage(runToSave, localStorage, () => runsInStorage);

    expect(localStorage.setItem.mock.calls.length).toBe(1);
    expect(localStorage.setItem.mock.calls[0][0]).toBe('runs');
    runsInStorage.push(runToSave);
    expect(localStorage.setItem.mock.calls[0][1]).toBe(JSON.stringify(runsInStorage));
  });
});

describe('fetching from local storage', () => {

  it('should get all paths from the local storage correctly', () => {
    const localStorage = {
      getItem: jest.fn(),
      setItem: jest.fn()
    };
    const validatePath = jest.fn().mockReturnValue(true);
    localStorage.getItem.mockReturnValueOnce(null);
    localStorage.getItem.mockReturnValueOnce(JSON.stringify([]));
    const runs: PositionInTime[][] = [[{
      time: 23,
      longitude: 44,
      latitude: 21
    }]];
    localStorage.getItem.mockReturnValueOnce(JSON.stringify(runs));
    expect(fetchPathsFromStorage(localStorage, validatePath)).toEqual([]);
    expect(localStorage.getItem.mock.calls[0][0]).toBe('runs');
    expect(fetchPathsFromStorage(localStorage, validatePath)).toEqual([]);
    expect(fetchPathsFromStorage(localStorage, validatePath)).toEqual(runs);
    expect(localStorage.getItem.mock.calls.length).toBe(3);
  });

  it('should return only valid paths from the local storage', () => {
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
    expect(fetchPathsFromStorage(localStorage, validatePath)).toEqual([correctRun]);
  });

  it('should return empty array if none of the paths in the storage are valid', () => {
    const localStorage = {
      getItem: jest.fn(),
      setItem: jest.fn()
    };
    const validatePath = jest.fn().mockReturnValue(false);
    localStorage.getItem.mockReturnValue(JSON.stringify(['incorrect data']));
    localStorage.getItem.mockReturnValueOnce('incorrect json');
    expect(fetchPathsFromStorage(localStorage, validatePath)).toEqual([]);
    expect(fetchPathsFromStorage(localStorage, validatePath)).toEqual([]);
  });

});

describe('clearing local storage', () => {

  it('should clear local storage correctly', () => {
    const localStorage = {
      getItem: jest.fn(),
      setItem: jest.fn()
    };
    clearPathsFromStorage(localStorage);
    expect(localStorage.setItem.mock.calls.length).toBe(1);
    const [key, data] = localStorage.setItem.mock.calls[0];
    expect(key).toBe('runs');
    expect(data).toBe(JSON.stringify([]));
  });

});
