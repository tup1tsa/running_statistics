import { stopAndSaveRace } from "../../../application/actions/async/stopAndSaveRace";
import { Race } from "../../../application/common_files/interfaces";

const defaultRace: Race = {
  type: "walking",
  path: []
};

it("should dispatch toggle saving and clear gps actions immediately", () => {
  const dispatch = jest.fn();
  stopAndSaveRace(defaultRace, jest.fn())(dispatch);
  expect(dispatch.mock.calls.length).toBe(2);
  expect(dispatch.mock.calls[0][0]).toEqual({
    type: "STOP_GPS"
  });
  expect(dispatch.mock.calls[1][0]).toEqual({
    type: "TOGGLE_SAVING"
  });
});

it("should dispatch success message on successful save", async done => {
  const dispatch = jest.fn();
  const finishRace = jest.fn().mockResolvedValue("success!");
  await stopAndSaveRace(defaultRace, finishRace)(dispatch);
  // two for sync actions and one async success
  expect(dispatch.mock.calls.length).toBe(3);
  expect(dispatch.mock.calls[2][0]).toEqual({
    type: "SHOW_SAVING_MESSAGE",
    payload: "success!"
  });
  done();
});

it("should dispatch saving error action on fail", async done => {
  const dispatch = jest.fn();
  const message = "something went wrong";
  const finishRace = jest.fn().mockRejectedValue(message);
  await stopAndSaveRace(defaultRace, finishRace)(dispatch);
  // two for sync actions and one async success
  expect(dispatch.mock.calls.length).toBe(3);
  expect(dispatch.mock.calls[2][0]).toEqual({
    type: "SAVING_ERROR",
    error: true,
    payload: message
  });
  done();
});
