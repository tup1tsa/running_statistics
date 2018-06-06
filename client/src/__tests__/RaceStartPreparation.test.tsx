import { shallow } from 'enzyme';
import * as React from 'react';
import { RaceStartPreparation, SpeedLimits } from '../RaceStartPreparation';
import { PathWatcherFactory } from '../Path/PathWatcherFactory';

describe('race start preparation logic', () => {

  const speedLimits = {
    walking: {
      minSpeed: 2,
      maxSpeed: 4
    },
    running: {
      minSpeed: 3,
      maxSpeed: 5
    },
    cycling: {
      minSpeed: 7,
      maxSpeed: 9
    }
  };

  const defaultProps = {
    speedLimits: speedLimits,
    delaySecs: 2,
    minimumDistanceDiff: 2,
    maxTimeBetweenPointsSecs: 30,
    saveRace: jest.fn(),
    setSaveResult: jest.fn()
  };

  it('should render four buttons', () => {
    const wrapper = shallow(<RaceStartPreparation  {...defaultProps} />);
    expect(wrapper.find('button').length).toBe(4);
  });

  it('should finish race with empty message if back button is clicked', () => {
    const setSaveResult = jest.fn();
    const wrapper = shallow(<RaceStartPreparation {...defaultProps} setSaveResult={setSaveResult}/>);
    wrapper.find('button.back').simulate('click');
    expect(setSaveResult.mock.calls.length).toBe(1);
    expect(setSaveResult.mock.calls[0][0]).toBe('');
  });

  it('should run path watcher with correct props', () => {
    const checkProps = (buttonId: string, raceType: string, currentSpeedLimits: SpeedLimits) => {
      const defaultWatcherProps = {
        minimumDistanceDiff: defaultProps.minimumDistanceDiff,
        delaySecs: defaultProps.delaySecs,
        saveRace: defaultProps.saveRace,
        setSaveResult: defaultProps.setSaveResult,
        maxTimeBetweenPointsSecs: defaultProps.maxTimeBetweenPointsSecs
      };
      const wrapper = shallow(<RaceStartPreparation {...defaultProps} />);
      wrapper.find(buttonId).simulate('click');
      expect(wrapper.find('button').length).toBe(0);
      expect(wrapper.contains(
        <PathWatcherFactory
          {...defaultWatcherProps}
          speedLimits={currentSpeedLimits}
          raceType={raceType}
        />
      )).toBe(true);
    };
    checkProps('#start_running', 'running', defaultProps.speedLimits.running);
    checkProps('#start_walking', 'walking', defaultProps.speedLimits.walking);
    checkProps('#start_cycling', 'cycling', defaultProps.speedLimits.cycling);
  });
});