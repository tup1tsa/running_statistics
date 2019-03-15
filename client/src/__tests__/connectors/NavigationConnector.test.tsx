import {
  mapDispatchToProps,
  mapStateToProps
} from "../../application/connectors/NavigationConnector";
import { testGlobalState } from "./PathWatcherConnector.test";

it("should pass correct state to props", () => {
  const state = testGlobalState();
  expect(mapStateToProps(state)).toEqual({
    raceType: state.raceInProgress.type,
    raceInProgress: state.raceInProgress.inProgress
  });
});

it("should dispatch correct action on startRaceBlock call", () => {
  const dispatch = jest.fn();
  mapDispatchToProps(dispatch).startRaceBlock();
  expect(dispatch.mock.calls.length).toBe(1);
  expect(dispatch.mock.calls[0][0].payload).toEqual({
    method: "push",
    args: ["/startRace"]
  });
});

it("should dispatch correct action on detailed race stats call", () => {
  const dispatch = jest.fn();
  mapDispatchToProps(dispatch).detailedRaceStats();
  expect(dispatch.mock.calls.length).toBe(1);
  expect(dispatch.mock.calls[0][0].payload).toEqual({
    method: "push",
    args: ["/detailedRaceStats"]
  });
});

it("should dispatch correct action on overall race stats call", () => {
  const dispatch = jest.fn();
  mapDispatchToProps(dispatch).overallRaceStats();
  expect(dispatch.mock.calls.length).toBe(1);
  expect(dispatch.mock.calls[0][0].payload).toEqual({
    method: "push",
    args: ["/overallRaceStats"]
  });
});

it(
  "should dispatch correct url change action and change race type" +
    " on current race block call",
  () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).currentRaceBlock("walking");
    expect(dispatch.mock.calls.length).toBe(2);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: "CHANGE_RACE_TYPE",
      payload: "walking"
    });
    expect(dispatch.mock.calls[1][0].payload).toEqual({
      method: "push",
      args: ["/race/walking"]
    });
  }
);
