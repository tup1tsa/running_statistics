import * as React from 'react';
import { shallow } from 'enzyme';
import { RaceInformation } from '../../Path/RaceInformation';

describe('should render path information correctly', () => {

  const wrapper = shallow(
    <RaceInformation
      totalTimeSecs={117}
      avgSpeed={13.2563}
      totalDistance={23}
    />
  );

  it('should render correct data', () => {
    expect(wrapper.contains(<li>Average speed is 13.26 kmh</li>)).toBe(true);
    expect(wrapper.contains(<li>Total distance is 23 metres</li>)).toBe(true);
    expect(wrapper.contains(<li>Total time is 117 seconds.</li>)).toBe(true);
  });

});