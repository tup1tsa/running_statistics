import {
  gpsError,
  toggleSaving
} from "../../application/actions/actionCreators";
import { gpsErrorReducer } from "../../application/reducers/gpsErrorReducer";

it("should not change state if action is incorrect", () => {
  const action = toggleSaving();
  expect(gpsErrorReducer({}, action)).toEqual({});
});

it("should set error message in state", () => {
  const action = gpsError({
    message: "gps error",
    code: 10,
    PERMISSION_DENIED: 0,
    POSITION_UNAVAILABLE: 0,
    TIMEOUT: 1
  });
  expect(gpsErrorReducer({}, action)).toEqual({ gpsError: "gps error" });
});
