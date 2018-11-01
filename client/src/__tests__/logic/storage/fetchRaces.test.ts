import { fetchRaces } from '../../../application/logic/storage/fetchRaces';

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
    expect(fetchRaces(localStorage, validatePath)).toEqual([]);
    expect(localStorage.getItem.mock.calls[0][0]).toBe('races');
    expect(fetchRaces(localStorage, validatePath)).toEqual([]);
    expect(fetchRaces(localStorage, validatePath)).toEqual(races);
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
    expect(fetchRaces(localStorage, validatePath)).toEqual([correctRace]);
  });

  it('should return empty array if none of the paths in the storage are valid', () => {
    const localStorage = {
      getItem: jest.fn(),
      setItem: jest.fn()
    };
    const validatePath = jest.fn().mockReturnValue(false);
    localStorage.getItem.mockReturnValue(JSON.stringify(['incorrect data']));
    localStorage.getItem.mockReturnValueOnce('incorrect json');
    expect(fetchRaces(localStorage, validatePath)).toEqual([]);
    expect(fetchRaces(localStorage, validatePath)).toEqual([]);
  });

});