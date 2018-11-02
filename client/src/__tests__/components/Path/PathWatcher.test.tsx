import { shallow } from "enzyme";
import * as React from "react";
import { GeoLocationMock } from "../../../__mocks__/GeoLocation";
import { PathWatcher } from "../../../application/components/Path/PathWatcher";
import { PathWatcherViewFactory } from "../../../containers/components/Path/PathWatcherViewFactory";

describe("Path watcher tests", () => {
  const geoLocation = new GeoLocationMock();
  const defaultProps = {
    raceType: "walking",
    geoLocation,
    saveRace: jest.fn().mockResolvedValue(""),
    setSaveResult: jest.fn(),
    getDistance: jest.fn(),
    isMiddlePointAccurate: jest.fn(),
    delaySecs: 10,
    minimumDistanceDiff: 10
  };

  it("default state should be correct", () => {
    const geoLocationMock = new GeoLocationMock();
    const wrapper = shallow(
      <PathWatcher {...defaultProps} geoLocation={geoLocationMock} />
    );
    expect(wrapper.state()).toEqual({
      lastTimeCheck: null,
      positions: [],
      savingInProgress: false,
      watcherId: geoLocationMock.watchId
    });
  });

  it("should pass correct props to fetcher view factory", () => {
    const wrapper = shallow(<PathWatcher {...defaultProps} />);
    const instance = wrapper.instance() as PathWatcher;
    const view = (
      <PathWatcherViewFactory
        race={{ type: "walking", path: [] }}
        stopWatcher={instance.stopWatcher}
      />
    );
    expect(wrapper.contains(view)).toBe(true);
  });

  it("init watcher should call geo location and save provided watch id", () => {
    const geoLocationMock = new GeoLocationMock();
    const wrapper = shallow(
      <PathWatcher {...defaultProps} geoLocation={geoLocationMock} />
    );
    const instance = wrapper.instance() as PathWatcher;
    instance.initWatcher();
    const watchId = geoLocationMock.watchId;
    expect(instance.state.watcherId).toBe(watchId);
  });

  it("init watcher should return if watch id exists", () => {
    const geoLocationMock = new GeoLocationMock();
    const wrapper = shallow(
      <PathWatcher {...defaultProps} geoLocation={geoLocationMock} />
    );
    const instance = wrapper.instance() as PathWatcher;
    instance.initWatcher();
    expect(geoLocationMock.watchPositionWasCalledTimes).toBe(1);
    const stateBeforeSecondCall = instance.state;
    instance.initWatcher();
    expect(geoLocationMock.watchPositionWasCalledTimes).toBe(1);
    const stateAfterSecondCall = instance.state;
    expect(stateBeforeSecondCall).toEqual(stateAfterSecondCall);
  });

  it("stop watcher should call geo location with correct watch id and clear watch id state", async done => {
    const geoLocationMock = new GeoLocationMock();
    const wrapper = shallow(
      <PathWatcher {...defaultProps} geoLocation={geoLocationMock} />
    );
    const instance = wrapper.instance() as PathWatcher;
    instance.initWatcher();
    const watchId = geoLocationMock.watchId;
    await instance.stopWatcher();
    expect(instance.state.watcherId).toBe(null);
    expect(geoLocationMock.clearWatchWasCalled.providedWatchNumber).toBe(
      watchId
    );
    done();
  });

  it.skip("stop watcher should send positions to higher order component and send result of saving", async done => {
    const props = { ...defaultProps };
    props.geoLocation = new GeoLocationMock();
    const savingResult = "all is ok";
    props.saveRace = jest.fn().mockResolvedValue(savingResult);
    props.setSaveResult = jest.fn();
    const wrapper = shallow(<PathWatcher {...props} />);
    const instance = wrapper.instance() as PathWatcher;
    instance.initWatcher();
    props.geoLocation.sendPosition({
      coords: { latitude: 24, longitude: 44 },
      timestamp: 1000
    });
    await instance.stopWatcher();
    expect(props.saveRace.mock.calls.length).toBe(1);
    const expectedPositions = [{ latitude: 24, longitude: 44, time: 1000 }];
    expect(props.saveRace.mock.calls[0][0]).toEqual({
      type: defaultProps.raceType,
      path: expectedPositions
    });
    expect(props.setSaveResult.mock.calls.length).toBe(1);
    expect(props.setSaveResult.mock.calls[0][0]).toBe(savingResult);
    done();
  });

  it("should show that saving is in progress during saving", async done => {
    const props = { ...defaultProps };
    props.geoLocation = new GeoLocationMock();
    props.saveRace = jest.fn().mockResolvedValue("");
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

  it("should not call geo location clear watch if watch id is null", async done => {
    const geoLocationMock = new GeoLocationMock();
    const wrapper = shallow(
      <PathWatcher {...defaultProps} geoLocation={geoLocationMock} />
    );
    const instance = wrapper.instance() as PathWatcher;
    instance.setState({ watcherId: null });
    await instance.stopWatcher();
    expect(instance.state.watcherId).toBe(null);
    expect(geoLocationMock.clearWatchWasCalled.status).toBe(false);
    done();
  });

  it("should skip errors for now", () => {
    const geoLocationMock = new GeoLocationMock();
    const wrapper = shallow(
      <PathWatcher {...defaultProps} geoLocation={geoLocationMock} />
    );
    const instance = wrapper.instance() as PathWatcher;
    instance.initWatcher();
    geoLocationMock.sendError("some error name");
    expect(instance.state.positions.length).toBe(0);
  });

  it("should use only high precision api", () => {
    const geoLocationMock = new GeoLocationMock();
    const wrapper = shallow(
      <PathWatcher {...defaultProps} geoLocation={geoLocationMock} />
    );
    const instance = wrapper.instance() as PathWatcher;
    instance.initWatcher();
    expect(geoLocationMock.options).toEqual({ enableHighAccuracy: true });
  });
});
