import * as React from 'react';
import { shallow } from 'enzyme';
import { PathInformation } from '../../Path/PathInformation';

describe('should render path information correctly', () => {

  const toLocaleTimeMock = jest.fn();
  toLocaleTimeMock.mockReturnValue('7 pm');

  const wrapper = shallow(
    <PathInformation
      latitude={45}
      longitude={45}
      time={2323323}
      toLocaleTime={toLocaleTimeMock}
      avgSpeed={13}
      totalDistance={23}
    />
  );

  it('should call to locale time function with time input', () => {
    expect(toLocaleTimeMock.mock.calls.length).toBe(1);
    expect(toLocaleTimeMock.mock.calls[0][0]).toBe(2323323);
  });

  it('should render 5 paragraphs', () => {
    expect(wrapper.find('p').length).toBe(5);
  });

  it('should render correct data', () => {
    expect(wrapper.contains(<p>Latitude is 45</p>)).toBe(true);
    expect(wrapper.contains(<p>Longitude is 45</p>)).toBe(true);
    expect(wrapper.contains(<p>Last check was at 7 pm</p>)).toBe(true);
    expect(wrapper.contains(<p>Average speed is 13 kmh</p>)).toBe(true);
    expect(wrapper.contains(<p>Total distance is 23 metres</p>)).toBe(true);
  });

});