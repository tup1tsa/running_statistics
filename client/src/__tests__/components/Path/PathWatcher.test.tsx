import { shallow } from "enzyme";
import * as React from "react";
import OngoingRaceInfo from "../../../application/components/Path/OngoingRaceInfo";
import { PathWatcher } from "../../../application/components/Path/PathWatcher";

const defaultProps = {
  race: {
    type: "walking",
    path: []
  },
  raceInProgress: true,
  stopWatcher: jest.fn()
};

it("should render button and notification if no positions were fetched. Button should stop watcher", () => {
  const stopWatcherMock = jest.fn();
  const wrapper = shallow(
    <PathWatcher {...defaultProps} stopWatcher={stopWatcherMock} />
  );
  const notification = <div>geo location is initializing</div>;
  expect(wrapper.contains(notification)).toBe(true);
  const buttons = wrapper.find("button");
  expect(buttons.length).toBe(1);
  buttons.simulate("click");
  expect(stopWatcherMock.mock.calls.length).toBe(1);
});

it("should render stop button if positions were fetched. Button should stop watcher", () => {
  const path = [
    { latitude: 25, longitude: 32, time: 234234243 },
    { latitude: 42, longitude: 23, time: 23232323 }
  ];
  const race = { type: "running", path };
  const stopWatcherMock = jest.fn();
  const wrapper = shallow(
    <PathWatcher {...defaultProps} race={race} stopWatcher={stopWatcherMock} />
  );
  const buttons = wrapper.find("button");
  expect(buttons.length).toBe(1);
  buttons.simulate("click");
  expect(stopWatcherMock.mock.calls.length).toBe(1);
  expect(stopWatcherMock.mock.calls[0][0]).toEqual(race);
});

it("should display path information correctly", () => {
  const path = [
    { latitude: 25, longitude: 32, time: 234234243 },
    { latitude: 42, longitude: 23, time: 232323235 },
    { latitude: 48, longitude: -17, time: 23456553 }
  ];
  const race = { type: "running", path };
  const wrapper = shallow(<PathWatcher {...defaultProps} race={race} />);
  const pathInformation = (
    <OngoingRaceInfo race={race} lastTimeCheck={path[2].time} />
  );
  expect(wrapper.contains(pathInformation)).toBe(true);
});

it("should show that race is not in progess", () => {
  const wrapper = shallow(
    <PathWatcher {...defaultProps} raceInProgress={false} />
  );
  expect(wrapper.contains(<div>There is no race in progress</div>)).toBe(true);
});
