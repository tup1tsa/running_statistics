import * as React from 'react';
import { shallow } from 'enzyme';
import { RaceInformation } from '../../Path/RaceInformation';
import { FinishedRaceInfo } from '../../Path/FinishedRaceInfo';

describe('finished race information block', () => {

  const defaultProps = {
    totalDistance: 12,
    totalTimeSecs: 14,
    avgSpeed: 25,
    lastTimeCheck: 117,
    raceType: 'walking',
    toLocaleDate: jest.fn()
  };

  it('should render race information with correct props', () => {
    const wrapper = shallow(<FinishedRaceInfo {...defaultProps} />);
    const raceInfo = (
      <RaceInformation
        totalDistance={defaultProps.totalDistance}
        totalTimeSecs={defaultProps.totalTimeSecs}
        avgSpeed={defaultProps.avgSpeed}
      />
    );
    expect(wrapper.contains(raceInfo)).toBe(true);
  });

  it('should render its own data correctly', () => {
    const toLocaleDate = jest.fn().mockReturnValue('24/12/18 3 pm');
    const wrapper = shallow(<FinishedRaceInfo {...defaultProps} toLocaleDate={toLocaleDate} />);
    expect(wrapper.contains(<li>Race type: walking</li>)).toBe(true);
    expect(toLocaleDate.mock.calls.length).toBe(1);
    expect(toLocaleDate.mock.calls[0][0]).toBe(defaultProps.lastTimeCheck);
    expect(wrapper.contains(<li>Date: 24/12/18 3 pm</li>)).toBe(true);
  });

});