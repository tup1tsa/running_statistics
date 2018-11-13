import {
  changeRaceType,
  toggleSaving
} from "../../application/actions/actionCreators";
import { changeRaceTypeReducer } from "../../application/reducers/changeRaceTypeReducer";

it("should not change state on different action", () => {
  const action = toggleSaving();
  expect(changeRaceTypeReducer({ raceType: "running" }, action)).toEqual({
    raceType: "running"
  });
});

it("should change race properly", () => {
  const action = changeRaceType("driving");
  expect(changeRaceTypeReducer({ raceType: "running" }, action)).toEqual({
    raceType: "driving"
  });
});
