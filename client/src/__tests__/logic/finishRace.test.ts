import { MESSAGES, Race } from "running_app_core";
import { finishRaceFactory } from "../../application/logic/finishRace";

const racesInStorage: ReadonlyArray<Race> = [
  {
    type: "walking",
    path: [
      {
        time: 23,
        longitude: 44,
        latitude: 56
      }
    ]
  }
];
const currentRace: Race = {
  type: "running",
  path: []
};

it("should clear storage and not send anything if all races are invalid", async done => {
  const validatePath = jest.fn().mockReturnValue(false);
  const saveRaceToStorage = jest.fn();
  const sendRaces = jest.fn().mockResolvedValue(false);
  const fetchRacesFromStorage = jest
    .fn()
    .mockReturnValue([racesInStorage[0], currentRace]);
  const deleteRaces = jest.fn();
  try {
    await finishRaceFactory(
      saveRaceToStorage,
      fetchRacesFromStorage,
      deleteRaces,
      // @ts-ignore
      validatePath,
      sendRaces
    )(currentRace);
  } catch (err) {
    expect(saveRaceToStorage.mock.calls.length).toBe(1);
    expect(saveRaceToStorage.mock.calls[0][0]).toBe(currentRace);
    expect(validatePath.mock.calls.length).toBe(2);
    expect(validatePath.mock.calls[0][0]).toBe(racesInStorage[0].path);
    expect(validatePath.mock.calls[1][0]).toBe(currentRace.path);
    expect(sendRaces.mock.calls.length).toBe(0);
    expect(deleteRaces.mock.calls.length).toBe(1);
    expect(err.message).toBe("There is nothing to save");
    done();
  }
});

it("should send only valid races", async done => {
  const validatePath = jest
    .fn()
    .mockReturnValueOnce(true)
    .mockReturnValueOnce(false);
  const sendRaces = jest.fn().mockResolvedValue(true);
  const fetchRacesFromStorage = jest
    .fn()
    .mockReturnValue([racesInStorage[0], currentRace]);
  await finishRaceFactory(
    jest.fn(),
    fetchRacesFromStorage,
    jest.fn(),
    // @ts-ignore
    validatePath,
    sendRaces
  )(currentRace);
  expect(sendRaces.mock.calls.length).toBe(1);
  expect(sendRaces.mock.calls[0][0]).toEqual(racesInStorage);
  done();
});

it("should delete races from local storage if they were successfully stored on server", async done => {
  const validatePath = jest.fn().mockReturnValue(true);
  const sendRaces = jest.fn().mockResolvedValue(true);
  const fetchRacesFromStorage = jest
    .fn()
    .mockReturnValue([racesInStorage[0], currentRace]);
  const deleteRaces = jest.fn();
  const success = await finishRaceFactory(
    jest.fn(),
    fetchRacesFromStorage,
    deleteRaces,
    // @ts-ignore
    validatePath,
    sendRaces
  )(currentRace);
  expect(success).toBe(MESSAGES.raceSavedSuccess);
  expect(deleteRaces.mock.calls.length).toBe(1);
  done();
});

it("should not delete races from storage if saving was unsuccessful", async done => {
  const validatePath = jest.fn().mockReturnValue(true);
  const sendRaces = jest
    .fn()
    .mockResolvedValue({ success: false, errorMessage: "something happened" });
  const deleteRaces = jest.fn();
  const fetchRacesFromStorage = jest
    .fn()
    .mockReturnValue([racesInStorage[0], currentRace]);
  try {
    await finishRaceFactory(
      jest.fn(),
      fetchRacesFromStorage,
      deleteRaces,
      // @ts-ignore
      validatePath,
      sendRaces
    )(currentRace);
  } catch (err) {
    expect(err.message).toBe("something happened");
    expect(deleteRaces.mock.calls.length).toBe(0);
    done();
  }
});
