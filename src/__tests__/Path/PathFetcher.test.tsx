import { PathFetcher } from '../../Path/PathFetcher';
import { shallow } from 'enzyme';
import * as React from 'react';
import { GeoLocationMock } from '../../__mocks__/GeoLocation';
import { PathFetcherViewFactory } from '../../Path/PathFetcherViewFactory';

describe('Path fetcher tests', () => {

  it('default state should be correct', () => {
    const geoLocationMock = new GeoLocationMock();
    const wrapper = shallow(<PathFetcher geoLocation={geoLocationMock} getPath={jest.fn()}/>);
    const instance = wrapper.instance() as PathFetcher;
    expect(instance.state.positions.length).toBe(0);
    expect(instance.state.watcherId).toBe(null);
  });

  it('should pass correct props to fetcher view factory', () => {
    const geoLocationMock = new GeoLocationMock();
    const wrapper = shallow(<PathFetcher geoLocation={geoLocationMock} getPath={jest.fn()} />);
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
    const wrapper = shallow(<PathFetcher geoLocation={geoLocationMock} getPath={jest.fn()} />);
    const instance = wrapper.instance() as PathFetcher;
    instance.initWatcher();
    const watchId = geoLocationMock.watchId;
    expect(instance.state.watcherId).toBe(watchId);
  });

  it('init watcher should return if watch is already started', () => {
    const geoLocationMock = new GeoLocationMock();
    const wrapper = shallow(<PathFetcher geoLocation={geoLocationMock} getPath={jest.fn()} />);
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
    const wrapper = shallow(<PathFetcher geoLocation={geoLocationMock} getPath={jest.fn()} />);
    const instance = wrapper.instance() as PathFetcher;
    instance.initWatcher();
    const watchId = geoLocationMock.watchId;
    instance.stopWatcher();
    expect(instance.state.watcherId).toBe(null);
    expect(geoLocationMock.clearWatchWasCalled.providedWatchNumber).toBe(watchId);
  });

  it('should not call geo location clear watch if watch id is null', () => {
    const geoLocationMock = new GeoLocationMock();
    const wrapper = shallow(<PathFetcher geoLocation={geoLocationMock} getPath={jest.fn()} />);
    const instance = wrapper.instance() as PathFetcher;
    expect(instance.state.watcherId).toBe(null);
    instance.stopWatcher();
    expect(instance.state.watcherId).toBe(null);
    expect(geoLocationMock.clearWatchWasCalled.status).toBe(false);
  });

  it('should successfully save first position from geo location', () => {
    const geoLocationMock = new GeoLocationMock();
    const getPath = jest.fn();
    const wrapper = shallow(<PathFetcher geoLocation={geoLocationMock} getPath={getPath} />);
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

  it('should only save positions from geo location which are more than 5 metres away from previous', () => {
    const getPath = jest.fn();
    getPath.mockReturnValueOnce(2);
    getPath.mockReturnValueOnce(22);
    const geoLocationMock = new GeoLocationMock();
    const wrapper = shallow(<PathFetcher geoLocation={geoLocationMock} getPath={getPath} />);
    const instance = wrapper.instance() as PathFetcher;
    instance.initWatcher();
    const positionsToSend =
      [
        {
          coords: { latitude: 24, longitude: 44 },
          timestamp: 2342434
        },
        {
          coords: { latitude: 12, longitude: -17 },
          timestamp: 32443
        },
        {
          coords: { latitude: 65, longitude: 34 },
          timestamp: 234234
        }
      ];
    geoLocationMock.sendPosition(positionsToSend[0]);
    geoLocationMock.sendPosition(positionsToSend[1]);
    geoLocationMock.sendPosition(positionsToSend[2]);
    expect(getPath.mock.calls.length).toBe(2);
    expect(instance.state.positions[0]).toEqual({
      latitude: 24,
      longitude: 44,
      time: 2342434
    });
    expect(instance.state.positions[1]).toEqual({
      latitude: 65,
      longitude: 34,
      time: 234234
    });
    expect(instance.state.positions[2]).toBe(undefined);
  });

  it('should skip errors for now', () => {
    const geoLocationMock = new GeoLocationMock();
    const wrapper = shallow(<PathFetcher geoLocation={geoLocationMock} getPath={jest.fn()} />);
    const instance = wrapper.instance() as PathFetcher;
    instance.initWatcher();
    geoLocationMock.sendError('some error name');
    expect(instance.state.positions.length).toBe(0);
  });

  it('should use only high precision api', () => {
    const geoLocationMock = new GeoLocationMock();
    const wrapper = shallow(<PathFetcher geoLocation={geoLocationMock} getPath={jest.fn()} />);
    const instance = wrapper.instance() as PathFetcher;
    instance.initWatcher();
    expect(geoLocationMock.options).toEqual({enableHighAccuracy: true});
  });

});