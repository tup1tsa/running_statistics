import { stopAndSaveRace } from "../../../application/actions/async/stopAndSaveRace";
import { MESSAGES } from "../../../application/common_files/config";
import { Race } from "../../../application/common_files/interfaces";
const defaultRace: Race = {
  type: "walking",
  path: []
};

it("should dispatch toggle saving and clear gps actions immediately", () => {
  const dispatch = jest.fn();
  stopAndSaveRace(defaultRace, jest.fn(), jest.fn())(dispatch);
  expect(dispatch.mock.calls.length).toBe(2);
  expect(dispatch.mock.calls[0][0]).toEqual({
    type: "STOP_GPS"
  });
  expect(dispatch.mock.calls[1][0]).toEqual({
    type: "TOGGLE_SAVING"
  });
});

it("should dispatch toggle saving action and show message on successful save", async done => {
  const dispatch = jest.fn();
  const finishRace = jest.fn().mockResolvedValue(MESSAGES[1]);
  const showMessage = jest.fn();
  await stopAndSaveRace(defaultRace, finishRace, showMessage)(dispatch);
  // two for sync actions and one after request
  expect(dispatch.mock.calls.length).toBe(3);
  expect(dispatch.mock.calls[2][0]).toEqual({ type: "TOGGLE_SAVING" });
  expect(showMessage.mock.calls.length).toBe(1);
  expect(showMessage.mock.calls[0][0]).toBe(MESSAGES[1]);
  expect(showMessage.mock.calls[0][1]).toBe(false);
  done();
});

it("should dispatch url push and toggle saving action on fail", async done => {
  const dispatch = jest.fn();
  const message = MESSAGES[3];
  const finishRace = jest.fn().mockRejectedValue(new Error(message));
  const showMessage = jest.fn();
  await stopAndSaveRace(defaultRace, finishRace, showMessage)(dispatch);
  // two for sync actions and one afer request
  expect(dispatch.mock.calls.length).toBe(3);
  expect(dispatch.mock.calls[2][0]).toEqual({ type: "TOGGLE_SAVING" });
  expect(showMessage.mock.calls.length).toBe(1);
  expect(showMessage.mock.calls[0][0]).toBe(MESSAGES[3]);
  expect(showMessage.mock.calls[0][1]).toBe(true);
  done();
});
