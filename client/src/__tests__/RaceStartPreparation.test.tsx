import { shallow } from 'enzyme';
import * as React from 'react';
import { RaceStartPreparation } from '../RaceStartPreparation';
import { PathWatcherFactory } from '../Path/PathWatcherFactory';

describe('race start preparation logic', () => {

  const defaultProps = {
    delaySecs: 2,
    minimumDistanceDiff: 2,
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

  it('should send correct props to path watcher after clicking buttons', () => {
    const runningWrapper = shallow(<RaceStartPreparation  {...defaultProps} />);
    runningWrapper.find('button#start_running').simulate('click');
    expect(runningWrapper.contains(<PathWatcherFactory {...defaultProps} raceType={'running'} />)).toBe(true);

    const walkingWrapper = shallow(<RaceStartPreparation  {...defaultProps} />);
    walkingWrapper.find('button#start_walking').simulate('click');
    expect(walkingWrapper.contains(<PathWatcherFactory {...defaultProps} raceType={'walking'} />)).toBe(true);

    const cyclingWrapper = shallow(<RaceStartPreparation  {...defaultProps} />);
    cyclingWrapper.find('button#start_cycling').simulate('click');
    expect(cyclingWrapper.contains(<PathWatcherFactory {...defaultProps} raceType={'cycling'} />)).toBe(true);
  });

  it('should not render buttons if one of the buttons was clicked', () => {
    const wrapper = shallow(<RaceStartPreparation {...defaultProps} />);
    wrapper.find('button#start_walking').simulate('click');
    expect(wrapper.find('button').length).toBe(0);
  });
});