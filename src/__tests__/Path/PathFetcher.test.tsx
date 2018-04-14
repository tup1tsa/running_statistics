import { PathFetcher, Position } from '../../Path/PathFetcher';
import { shallow } from 'enzyme';
import * as React from 'react';
import { GeoLocationMock } from '../../__mocks__/GeoLocation';
import { PathFetcherViewFactory } from '../../Path/PathFetcherViewFactory';

describe('Path fetcher tests', () => {

  const geoLocation = new GeoLocationMock();
  const pathFetcherDefaultProps = {
    geoLocation,
    sendPositions: jest.fn(),
    getDistance: jest.fn(),
    isMiddlePointAccurate: jest.fn(),
    minimumTimeBetweenCalls: 10000,
    minimumDistanceDiff: 10
  };

  it('default state should be correct', () => {
    const wrapper = shallow(<PathFetcher {...pathFetcherDefaultProps} />);
    const instance = wrapper.instance() as PathFetcher;
    expect(instance.state.positions.length).toBe(0);
    expect(instance.state.watcherId).toBe(null);
  });

  it('should pass correct props to fetcher view factory', () => {
    const wrapper = shallow(<PathFetcher {...pathFetcherDefaultProps} />);
    const instance = wrapper.instance() as PathFetcher;
    const factory = (
      <PathFetcherViewFactory
        path={instance.state.positions}
        initWatcher={instance.initWatcher}
        stopWatcher={instance.stopWatcher}
        geoLocationStarted={false}
      />
    );
    expect(wrapper.contains(factory)).toBe(true);
  });

  it('init watcher should call geo location and save provided watch id', () => {
    const geoLocationMock = new GeoLocationMock();
    const wrapper = shallow(<PathFetcher {...pathFetcherDefaultProps} geoLocation={geoLocationMock} />);
    const instance = wrapper.instance() as PathFetcher;
    instance.initWatcher();
    const watchId = geoLocationMock.watchId;
    expect(instance.state.watcherId).toBe(watchId);
  });

  it('init watcher should return if watch is already started', () => {
    const geoLocationMock = new GeoLocationMock();
    const wrapper = shallow(<PathFetcher {...pathFetcherDefaultProps} geoLocation={geoLocationMock} />);
    const instance = wrapper.instance() as PathFetcher;
    instance.initWatcher();
    expect(geoLocationMock.watchPositionWasCalledTimes).toBe(1);
    const stateBeforeSecondCall = instance.state;
    instance.initWatcher();
    expect(geoLocationMock.watchPositionWasCalledTimes).toBe(1);
    const stateAfterSecondCall = instance.state;
    expect(stateBeforeSecondCall).toEqual(stateAfterSecondCall);
  });

  it('stop watcher should call geo location with correct watch id and clear watch id state', () => {
    const geoLocationMock = new GeoLocationMock();
    const wrapper = shallow(<PathFetcher {...pathFetcherDefaultProps} geoLocation={geoLocationMock} />);
    const instance = wrapper.instance() as PathFetcher;
    instance.initWatcher();
    const watchId = geoLocationMock.watchId;
    instance.stopWatcher();
    expect(instance.state.watcherId).toBe(null);
    expect(geoLocationMock.clearWatchWasCalled.providedWatchNumber).toBe(watchId);
  });

  it('stop watcher should send positions to higher order component', () => {
    let props = {...pathFetcherDefaultProps};
    props.geoLocation = new GeoLocationMock();
    props.sendPositions = jest.fn();
    const wrapper = shallow(<PathFetcher {...props} />);
    const instance = wrapper.instance() as PathFetcher;
    instance.initWatcher();
    props.geoLocation.sendPosition({
      coords: { latitude: 24, longitude: 44 },
      timestamp: 1000
    });
    props.geoLocation.sendPosition({
      coords: {latitude: 24, longitude: 42 },
      timestamp: 15000
    });
    instance.stopWatcher();
    expect(props.sendPositions.mock.calls.length).toBe(1);
    const expectedPositions = [
      { latitude: 24, longitude: 44, time: 1000 },
      { latitude: 24, longitude: 42, time: 15000 }
    ];
    expect(props.sendPositions.mock.calls[0][0]).toEqual(expectedPositions);
  });

  it('should not call geo location clear watch if watch id is null', () => {
    const geoLocationMock = new GeoLocationMock();
    const wrapper = shallow(<PathFetcher {...pathFetcherDefaultProps} geoLocation={geoLocationMock} />);
    const instance = wrapper.instance() as PathFetcher;
    expect(instance.state.watcherId).toBe(null);
    instance.stopWatcher();
    expect(instance.state.watcherId).toBe(null);
    expect(geoLocationMock.clearWatchWasCalled.status).toBe(false);
  });

  it('should successfully save first position from geo location', () => {
    const geoLocationMock = new GeoLocationMock();
    const wrapper = shallow(<PathFetcher {...pathFetcherDefaultProps} geoLocation={geoLocationMock} />);
    const instance = wrapper.instance() as PathFetcher;
    instance.initWatcher();
    geoLocationMock.sendPosition({
      coords: { latitude: 24, longitude: 44 },
      timestamp: 2342434
    });
    expect(instance.state.positions[0]).toEqual({
      latitude: 24,
      longitude: 44,
      time: 2342434
    });
  });

  it('should not save very close positions', () => {
    const minDistance = pathFetcherDefaultProps.minimumDistanceDiff;
    const getDistance = jest.fn();
    const appropriateDistance = 2;
    const inappropriateDistance = 12;
    expect(appropriateDistance > minDistance && inappropriateDistance < minDistance);
    getDistance.mockReturnValueOnce(appropriateDistance);
    getDistance.mockReturnValueOnce(inappropriateDistance);
    const geoLocationMock = new GeoLocationMock();
    const props = {...pathFetcherDefaultProps, ...{getDistance, geoLocation: geoLocationMock}};
    const wrapper = shallow(<PathFetcher {...props} />);
    const instance = wrapper.instance() as PathFetcher;
    instance.initWatcher();
    const positionsToSend =
      [
        {
          coords: { latitude: 24, longitude: 44 },
          timestamp: 1000
        },
        {
          coords: { latitude: 12, longitude: -17 },
          timestamp: 15000
        },
        {
          coords: { latitude: 65, longitude: 34 },
          timestamp: 35000
        }
      ];
    geoLocationMock.sendPosition(positionsToSend[0]);
    geoLocationMock.sendPosition(positionsToSend[1]);
    geoLocationMock.sendPosition(positionsToSend[2]);
    expect(getDistance.mock.calls.length).toBe(2);
    expect(instance.state.positions[0].latitude).toBe(24);
    expect(instance.state.positions[1].latitude).toBe(65);
    expect(instance.state.positions[2]).toBe(undefined);
  });

  it('should remove inaccurate middle position', () => {
    const getDistanceMock = (start: Position, end: Position) =>
      Math.abs(start.latitude - end.latitude) * 1000;
    const geoLocationMock = new GeoLocationMock();
    const props = {
      ...pathFetcherDefaultProps,
      ...{getDistance: getDistanceMock, geoLocation: geoLocationMock}
    };
    const wrapper = shallow(<PathFetcher {...props} />);
    const instance = wrapper.instance() as PathFetcher;
    instance.initWatcher();
    // middle position is an  geo location api error. Third position is correction
    const positionsToSend =
      [
        {
          coords: { latitude: 24, longitude: 79 },
          timestamp: 1000
        },
        {
          coords: { latitude: 77, longitude: 79 },
          timestamp: 15000
        },
        {
          coords: { latitude: 25, longitude: 79 },
          timestamp: 35000
        }
      ];
    geoLocationMock.sendPosition(positionsToSend[0]);
    geoLocationMock.sendPosition(positionsToSend[1]);
    geoLocationMock.sendPosition(positionsToSend[2]);
    expect(instance.state.positions[0].latitude).toBe(24);
    expect(instance.state.positions[1].latitude).toBe(25);
    expect(instance.state.positions[2]).toBe(undefined);
  });

  it('should not save very recent positions', () => {
    let props = {...pathFetcherDefaultProps};
    props.geoLocation = new GeoLocationMock();
    const wrapper = shallow(<PathFetcher {...props} />);
    const instance = wrapper.instance() as PathFetcher;
    instance.initWatcher();
    props.geoLocation.sendPosition({
      coords: { latitude: 24, longitude: 44 },
      timestamp: 1000
    });
    props.geoLocation.sendPosition({
      coords: { latitude: 42, longitude: 22 },
      timestamp: 7000
    });
    props.geoLocation.sendPosition({
      coords: { latitude: 65, longitude: 37 },
      timestamp: 12000
    });
    expect(instance.state.positions[0].latitude).toBe(24);
    expect(instance.state.positions[1].latitude).toBe(65);
    expect(instance.state.positions[2]).toBe(undefined);
  });

  it('should skip errors for now', () => {
    const geoLocationMock = new GeoLocationMock();
    const wrapper = shallow(<PathFetcher {...pathFetcherDefaultProps} geoLocation={geoLocationMock} />);
    const instance = wrapper.instance() as PathFetcher;
    instance.initWatcher();
    geoLocationMock.sendError('some error name');
    expect(instance.state.positions.length).toBe(0);
  });

  it('should use only high precision api', () => {
    const geoLocationMock = new GeoLocationMock();
    const wrapper = shallow(<PathFetcher {...pathFetcherDefaultProps} geoLocation={geoLocationMock} />);
    const instance = wrapper.instance() as PathFetcher;
    instance.initWatcher();
    expect(geoLocationMock.options).toEqual({enableHighAccuracy: true});
  });

});