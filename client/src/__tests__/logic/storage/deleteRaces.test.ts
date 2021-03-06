import { deleteRacesFactory } from "../../../application/logic/storage/deleteRaces";

describe("clearing local storage", () => {
  it("should clear local storage correctly", () => {
    const localStorage = {
      getItem: jest.fn(),
      setItem: jest.fn()
    };
    deleteRacesFactory(localStorage)();
    expect(localStorage.setItem.mock.calls.length).toBe(1);
    const [key, data] = localStorage.setItem.mock.calls[0];
    expect(key).toBe("races");
    expect(data).toBe(JSON.stringify([]));
  });
});
