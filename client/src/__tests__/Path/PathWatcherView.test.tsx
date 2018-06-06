import * as React from 'react';
import { shallow } from 'enzyme';
import { PathWatcherView } from '../../Path/PathWatcherView';
import { PathInformation } from '../../Path/PathInformation';

describe('should render path view component correctly', () => {

  const defaultProps = {
    path: [],
    stopWatcher: jest.fn(),
    toLocaleTime: jest.fn(),
    raceType: 'walking',
    speedLimits: {
      minSpeed: 5,
      maxSpeed: 10
    },
    maxTimeBetweenPointsSecs: 30,
    getActivePathData: jest.fn().mockReturnValue({ distance: 0, averageSpeed: 0, timeSecs: 0 })
  };

  it('should render button and notification if no positions were fetched. Button should stop watcher', () => {
    const stopWatcherMock = jest.fn();
    const wrapper = shallow(
      <PathWatcherView {...defaultProps} stopWatcher={stopWatcherMock} />
    );
    const notification = <div>geo location is initializing</div>;
    expect(wrapper.contains(notification)).toBe(true);
    const buttons = wrapper.find('button');
    expect(buttons.length).toBe(1);
    buttons.simulate('click');
    expect(stopWatcherMock.mock.calls.length).toBe(1);
  });

  it('should render stop button if positions were fetched. Button should stop watcher', () => {
    const path = [
      { latitude: 25, longitude: 32, time: 234234243 },
      { latitude: 42, longitude: 23, time: 23232323 }
    ];
    const stopWatcherMock = jest.fn();
    const wrapper = shallow(
      <PathWatcherView {...defaultProps} path={path} stopWatcher={stopWatcherMock} />
    );
    const buttons = wrapper.find('button');
    expect(buttons.length).toBe(1);
    buttons.simulate('click');
    expect(stopWatcherMock.mock.calls.length).toBe(1);
  });

  it('should display path information correctly with only one position', () => {
    const path = [{ latitude: 25, longitude: 44, time: 2342432 }];
    const getSpeedMock = jest.fn();
    const toLocaleTimeMock = jest.fn();
    const wrapper = shallow(
      <PathWatcherView
        {...defaultProps}
        path={path}
        toLocaleTime={toLocaleTimeMock}
      />
    );
    expect(getSpeedMock.mock.calls.length).toBe(0);
    const pathInformation = (
      <PathInformation
        raceType={defaultProps.raceType}
        lastTimeCheck={2342432}
        totalTimeSecs={0}
        totalDistance={0}
        avgSpeed={0}
        toLocaleTime={toLocaleTimeMock}
      />
    );
    expect(wrapper.contains(pathInformation)).toBe(true);
  });

  it('should display path information correctly with 2 or more positions', () => {
    const path = [
      { latitude: 25, longitude: 32, time: 234234243 },
      { latitude: 42, longitude: 23, time: 232323235 },
      { latitude: 48, longitude: -17, time: 23456553 }
    ];
    const toLocaleTimeMock = jest.fn();
    const getActivePathData = jest.fn()
      .mockReturnValue({ distance: 17, averageSpeed: 44, timeSecs: 117 });
    const wrapper = shallow(
      <PathWatcherView
        {...defaultProps}
        path={path}
        getActivePathData={getActivePathData}
        toLocaleTime={toLocaleTimeMock}
      />
    );
    expect(getActivePathData.mock.calls.length).toBe(1);
    expect(getActivePathData.mock.calls[0][0]).toBe(path);
    expect(getActivePathData.mock.calls[0][1]).toBe(defaultProps.speedLimits);
    expect(getActivePathData.mock.calls[0][2]).toBe(defaultProps.maxTimeBetweenPointsSecs);
    const pathInformation = (
      <PathInformation
        raceType={defaultProps.raceType}
        lastTimeCheck={23456553}
        totalTimeSecs={117}
        totalDistance={17}
        avgSpeed={44}
        toLocaleTime={toLocaleTimeMock}
      />
    );
    expect(wrapper.contains(pathInformation)).toBe(true);

  });

});