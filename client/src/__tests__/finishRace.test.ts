import { Race } from '../common_files/interfaces';
import { finishRace } from '../finishRace';

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
  const currentRace: Race = {
    type: 'running',
    path: []
  };

  it('should not send anything if all races are invalid and clear storage', async (done) => {
    const validatePath = jest.fn().mockReturnValue(false);
    const saveRaceToStorage = jest.fn();
    const sendRaces = jest.fn().mockResolvedValue(false);
    const fetchRacesFromStorage = jest.fn().mockReturnValue([racesInStorage[0], currentRace]);
    const deleteRaces = jest.fn();
    const result = await finishRace(
      currentRace,
      saveRaceToStorage,
      fetchRacesFromStorage,
      deleteRaces,
      validatePath,
      sendRaces
    );
    expect(saveRaceToStorage.mock.calls.length).toBe(1);
    expect(saveRaceToStorage.mock.calls[0][0]).toBe(currentRace);
    expect(validatePath.mock.calls.length).toBe(2);
    expect(validatePath.mock.calls[0][0]).toBe(racesInStorage[0].path);
    expect(validatePath.mock.calls[1][0]).toBe(currentRace.path);
    expect(sendRaces.mock.calls.length).toBe(0);
    expect(deleteRaces.mock.calls.length).toBe(1);
    expect(result).toBe('There is nothing to save');
    done();
  });

  it('should send only valid races', async (done) => {
    const validatePath = jest.fn()
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(false);
    const sendRaces = jest.fn().mockResolvedValue(true);
    const fetchRacesFromStorage = jest.fn().mockReturnValue([racesInStorage[0], currentRace]);
    await finishRace(
      currentRace,
      jest.fn(),
      fetchRacesFromStorage,
      jest.fn(),
      validatePath,
      sendRaces
    );
    expect(sendRaces.mock.calls.length).toBe(1);
    expect(sendRaces.mock.calls[0][0]).toEqual(racesInStorage);
    done();
  });

  it('should delete races from local storage if they were successfully stored on server', async (done) => {
    const validatePath = jest.fn().mockReturnValue(true);
    const sendRaces = jest.fn()
      .mockResolvedValueOnce(true)
      .mockResolvedValueOnce(false);
    const fetchRacesFromStorage = jest.fn().mockReturnValue([racesInStorage[0], currentRace]);
    const deleteRaces = jest.fn();
    const success = await finishRace(
      currentRace,
      jest.fn(),
      fetchRacesFromStorage,
      deleteRaces,
      validatePath,
      sendRaces
    );
    expect(success).toBe('Races were successfully saved');
    expect(deleteRaces.mock.calls.length).toBe(1);
    const fail = await finishRace(
      currentRace,
      jest.fn(),
      fetchRacesFromStorage,
      deleteRaces,
      validatePath,
      sendRaces
    );
    expect(fail).toBe('Saving was unsuccessful');
    expect(deleteRaces.mock.calls.length).toBe(1);
    done();
  });

});