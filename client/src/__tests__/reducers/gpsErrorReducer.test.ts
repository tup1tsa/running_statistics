import {
  gpsError,
  toggleSaving
} from "../../application/actions/actionCreators";
import { gpsErrorReducer } from "../../application/reducers/gpsErrorReducer";

const defaultState = {
  gpsError: null
};

it("should not change state if action is incorrect", () => {
  const action = toggleSaving();
  expect(gpsErrorReducer({ ...defaultState }, action)).toEqual(defaultState);
});

it("should set error message in state", () => {
  const action = gpsError({
    message: "gps error",
    code: 10,
    PERMISSION_DENIED: 0,
    POSITION_UNAVAILABLE: 0,
    TIMEOUT: 1
  });
  expect(gpsErrorReducer({ ...defaultState }, action)).toEqual({
    gpsError: "gps error"
  });
});
