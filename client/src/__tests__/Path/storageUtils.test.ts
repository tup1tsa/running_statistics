import { Race } from '../../common_files/interfaces';
import { fetchRacesFromStorage, saveRaceToStorage, clearRacesFromStorage } from '../../Path/storageUtils';

describe('saving to local storage', () => {
  it('should save correctly to the local storage new race', () => {
    const localStorage = {
      getItem: jest.fn(),
      setItem: jest.fn()
    };
    let racesInStorage: Race[] = [{
      type: 'walking',
      path: [{
        time: 23,
        latitude: 44,
        longitude: 62
      }]
    }];
    const raceToSave: Race = {
      type: 'walking',
      path: [{
        time: 66,
        latitude: 22,
        longitude: 84
      }]
    };

    saveRaceToStorage(raceToSave, localStorage, () => racesInStorage);

    expect(localStorage.setItem.mock.calls.length).toBe(1);
    expect(localStorage.setItem.mock.calls[0][0]).toBe('races');
    racesInStorage.push(raceToSave);
    expect(localStorage.setItem.mock.calls[0][1]).toBe(JSON.stringify(racesInStorage));
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
    // races array can consist of any values as long as they are valid by validatePath mock
    const races = ['fsaf'];
    localStorage.getItem.mockReturnValueOnce(JSON.stringify(races));
    expect(fetchRacesFromStorage(localStorage, validatePath)).toEqual([]);
    expect(localStorage.getItem.mock.calls[0][0]).toBe('races');
    expect(fetchRacesFromStorage(localStorage, validatePath)).toEqual([]);
    expect(fetchRacesFromStorage(localStorage, validatePath)).toEqual(races);
    expect(localStorage.getItem.mock.calls.length).toBe(3);
  });

  it('should return only valid paths from the local storage', () => {
    const localStorage = {
      getItem: jest.fn(),
      setItem: jest.fn()
    };
    const incorrectRace = 'fasf';
    const correctRace = 'gas';
    localStorage.getItem.mockReturnValue(JSON.stringify([incorrectRace, correctRace]));
    const validatePath = jest.fn()
      .mockReturnValueOnce(false)
      .mockReturnValue(true);
    expect(fetchRacesFromStorage(localStorage, validatePath)).toEqual([correctRace]);
  });

  it('should return empty array if none of the paths in the storage are valid', () => {
    const localStorage = {
      getItem: jest.fn(),
      setItem: jest.fn()
    };
    const validatePath = jest.fn().mockReturnValue(false);
    localStorage.getItem.mockReturnValue(JSON.stringify(['incorrect data']));
    localStorage.getItem.mockReturnValueOnce('incorrect json');
    expect(fetchRacesFromStorage(localStorage, validatePath)).toEqual([]);
    expect(fetchRacesFromStorage(localStorage, validatePath)).toEqual([]);
  });

});

describe('clearing local storage', () => {

  it('should clear local storage correctly', () => {
    const localStorage = {
      getItem: jest.fn(),
      setItem: jest.fn()
    };
    clearRacesFromStorage(localStorage);
    expect(localStorage.setItem.mock.calls.length).toBe(1);
    const [key, data] = localStorage.setItem.mock.calls[0];
    expect(key).toBe('races');
    expect(data).toBe(JSON.stringify([]));
  });

});
