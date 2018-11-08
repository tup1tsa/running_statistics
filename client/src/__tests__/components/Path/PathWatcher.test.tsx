import { shallow } from "enzyme";
import * as React from "react";
import { OngoingRaceInfo } from "../../../application/components/Path/OngoingRaceInfo";
import { PathWatcher } from "../../../application/components/Path/PathWatcher";

describe("should render path view component correctly", () => {
  const defaultProps = {
    race: {
      type: "walking",
      path: []
    },
    stopWatcher: jest.fn(),
    toLocaleTime: jest.fn(),
    getRaceInfo: jest
      .fn()
      .mockReturnValue({ distance: 0, averageSpeed: 0, timeSecs: 0 }),
    humanizeDuration: jest.fn()
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
      <PathWatcher
        {...defaultProps}
        race={race}
        stopWatcher={stopWatcherMock}
      />
    );
    const buttons = wrapper.find("button");
    expect(buttons.length).toBe(1);
    buttons.simulate("click");
    expect(stopWatcherMock.mock.calls.length).toBe(1);
    expect(stopWatcherMock.mock.calls[0][0]).toEqual(race);
  });

  it("should display race information correctly with only one position", () => {
    const path = [{ latitude: 25, longitude: 44, time: 2342432 }];
    const race = { type: "running", path };
    const getSpeedMock = jest.fn();
    const toLocaleTimeMock = jest.fn().mockReturnValue("7 pm");
    const wrapper = shallow(
      <PathWatcher
        {...defaultProps}
        race={race}
        toLocaleTime={toLocaleTimeMock}
      />
    );
    expect(getSpeedMock.mock.calls.length).toBe(0);
    const pathInformation = (
      <OngoingRaceInfo
        raceType={"Running"}
        lastTimeCheck={path[0].time}
        toLocaleTime={toLocaleTimeMock}
        totalTimeSecs={0}
        totalDistance={0}
        avgSpeed={0}
        humanizeDuration={defaultProps.humanizeDuration}
      />
    );
    expect(wrapper.contains(pathInformation)).toBe(true);
  });

  it("should display path information correctly with 2 or more positions", () => {
    const path = [
      { latitude: 25, longitude: 32, time: 234234243 },
      { latitude: 42, longitude: 23, time: 232323235 },
      { latitude: 48, longitude: -17, time: 23456553 }
    ];
    const race = { type: "running", path };
    const toLocaleTimeMock = jest.fn().mockReturnValue("7 pm");
    const getRaceInfo = jest
      .fn()
      .mockReturnValue({ distance: 17, averageSpeed: 44, timeSecs: 117 });
    const wrapper = shallow(
      <PathWatcher
        {...defaultProps}
        race={race}
        getRaceInfo={getRaceInfo}
        toLocaleTime={toLocaleTimeMock}
      />
    );
    expect(getRaceInfo.mock.calls.length).toBe(1);
    expect(getRaceInfo.mock.calls[0][0]).toBe(race);
    const pathInformation = (
      <OngoingRaceInfo
        raceType={"Running"}
        lastTimeCheck={path[2].time}
        toLocaleTime={toLocaleTimeMock}
        totalTimeSecs={117}
        totalDistance={17}
        avgSpeed={44}
        humanizeDuration={defaultProps.humanizeDuration}
      />
    );
    expect(wrapper.contains(pathInformation)).toBe(true);
  });
});
