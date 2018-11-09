import { downloadAllRaces } from "../../../application/actions/async/downloadAllRaces";
import { Race } from "../../../application/common_files/interfaces";

it("should start download and dispatch start download action", () => {
  const downloadRaces = jest.fn();
  const dispatch = jest.fn();
  downloadAllRaces(downloadRaces, jest.fn())(dispatch);
  expect(downloadRaces.mock.calls.length).toBe(1);
  expect(dispatch.mock.calls.length).toBe(1);
  expect(dispatch.mock.calls[0][0]).toEqual({
    type: "START_RACES_DOWNLOAD"
  });
});

it("should dispatch set races action on sucess download", async done => {
  const races: ReadonlyArray<Race> = [{ type: "walking", path: [] }];
  const downloadRaces = jest.fn().mockResolvedValue(races);
  const dispatch = jest.fn();
  await downloadAllRaces(downloadRaces, jest.fn())(dispatch);
  expect(dispatch.mock.calls.length).toBe(2);
  expect(dispatch.mock.calls[1][0]).toEqual({
    type: "SET_RACES",
    payload: races
  });
  done();
});

it("should dispatch download races error and change url", async done => {
  const errorMessage = "something happened";
  const error = new Error(errorMessage);
  const downloadRaces = jest.fn().mockRejectedValue(error);
  const dispatch = jest.fn();
  const showMessage = jest.fn();
  await downloadAllRaces(downloadRaces, showMessage)(dispatch);
  expect(dispatch.mock.calls.length).toBe(2);
  expect(dispatch.mock.calls[1][0]).toEqual({
    type: "SET_RACES",
    payload: []
  });
  expect(showMessage.mock.calls.length).toBe(1);
  expect(showMessage.mock.calls[0][0]).toBe(errorMessage);
  expect(showMessage.mock.calls[0][1]).toBe(true);
  done();
});
