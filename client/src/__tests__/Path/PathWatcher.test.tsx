import { PathWatcher } from '../../Path/PathWatcher';
import { shallow } from 'enzyme';
import * as React from 'react';
import { GeoLocationMock } from '../../__mocks__/GeoLocation';
import { PathWatcherViewFactory } from '../../Path/PathWatcherViewFactory';
import { Position } from '../../common_files/interfaces';
import { isMiddlePointAccurate } from '../../Path/pathUtils';

describe('Path watcher tests', () => {

  const geoLocation = new GeoLocationMock();
  const defaultProps = {
    runningType: 'walking',
    speedLimits: {
      minSpeed: 5,
      maxSpeed: 17
    },
    maxTimeBetweenPointsSecs: 30,
    geoLocation,
    saveRun: jest.fn().mockResolvedValue(''),
    setSaveResult: jest.fn(),
    getDistance: jest.fn(),
    isMiddlePointAccurate: jest.fn(),
    delaySecs: 10,
    minimumDistanceDiff: 10
  };

  it('default state should be correct', () => {
    const wrapper = shallow(<PathWatcher {...defaultProps} />);
    let state = wrapper.state();
    delete state.watcherId;
    // watcher id can be any number
    expect(state).toEqual({
      lastTimeCheck: null,
      positions: [],
      savingInProgress: false
    });
  });

  it('should init watcher on mount', () => {
    const wrapper = shallow(<PathWatcher {...defaultProps} />);
    const instance = wrapper.instance() as PathWatcher;
    expect(instance.state.watcherId).not.toBe(null);
  });

  it('should pass correct props to fetcher view factory', () => {
    const wrapper = shallow(<PathWatcher {...defaultProps} />);
    const instance = wrapper.instance() as PathWatcher;
    const view = (
      <PathWatcherViewFactory
        runningType={defaultProps.runningType}
        path={instance.state.positions}
        stopWatcher={instance.stopWatcher}
        speedLimits={defaultProps.speedLimits}
        maxTimeBetweenPointsSecs={defaultProps.maxTimeBetweenPointsSecs}
      />
    );
    expect(wrapper.contains(view)).toBe(true);
  });

  it('init watcher should call geo location and save provided watch id', () => {
    const geoLocationMock = new GeoLocationMock();
    const wrapper = shallow(<PathWatcher {...defaultProps} geoLocation={geoLocationMock} />);
    const instance = wrapper.instance() as PathWatcher;
    instance.initWatcher();
    const watchId = geoLocationMock.watchId;
    expect(instance.state.watcherId).toBe(watchId);
  });

  it('init watcher should return if watch id exists', () => {
    const geoLocationMock = new GeoLocationMock();
    const wrapper = shallow(<PathWatcher {...defaultProps} geoLocation={geoLocationMock} />);
    const instance = wrapper.instance() as PathWatcher;
    instance.initWatcher();
    expect(geoLocationMock.watchPositionWasCalledTimes).toBe(1);
    const stateBeforeSecondCall = instance.state;
    instance.initWatcher();
    expect(geoLocationMock.watchPositionWasCalledTimes).toBe(1);
    const stateAfterSecondCall = instance.state;
    expect(stateBeforeSecondCall).toEqual(stateAfterSecondCall);
  });

  it('stop watcher should call geo location with correct watch id and clear watch id state', async (done) => {
    const geoLocationMock = new GeoLocationMock();
    const wrapper = shallow(<PathWatcher {...defaultProps} geoLocation={geoLocationMock} />);
    const instance = wrapper.instance() as PathWatcher;
    instance.initWatcher();
    const watchId = geoLocationMock.watchId;
    await instance.stopWatcher();
    expect(instance.state.watcherId).toBe(null);
    expect(geoLocationMock.clearWatchWasCalled.providedWatchNumber).toBe(watchId);
    done();
  });

  it('stop watcher should send positions to higher order component and send result of saving', async (done) => {
    let props = {...defaultProps};
    props.geoLocation = new GeoLocationMock();
    const savingResult = 'all is ok';
    props.saveRun = jest.fn().mockResolvedValue(savingResult);
    props.setSaveResult = jest.fn();
    const wrapper = shallow(<PathWatcher {...props} />);
    const instance = wrapper.instance() as PathWatcher;
    instance.initWatcher();
    props.geoLocation.sendPosition({
      coords: { latitude: 24, longitude: 44 },
      timestamp: 1000
    });
    await instance.stopWatcher();
    expect(props.saveRun.mock.calls.length).toBe(1);
    const expectedPositions = [{ latitude: 24, longitude: 44, time: 1000 }];
    expect(props.saveRun.mock.calls[0][0]).toEqual(expectedPositions);
    expect(props.setSaveResult.mock.calls.length).toBe(1);
    expect(props.setSaveResult.mock.calls[0][0]).toBe(savingResult);
    done();
  });

  it('should show that saving is in progress during saving', async (done) => {
    let props = {...defaultProps};
    props.geoLocation = new GeoLocationMock();
    props.saveRun = jest.fn().mockResolvedValue('');
    const wrapper = shallow(<PathWatcher {...props} />);
    const instance = wrapper.instance() as PathWatcher;
    instance.initWatcher();
    props.geoLocation.sendPosition({
      coords: { latitude: 44, longitude: 17 },
      timestamp: 23232
    });
    const stopWatcherPromise = instance.stopWatcher();
    wrapper.update();
    expect(wrapper.contains(<div>Saving in progress</div>)).toBe(true);
    await stopWatcherPromise;
    done();
  });

  it('should not call geo location clear watch if watch id is null', async (done) => {
    const geoLocationMock = new GeoLocationMock();
    const wrapper = shallow(<PathWatcher {...defaultProps} geoLocation={geoLocationMock} />);
    const instance = wrapper.instance() as PathWatcher;
    instance.setState({watcherId: null});
    await instance.stopWatcher();
    expect(instance.state.watcherId).toBe(null);
    expect(geoLocationMock.clearWatchWasCalled.status).toBe(false);
    done();
  });

  it('should successfully save first position from geo location', () => {
    const geoLocationMock = new GeoLocationMock();
    const wrapper = shallow(<PathWatcher {...defaultProps} geoLocation={geoLocationMock} />);
    const instance = wrapper.instance() as PathWatcher;
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
    const minDistance = defaultProps.minimumDistanceDiff;
    const getDistance = jest.fn();
    const appropriateDistance = 2;
    const inappropriateDistance = 12;
    expect(appropriateDistance > minDistance && inappropriateDistance < minDistance);
    getDistance.mockReturnValueOnce(appropriateDistance);
    getDistance.mockReturnValueOnce(inappropriateDistance);
    const geoLocationMock = new GeoLocationMock();
    const props = {...defaultProps, ...{getDistance, geoLocation: geoLocationMock}};
    const wrapper = shallow(<PathWatcher {...props} />);
    const instance = wrapper.instance() as PathWatcher;
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
      ...defaultProps,
      ...{
        getDistance: getDistanceMock,
        geoLocation: geoLocationMock,
        isMiddlePointAccurate: isMiddlePointAccurate}
    };
    const wrapper = shallow(<PathWatcher {...props} />);
    const instance = wrapper.instance() as PathWatcher;
    instance.initWatcher();
    // middle position is an  geo location api error. Third position is correction
    const positionsToSend =
      [
        {
          coords: { latitude: 24, longitude: 79 },
          timestamp: 1000
        },
        {
          coords: { latitude: 26, longitude: 79 },
          timestamp: 12000
        },
        {
          coords: { latitude: 77, longitude: 79 },
          timestamp: 23000
        },
        {
          coords: { latitude: 25, longitude: 79 },
          timestamp: 35000
        }
      ];
    geoLocationMock.sendPosition(positionsToSend[0]);
    geoLocationMock.sendPosition(positionsToSend[1]);
    geoLocationMock.sendPosition(positionsToSend[2]);
    geoLocationMock.sendPosition(positionsToSend[3]);
    expect(instance.state.positions[0].latitude).toBe(24);
    expect(instance.state.positions[1].latitude).toBe(26);
    expect(instance.state.positions[2].latitude).toBe(25);
    expect(instance.state.positions[3]).toBe(undefined);
  });

  it('should not save very recent positions', () => {
    let props = {...defaultProps};
    props.geoLocation = new GeoLocationMock();
    const wrapper = shallow(<PathWatcher {...props} />);
    const instance = wrapper.instance() as PathWatcher;
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
    const wrapper = shallow(<PathWatcher {...defaultProps} geoLocation={geoLocationMock} />);
    const instance = wrapper.instance() as PathWatcher;
    instance.initWatcher();
    geoLocationMock.sendError('some error name');
    expect(instance.state.positions.length).toBe(0);
  });

  it('should use only high precision api', () => {
    const geoLocationMock = new GeoLocationMock();
    const wrapper = shallow(<PathWatcher {...defaultProps} geoLocation={geoLocationMock} />);
    const instance = wrapper.instance() as PathWatcher;
    instance.initWatcher();
    expect(geoLocationMock.options).toEqual({enableHighAccuracy: true});
  });

});