import { Race } from "../../../application/common_files/interfaces";
import { saveRace } from "../../../application/logic/storage/saveRace";

describe("saving to local storage", () => {
  it("should save correctly to the local storage new race", () => {
    const localStorage = {
      getItem: jest.fn(),
      setItem: jest.fn()
    };
    let racesInStorage: ReadonlyArray<Race> = [
      {
        type: "walking",
        path: [
          {
            time: 23,
            latitude: 44,
            longitude: 62
          }
        ]
      }
    ];
    const raceToSave: Race = {
      type: "walking",
      path: [
        {
          time: 66,
          latitude: 22,
          longitude: 84
        }
      ]
    };

    saveRace(raceToSave, localStorage, () => racesInStorage);

    expect(localStorage.setItem.mock.calls.length).toBe(1);
    expect(localStorage.setItem.mock.calls[0][0]).toBe("races");
    racesInStorage = [...racesInStorage, raceToSave];
    expect(localStorage.setItem.mock.calls[0][1]).toBe(
      JSON.stringify(racesInStorage)
    );
  });
});
