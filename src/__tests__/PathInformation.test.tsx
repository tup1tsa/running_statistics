import * as React from 'react';
import { shallow } from 'enzyme';
import { PathInformation } from '../PathInformation';

describe('should render path information correctly', () => {
  it('should render 5 paragraphs', () => {
    const wrapper = shallow(
      <PathInformation
        latitude={45}
        longitude={45}
        time={1523266654983}
        avgSpeed={13}
        totalDistance={23}
      />
    );
    expect(wrapper.find('p').length).toBe(5);
    expect(wrapper.contains(<p>Latitude is 45</p>)).toBe(true);
    expect(wrapper.contains(<p>Longitude is 45</p>)).toBe(true);
    expect(wrapper.contains(<p>Last check was at 12:37:34</p>)).toBe(true);
    expect(wrapper.contains(<p>Average speed is 13 kmh</p>)).toBe(true);
    expect(wrapper.contains(<p>Total distance is 23 metres</p>)).toBe(true);
  });

});