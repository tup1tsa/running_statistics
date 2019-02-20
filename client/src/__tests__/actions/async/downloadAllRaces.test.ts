import { Race } from "running_app_core";
import { downloadAllRacesFactory } from "../../../application/actions/async/downloadAllRaces";

it("should start download and dispatch start download action", () => {
  const downloadRaces = jest.fn();
  const dispatch = jest.fn();
  downloadAllRacesFactory(downloadRaces, jest.fn())()(dispatch);
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
  await downloadAllRacesFactory(downloadRaces, jest.fn())()(dispatch);
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
  const setMessage = jest.fn().mockReturnValue("new url");
  await downloadAllRacesFactory(downloadRaces, setMessage)()(dispatch);
  expect(dispatch.mock.calls.length).toBe(3);
  expect(dispatch.mock.calls[1][0]).toEqual({
    type: "SET_RACES",
    payload: []
  });
  expect(dispatch.mock.calls[2][0].payload).toEqual({
    args: ["new url"],
    method: "push"
  });
  expect(setMessage.mock.calls.length).toBe(1);
  expect(setMessage.mock.calls[0][0]).toEqual({
    isError: true,
    message: errorMessage
  });
  done();
});
