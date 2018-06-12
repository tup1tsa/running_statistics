import * as React from 'react';
import { shallow } from 'enzyme';
import { OngoingRaceInfo } from '../../Path/OngoingRaceInfo';
import { RaceInformationFactory } from '../../Path/RaceInformationFactory';

describe('ongoing race information block', () => {

  const defaultProps = {
    totalDistance: 12,
    totalTimeSecs: 14,
    avgSpeed: 25,
    lastTimeCheck: 2245,
    raceType: 'walking',
    toLocaleTime: jest.fn()
  };

  it('should render race information with correct props', () => {
    const wrapper = shallow(<OngoingRaceInfo {...defaultProps} />);
    const raceInfo = (
      <RaceInformationFactory
        totalDistance={defaultProps.totalDistance}
        totalTimeSecs={defaultProps.totalTimeSecs}
        avgSpeed={defaultProps.avgSpeed}
      />
    );
    expect(wrapper.contains(raceInfo)).toBe(true);
  });

  it('should render its own data correctly', () => {
    const toLocaleTimeMock = jest.fn().mockReturnValue('7 pm');
    const wrapper = shallow(<OngoingRaceInfo {...defaultProps} toLocaleTime={toLocaleTimeMock} />);
    expect(toLocaleTimeMock.mock.calls.length).toBe(1);
    expect(toLocaleTimeMock.mock.calls[0][0]).toBe(defaultProps.lastTimeCheck);
    expect(wrapper.contains(<li>Last time check was at 7 pm</li>)).toBe(true);
    expect(wrapper.contains(<li>walking is in progress</li>)).toBe(true);
  });

});